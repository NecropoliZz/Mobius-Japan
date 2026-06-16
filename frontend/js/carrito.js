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
/* ── Carrito ── */

function obtenerCarrito() 
{    
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito ? carrito : [];
}

function guardarCarrito(carrito) 
{
    carrito.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`);
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function agregarEventosDelete()
{
    document.querySelectorAll(".btn-delete")
    .forEach(btn =>
    {
        btn.addEventListener("click", () =>
        {
            let id = Number(btn.dataset.id);

            let carrito = obtenerCarrito();

            carrito = carrito.filter(
                producto => producto.id !== id
            );

            guardarCarrito(carrito);

            document
                .getElementById(`product-${id}`)
                ?.remove();

            actualizarResumen();
        });
    });
}

function agregarEventosCantidad()
{
    document
    .querySelectorAll(".select-bottom")
    .forEach(select =>
    {
        select.addEventListener("change", () =>
        {
            let id = Number(select.dataset.id);
            let nuevaCantidad = Number(select.value);

            let carrito = obtenerCarrito();

            let producto = carrito.find(
                p => p.id === id
            );

            if(producto)
            {
                producto.cantidad = nuevaCantidad;
            }

            guardarCarrito(carrito);

            actualizarResumen();
        });
    });
}

function calcularCantidadTotal()
{
    let carrito = obtenerCarrito();

    return carrito.reduce(
        (acum, producto) =>
            acum + producto.cantidad,
        0
    );
}

function calcularPrecioTotal()
{
    let carrito = obtenerCarrito();

    return carrito.reduce(
        (acum, producto) =>
            acum + producto.precio * producto.cantidad,
        0
    );
}

function actualizarResumen()
{
    document.getElementById("total-quantity")
        .textContent =
            calcularCantidadTotal();

    document.getElementById("merchandise-total")
        .innerHTML =
            `${calcularPrecioTotal().toFixed(2)}
             <span class="price">USD</span>`;
}

function cargarProductosCarrito() 
{
    let cart = document.querySelector(".cart-items");
    let carrito = obtenerCarrito();
    if (carrito.length === 0) {
        //--- Si el carrito no tiene elementos directamente termino la funcion ---//
        return;
    }
    carrito.forEach(producto => {
        //--- Por cada producto agrego a la tabla los valores correspondientes de cada producto ---//
        cart.innerHTML += `
            <div class="cart_list__list_item" id="product-${producto.id}">
                <div class="cart_list__list_item_img">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="cart_list__list_item__info">
                    <div class="cart_list__list_item__info_name">
                       <p>${producto.nombre}</p>
                    </div>
                    <div class="cart_list__list_item__info_right">
                        <div class="cart_list__list_item__info_right_price">
                            <p class="cart_list__list_item__info_summary">Unit Price</p>
                            ${producto.precio}
                            <span class="price">USD</span>
                        </div>
                  </div>
                </div>
                <div class="cart_list__list_item_btns">
                    <div class="cart_list__list_item_btns_qty">
                        <div class="select">
                            <span class="qty-label">Qty:</span>
                            <select name="quantity" class="select-bottom" data-id="${producto.id}">
                                <option class="select-quantity" value="1" ${producto.cantidad === 1 ? "selected" : ""}>1</option>
                                <option class="select-quantity" value="2" ${producto.cantidad === 2 ? "selected" : ""}>2</option>
                                <option class="select-quantity" value="3" ${producto.cantidad === 3 ? "selected" : ""}>3</option>
                                <option class="select-quantity" value="4" ${producto.cantidad === 4 ? "selected" : ""}>4</option>
                                <option class="select-quantity" value="5" ${producto.cantidad === 5 ? "selected" : ""}>5</option>
                            </select>
                        </div>
                    </div>
                    <div class="cart_list__list_item_btns_delete">
                        <button class="btn-delete" data-id="${producto.id}">Delete</button>
                    </div>
                </div>    
            </div>
        `;
    }  
    ) ;
    agregarEventosDelete();
    agregarEventosCantidad();
    actualizarResumen();
}

function limpiarCarrito() 
{   //--- Remuevo el carrito del localStorage y reasigno la tabla y el valor final a sus estados originales ---//
    localStorage.removeItem("carrito");
    document.querySelector(".cart-items").innerHTML = "";
    actualizarResumen();
    alert("Carrito limpiado correctamente");
}



// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{   iniciarTema();
    cargarProductosCarrito();
});