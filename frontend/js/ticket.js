
function init(){
    renderizarProductos(PRODUCTOS);
    renderizarUsuario(USUARIO);
    renderizarTotal(PRODUCTOS);
    renderizarFecha();
}
const USUARIO = getNombreUsuario();
const PRODUCTOS = getProductos();


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

function renderizarTotal(productos){
    const precioTotal = document.getElementById("precio-final");
    precioTotal.innerHTML= `Total a pagar: <span>$${getPrecioTotal(productos)}</span>`
}
function renderizarFecha(){
    const dia = document.getElementById("dia");
    const hora = document.getElementById("hora");
    const fecha = new Date();
    dia.innerHTML = `Dia: ${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()} `
    hora.innerHTML= `Hora: ${fecha.getHours()}:${fecha.getMinutes()}`
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

init();