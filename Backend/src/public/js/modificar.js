const getProductForm = document.getElementById("get-producto-form");
const contenedorProducto = document.getElementById("contenedor-producto");
const contenedorFormSetProducto = document.getElementById("seccion-form-modificar");

const urlBase = "http://localhost:3000/api/productos";

getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); //Evita que la pagina se recargue sola al enviar el submit

    const idProd = event.target.idProd.value.trim();
    
    if (!idProd) {
        mostrarMensaje("error", "Ingresá un id válido");
        return;
    }
    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const datos = await response.json();
  
        if (!response.ok) {
            mostrarMensaje("error", datos.message);
            return;
        }
        renderizarProducto(datos.payload[0]);
        contenedorFormSetProducto.innerHTML = "";

    } catch (error) {
        console.error(error.message);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    contenedorProducto.innerHTML= `
        <div class="lista-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Categoria: ${producto.categoria} / <strong>Precio: $${producto.precio}</strong></p>
            <input type="button" id="btn-modificar" class="btn" value="Ver formulario de modificacion">
        </div>`;

    const btnModificar = document.getElementById("btn-modificar");
    btnModificar.addEventListener("click", event => {
        event.stopPropagation();
        renderFormSetProducto(producto);
    });
}


function renderFormSetProducto(producto) {
    contenedorFormSetProducto.innerHTML = `
    <form id="form-modificar" class="form-alta">

        <input type="hidden" name="id" value="${producto.id}">

        <label for="nameProd">Nombre</label>
        <input type="text" name="nombre" id="nameProd" value="${producto.nombre}" required>

        <label for="imageProd">Imagen</label>
        <input type="text" name="imagen" id="imageProd" value="${producto.imagen}" required>

        <label for="categoryProd">Categoria</label>
        <select name="categoria" id="categoryProd" required>
            <option value="juguete" ${producto.categoria === "juguete" ? "selected" : ""} >juguete</option>
            <option value="figura" ${producto.categoria === "figura" ? "selected" : ""} >figura</option>
        </select>

        <label for="priceProd">Precio</label>
        <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>
        <label for="activeProd">Activo</label>
        <select name="activo" id="activeProd">
            <option value="1" ${producto.activo == 1 ? "selected" : ""}>activo</option>
            <option value="0" ${producto.activo == 0 ? "selected" : ""}>inactivo</option>
        </select>
        
        <div>
            <input type="submit" class="btn" value="Guardar cambios">
        </div>
    </form>
    `;
    const formModificar = document.getElementById("form-modificar");

    formModificar.addEventListener("submit", event => {
        const confirmacion = confirm("Querés actualizar este producto?");
        if(!confirmacion) {
            mostrarMensajeAviso("Modificacion cancelada")
        } else {
            actualizarProducto(event);
        }
        
    });
}
async function actualizarProducto(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch(urlBase, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            mostrarMensaje("error", "Hubo un error con modificar el producto");
            return;
        }
        mostrarMensaje("exito", "Producto modificado con exito");

    } catch (error) {
        console.error(error);
        mostrarMensaje("error", "Ocurrio un error interno del")
    }
}

function mostrarMensaje(tipo, mensaje) {
    contenedorFormSetProducto.innerHTML = "";
    contenedorProducto.innerHTML = `
        <p class="mensaje mensaje-${tipo}">${mensaje}</p>`;
}
function mostrarMensajeAviso(mensaje){
    contenedorFormSetProducto.innerHTML = "";
    contenedorProducto.innerHTML = `
        <p class="mensaje">${mensaje}</p>`;
}