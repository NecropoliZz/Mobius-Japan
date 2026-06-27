let productos = [];

/* ── Tema ── */
function aplicarTema(tema) {
    if (tema === 'claro') {
        document.body.classList.add('tema-claro');
    } else {
        document.body.classList.remove('tema-claro');
    }
}

function iniciarTema() {
    const temaGuardado = localStorage.getItem('tema') || 'oscuro';
    const select = document.getElementById('tema-select');
    select.value = temaGuardado;
    aplicarTema(temaGuardado);
 
    select.addEventListener('change', (e) => {
        const nuevoTema = e.target.value;
        localStorage.setItem('tema', nuevoTema);
        aplicarTema(nuevoTema);
    });
}

/* ── Productos ── */

async function init(){
    iniciarTema();
    productos = await requestProductos();
    if(!productos){
        return
    }
    mostrarCategorias('figura');
    cargarBotonesCategorias();
}

function obtenerCarrito() 
{    
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito ? carrito : [];
}

function mostrarMensajeError(info){
    const contenedorProductos = document.querySelector(".product-section");
    contenedorProductos.innerHTML = `<div class = "bloque-error"><p class ="mensaje">${info}</p></div>`
}
function guardarCarrito(carrito) 
{
    carrito.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`);
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function sumarAlCarrito(event) {
    const productoId = event.target.parentElement.id;
    const productoSeleccionado = productos.find(producto => producto.id === parseInt(productoId));
    let carrito = obtenerCarrito();
    const productoEnCarrito = carrito.find(producto => producto.id === productoSeleccionado.id);
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad < 5) {  
            productoEnCarrito.cantidad += 1;
        } else {
            alert("No puedes agregar más de 5 unidades de este producto.");
        }
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }
    guardarCarrito(carrito);
}

async function requestProductos(){
    try {
        const response = await fetch('http://localhost:3000/api/productos/');
        const data = await response.json();
        if(!response.ok){
            console.log(data.message);
            mostrarMensajeError(data.message);
            return
        }
        return data.payload;
        console.log(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

function cargarBotonesCategorias(){
    btnFiguras = document.getElementById('figuras-option');
    btnJuguetes = document.getElementById('juguetes-option');
    btnFiguras.addEventListener('click', () => mostrarCategorias('figura'));
    btnJuguetes.addEventListener('click', () => mostrarCategorias('juguete'));
}

function cargarBotonesAgregarAlCarrito(){
    const botonesAgregar = document.querySelectorAll('.boton-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', sumarAlCarrito);
    });
}

function mostrarCategorias(categoria) {
    //Filtrar productos por categoría
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Limpiar la lista antes de mostrar los productos
    productosFiltrados.forEach(producto => {
        productList.innerHTML += 
        `<div class="card-producto" id="${producto.id}">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class="boton-agregar">Agregar al carrito</button>
        </div>`;
    });
    cargarBotonesAgregarAlCarrito();
}
init();
