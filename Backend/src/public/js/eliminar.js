const contenedorProducto = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("producto-form");
const urlBase = "http://localhost:3000/api/productos";
        
getProductForm.addEventListener("submit", async event => {
    event.preventDefault();
    const idProd = event.target.idProd.value.trim();
    if(!idProd){
        mostrarMensajeFeedback("error","El id no es valido");
    }
    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const data = await response.json();
        if(!response.ok){
            mostrarMensajeFeedback("error",data.message);
        }
        if(response.ok) {
            const producto = data.payload[0];
            renderizarProducto(producto);
        }
    }catch (error) {
        mostrarMensajeFeedback("error","Error interno con el servidor");
        console.error(error);
    }
})

/* Funcion que unicamente renderiza el producto pasado como parametro.
Se renderiza un boton que al hacer click invoca a una funcino que elimina dicho producto*/

function renderizarProducto(producto){
    contenedorProducto.innerHTML = `
        <div class="lista-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong></p>
            <button id="btn-eliminar" class="btn" onClick= eliminarProducto(${producto.id}) > Eliminar</button>
        </div>`;
}

/* Funcion que envia una peticion para eliminar un producto por su id. Recibe el id por parametro*/
async function eliminarProducto(id){
    const confirmarEliminacion = confirm("Estas seguro de eliminarlo ?");
    if(confirmarEliminacion){
        try {
            const response = await fetch(`${urlBase}/${id}`,
                {method: "DELETE"});
                
            const dataResponse = await response.json();
            
            if(response.ok){
                mostrarMensajeFeedback("exito", dataResponse.message);
            }
            else{
                mostrarMensajeFeedback("error", dataResponse.message);
            }

        }catch (error) {
            mostrarMensajeFeedback("error","Error interno con el servidor");
            console.error(error);
        }
    }
    else{
        mostrarMensajeInfo("Producto no eliminado")
    }
}

/* Funcion que envia un mensaje al usuario mostrandole el resultado de su accion con nuestro sistema */
function mostrarMensajeFeedback(tipo, mensaje) {
    contenedorProducto.innerHTML = `<p class="mensaje mensaje-${tipo}">${mensaje}</p>`;
}
function mostrarMensajeInfo(mensaje){
    contenedorProducto.innerHTML = `<p class="mensaje">${mensaje}</p>`;
}