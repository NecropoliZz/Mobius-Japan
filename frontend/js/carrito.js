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
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}
 
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
 
function mostrarCheckout(visible) {
    document.querySelector(".contenedor-btn-comprar").style.display = visible ? "block" : "none";
}
 
function agregarEventosDelete() {
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const carrito = obtenerCarrito().filter(p => p.id !== id);
 
            guardarCarrito(carrito);
            document.getElementById(`product-${id}`)?.remove();
            actualizarResumen();
 
            if (carrito.length === 0) mostrarCheckout(false);
        });
    });
}
 
function agregarEventosCantidad() {
    document.querySelectorAll(".btn-select").forEach(select => {
        select.addEventListener("change", () => {
            const id = Number(select.dataset.id);
            const nuevaCantidad = Number(select.value);
 
            const carrito = obtenerCarrito();
            const producto = carrito.find(p => p.id === id);
            if (producto) producto.cantidad = nuevaCantidad;
 
            guardarCarrito(carrito);
            actualizarResumen();
        });
    });
}

function agregarEventocompra(){
    const boton = document.querySelector(".contenedor-btn-comprar")
    boton.addEventListener('click', async () => {
        //creamos el objeto data para guardar la data que vamos al endpoint post de ventas
        let data = {};

        data["nombre_usuario"] =  localStorage.getItem("nombre-usuario");
        data["fecha"] = new Date();
        data["precio_total"] = calcularPrecioTotal();
        data["productos"]  = [];
        //pusheamos los id de los productos
        obtenerCarrito().forEach(prod => {
            data["productos"].push(prod.id);
        })
        //Vemos que se va a enviar
        console.log(JSON.stringify(data))

        let respuesta = await fetch("http://localhost:3000/api/tickets",{
           method: "POST",
           headers: {
            "Content-Type": "application/json"
           },
           body: JSON.stringify(data)
        });

        bodydata = await respuesta.json();
        console.log(bodydata)

        if(!respuesta.ok){
            console.log(bodydata.message)
            alert("Error creando ticket")
        }
        window.location.href = "ticket.html";


    })

}
function calcularCantidadTotal() {
    return obtenerCarrito().reduce((acum, p) => acum + p.cantidad, 0);
}
 
function calcularPrecioTotal() {
    return obtenerCarrito().reduce((acum, p) => acum + p.precio * p.cantidad, 0);
}
 
function actualizarResumen() {
    document.getElementById("cantidad-total").textContent = calcularCantidadTotal();
    document.getElementById("precio-total").innerHTML =
        `${calcularPrecioTotal().toFixed(2)}<span class="moneda"> USD</span>`;
}


 
function cargarProductosCarrito() {
    const cart = document.querySelector(".carrito-lista");
    const carrito = obtenerCarrito();
 
    if (carrito.length === 0) return;
 
    mostrarCheckout(true);
 
    carrito.forEach(producto => {
        cart.innerHTML += `
            <div class="carrito-item" id="product-${producto.id}">
                <div class="carrito-item-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="carrito-item-info">
                    <div class="carrito-item-info-nombre">
                        <p>${producto.nombre}</p>
                    </div>
                    <div class="carrito-item-info-precio">
                        <span class="carrito-item-info-precio-unitario">Unit Price</span>
                            ${producto.precio}
                        <span class="moneda">USD</span>
                    </div>
                </div>
                <div class="carrito-item-btns">
                    <div class="carrito-item-btns-qty">
                        <label class="qty-label" for="qty-${producto.id}">Qty:</label>
                        <select id="qty-${producto.id}" name="quantity" class="btn-select" data-id="${producto.id}">
                            <option value="1" ${producto.cantidad === 1 ? "selected" : ""}>1</option>
                            <option value="2" ${producto.cantidad === 2 ? "selected" : ""}>2</option>
                            <option value="3" ${producto.cantidad === 3 ? "selected" : ""}>3</option>
                            <option value="4" ${producto.cantidad === 4 ? "selected" : ""}>4</option>
                            <option value="5" ${producto.cantidad === 5 ? "selected" : ""}>5</option>
                        </select>
                    </div>
                    <button class="btn-delete" data-id="${producto.id}">Borrar</button>

                </div>
            </div>
        `;
    });
 
    agregarEventosDelete();
    agregarEventosCantidad();
    actualizarResumen();
    agregarEventocompra();
}
 
function limpiarCarrito() {
    localStorage.removeItem("carrito");
    document.querySelector(".cart-items").innerHTML = "";
    mostrarCheckout(false);
    actualizarResumen();
    alert("Carrito limpiado correctamente");
}
 
window.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    cargarProductosCarrito();
});
