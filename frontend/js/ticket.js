
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
    const tablaCompras = document.querySelector(".tabla-compras");
    let htmlProductos = `<tr>
                            <th>Producto</th>
                            <th>Precio unitario</th>
                        </tr>`;
    productos.forEach(producto => {
        htmlProductos += 
        `<tr>
            <td>${producto.nombre} x $${producto.precio} x ${producto.cantidad}</td>
            <td>${getPrecioUnitario(producto)}</td>
        </tr>`;
    });
    tablaCompras.innerHTML = htmlProductos;
}

function renderizarUsuario(usuarioARenderizar){
    const usuario = document.getElementById("usuario");
    usuario.innerHTML = `A nombre de ${usuarioARenderizar}`;
}

function renderizarTotal(productos){
    const precioTotal = document.getElementById("precio-final");
    precioTotal.innerHTML= `Total a pagar: $${getPrecioTotal(productos)}`
}
function renderizarFecha(){
    const dia = document.getElementById("dia");
    const hora = document.getElementById("hora");
    const fecha = new Date();
    dia.innerHTML = `Dia: ${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()} `
    hora.innerHTML= `Hora: ${fecha.getHours()}:${fecha.getMinutes()}`
}


//HELPERS

function getPrecioUnitario(producto){
    return producto.precio * producto.cantidad;
}
function getNombreUsuario(){
    return localStorage.getItem("nombre-usuario") || "Nombre No definido";
}


function getPrecioTotal(productos){
    let precioTotal = 0;
    productos.forEach(producto => precioTotal += getPrecioUnitario(producto));
    return precioTotal;
}

function getProductos(){
    return JSON.parse(localStorage.getItem("carrito") || []);
}

init();