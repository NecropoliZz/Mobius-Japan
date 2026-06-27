/* const contenedorProductos = document.getElementById("contenedor-productos");

const url = "http://localhost:3000/api/productos/";

async function obtenerProductos() {
    try {

        const response = await fetch(url);
        console.log(response);

        //Verificamos que la respuesta HTTP fue exitosa
            if (!response.ok) {
                // Traemos el message que devuelve el 500
                const bodyResponse = await response.json();
                throw new Error(`${bodyResponse.message}`);
            }

            const { payload } = await response.json();
            console.log(payload);
                
            renderizarProductos(payload);

            } catch (error) {
                console.error(error);
                
                //mostrarError(error);
            }

        }

function renderizarProductos(array) {
   let htmlProductos = "";
   array.forEach(producto => {
                htmlProductos += `
                    <div class="card-producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h4>${producto.nombre}</h4>
                        <p>Id: ${producto.id}</p>
                        <p>$${producto.precio}</p>
                    </div>
                `;
            });

        contenedorProductos.innerHTML = htmlProductos;
}

// function mostrarError(mensaje) {
   // contenedorProductos.innerHTML = `
     //  <p class="mensaje mensaje-error">${mensaje}</p>
         //   `;
      //  } 

obtenerProductos(); */