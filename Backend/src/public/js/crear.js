
function validarFormulario(data) {
const errores = [];

if (!data.nombre || data.nombre.trim().length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres");
}

if (!data.precio || isNaN(data.precio) || Number(data.precio) < 0) {
    errores.push("El precio debe ser un numero mayor a 0");
}

if (!data.categoria) {
    errores.push("Debe seleccionarse una categoria");
}

return errores;
}

async function postProducto(event){
    event.preventDefault();
            
    const formularioAlta = event.target;

    const formData = new FormData(formularioAlta);

    const data = Object.fromEntries(formData.entries());

    data.precio = Number(data.precio);
     
    console.log(data);  

    const errores = validarFormulario(data);

    if (errores.length > 0) {          
    return; 
    }

    try {
    
    const response = await fetch("http://localhost:3000/api/productos/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    });

    console.log(response);

    const result = await response.json();

    if (!response.ok) {
    console.log(result.message)
    alert(`${result.message}`)
    return;
    }            

   
    alert(`${result.message} con id ${result.productId}`)
    

    formularioAlta.reset();

    } catch (error) {
    console.error("Error al enviar los datos: ", error);
    }

}
async function postUsuario(event){
    event.preventDefault();
            
    const formularioAlta = event.target;

    const formData = new FormData(formularioAlta);

    const data = Object.fromEntries(formData.entries());

    if(!data.nombreUsuario || !data.emailUsuario || !data.passwordUsuario){
        alert("se deben rellenar todos los campos")
        return
    }

    try {
    
    const response = await fetch("http://localhost:3000/api/usuarios/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    });

    console.log(response);

    const result = await response.json();

    if (!response.ok) {
    console.log(result.message)
    alert(`${result.message}`)
    return;
    }            
   
    alert(`usuario creado con exito`)

    formularioAlta.reset();

    } catch (error) {
    console.error("Error al enviar los datos: ", error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
const formularioProducto = document.getElementById("formularioProducto");
const formularioUsuario = document.getElementById("formularioUsuario");
console.log(formularioProducto);
formularioProducto.addEventListener("submit", postProducto);
formularioUsuario.addEventListener("submit", postUsuario);
});