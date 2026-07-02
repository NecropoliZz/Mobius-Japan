import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm";
const doc = new jsPDF();
const btnVerPDF = document.getElementById("ver-PDF");
function init(){
    const productos = getProductos();
    const usuario = getNombreUsuario();
    const precioTotal = getPrecioTotal(productos);
    renderizarProductos(productos);
    renderizarUsuario(usuario);
    renderizarFecha();
    renderizarTotal(precioTotal);
    crearArchivoPDF(productos, precioTotal, usuario)
}
init();
btnVerPDF.addEventListener("click",()=>{
    const url = doc.output('bloburl');
    window.open(url);
})

//Renderizaciones

function renderizarProductos(productos){
    const tablaCompras = document.getElementById("tabla-compras");
    let htmlProductos = `<tr>
                            <th class="encabezado-tabla-productos">Producto</th>
                            <th class="encabezado-tabla-productos">Subtotal</th>
                        </tr>`;
    productos.forEach(producto => {
        htmlProductos += 
        `<tr>
            <td class="dato-nombre-producto">${producto.nombre} x $${producto.precio} x ${producto.cantidad}</td>
            <td class= "dato-subtotal">$${getPrecioSubtotal(producto)}</td>
        </tr>`;
    });
    tablaCompras.innerHTML = htmlProductos;
}

function renderizarUsuario(usuarioARenderizar){
    const usuario = document.getElementById("usuario");
    usuario.innerHTML = `Compra de <span>${usuarioARenderizar} </span>`;
}

function renderizarTotal(total){
    const precioTotal = document.getElementById("precio-final");
    precioTotal.innerHTML= `Total a pagar: <span>$${total}</span>`
}
function renderizarFecha(){
    const dia = document.getElementById("dia");
    const hora = document.getElementById("hora");
    const fecha = new Date();
    dia.innerHTML = `Dia: ${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()} `
    hora.innerHTML= `Hora: ${fecha.getHours()}:${fecha.getMinutes()}`
}



//Inserciones en pdf
function crearArchivoPDF(productos, precioTotal, usuario){
    doc.setFontSize(12);
    let ejeX = 20;
    let ejeY = 20;
    insertarEmpresaPDF(ejeX, ejeY);
    ejeY+= 20;
    insertarFechaPDF(ejeX,ejeY,100);
    ejeY+= 20;
    insertarUsuarioPDF(usuario, ejeX, ejeY);
    ejeY+= 20;
    ejeY = insertarProductosPDF(productos, ejeX, ejeY, 20);
    insertarTotalPDF(precioTotal,ejeX,ejeY);
}

function insertarProductosPDF(productos, ejeX, ejeY, distanciaEntreProductos){
    productos.forEach(producto=>{
        let precioSubtotal = getPrecioSubtotal(producto);
        doc.text(` ${producto.nombre} x $${producto.precio } x ${producto.cantidad }   =   $${precioSubtotal}`, ejeX, ejeY);
        ejeY += distanciaEntreProductos;
    })
    return ejeY;
}

function insertarUsuarioPDF(usuarioARenderizar, ejeX, ejeY){
    doc.text(`A NOMBRE DE ${usuarioARenderizar}`, ejeX,ejeY);
}

function insertarTotalPDF(precioTotal, ejeX, ejeY){
    doc.text(`Total a pagar: $${precioTotal}`, ejeX, ejeY);
}

function insertarFechaPDF(ejeX,ejeY, distanciaX){
    const dia = document.getElementById("dia");
    const hora = document.getElementById("hora");
    const fecha = new Date();
    doc.text(`Dia: ${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()} `, ejeX, ejeY)
    doc.text(`Hora: ${fecha.getHours()}:${fecha.getMinutes()}`, ejeX + distanciaX, ejeY);
}

function insertarEmpresaPDF(ejeX,ejeY){
    doc.text("AUTOSERVICIO DE Mobius Japan", ejeX,ejeY);
}

//HELPERS

function getPrecioSubtotal(producto){
    return producto.precio * producto.cantidad;
}

function getNombreUsuario(){
    return localStorage.getItem("nombre-usuario") || "Nombre No definido";
}

function getPrecioTotal(productos){
    let precioTotal = 0;
    productos.forEach(producto => precioTotal += getPrecioSubtotal(producto));
    return precioTotal;
}

function getProductos(){
    let productos = localStorage.getItem("carrito") || [];
    if(productos.length >0){
        productos = JSON.parse(productos);
    }
    return productos;
}



