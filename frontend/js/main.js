let productos = [];

async function init(){
    productos = await requestProductos();
    mostrarCategorias('figura');
    cargarBotonesCategorias();
}
async function requestProductos(){
    try {
        const response = await fetch('http://localhost:3000/api/productos/');
        const data = await response.json();
        const productosdata = data.payload;
        return productosdata;
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
}
init();