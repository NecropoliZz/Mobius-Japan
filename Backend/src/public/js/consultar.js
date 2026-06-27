const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("producto-form");
const urlBase = "http://localhost:3000/api/productos";

        
getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); // Evitamos el envio por defecto del formulario

    const idProd = event.target.idProd.value.trim();

    //Nos aseguramos de que se haya enviado un id valido
    if (!idProd) {
        return;
    }
            
    try {
    
    const response = await fetch(`${urlBase}/${idProd}`);
    console.log(response);

    const data = await response.json();
    
    if (!response.ok) {
        return;
        }

    console.log(data.payload[0]); 

    const producto = data.payload[0];

    const htmlProducto = `
                    <ul>
                        <li class="lista-producto">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong></p>
                        </li>
                    </ul>
                `;

    contenedorProductos.innerHTML = htmlProducto;

    } catch (error) {
        console.error("Error al obtener productos: ", error);

    }
    })