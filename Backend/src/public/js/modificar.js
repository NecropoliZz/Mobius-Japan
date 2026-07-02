const getProductForm = document.getElementById("get-producto-form");
const contenedorProducto = document.getElementById("producto");
const contenedorModificarForm = document.getElementById("seccion-form-modificar");

const urlBase = "http://localhost:3000/api/productos";

getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); //Evitamos el envio por defecto HTML del formulario

    const idProd = event.target.idProd.value.trim();
    
    //Verificamos id valido
    if (!idProd) {
        mostrarMensaje("error", "Ingresá un id válido");
        return;
    }
    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        console.log(response);

        const datos = await response.json();
        console.log(datos);

        if (!response.ok) {
            mostrarMensaje("error", datos.message);
            return;
        }
        console.log("PRODUCTO ES = " + datos.payload[0]);
        const contenedorProducto = datos.payload[0];
        renderizarProducto(contenedorProducto);

    } catch (error) {
        console.error(error.message);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    contenedorProducto.innerHTML= `
    <ul>
        <li class="lista-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Categoria: ${producto.categoria} / <strong>Precio: $${producto.precio}</strong></p>
            <input type="button" id="btn-modificar" class="btn-modificar" value="Actualizar Producto">
        </li>
    </ul>`;

    const btnModificar = document.getElementById("btn-modificar");

    btnModificar.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Querés actualizar este producto?");

        if(!confirmacion) {
            alert("Actualizacion cancelada");
        } else {
            formularioPutProducto(event, producto);
        }
    });
}

// Funcion para realizar una operacion delete
async function formularioPutProducto(event, producto) {
    event.stopPropagation(); // Evitamos la propagacion de eventos
    // Reciclamos el formulario de crear producto
    const htmlForm = `
    <hr>
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
            <input type="submit" value="Actualizar producto">
        </div>
    </form>
    `;

    contenedorModificarForm.innerHTML = htmlForm;

    const formModificar = document.getElementById("form-modificar");

    formModificar.addEventListener("submit", event => {
        actualizarProducto(event);
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

        const result = await response.json();

        if(!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        mostrarMensaje("exito", result.message);

    } catch (error) {
        console.error(error);
        mostrarMensaje("error", error)
    }
}

function mostrarMensaje(tipo, mensaje) {
    contenedorModificarForm.innerHTML = "";
    producto.innerHTML = `
        <p class="mensaje mensaje-${tipo}">${mensaje}</p>`;
}