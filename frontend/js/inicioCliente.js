
function init(){
    limpiarLocalStorage();
    iniciarTema();
    agregarEventoNombreUsuario();
}

const botonContinuar = document.querySelector(".btn-enviar");

/*-- Funcion que guarda el nombre del usuario y el tema al localStorage.  ---*/ 



function guardar(){
    const campoNombreUsuario = document.getElementById("nombre-usuario");
    localStorage.setItem("nombre-usuario", campoNombreUsuario.value);
    const tema = document.getElementById("tema-select");
    localStorage.setItem("tema", tema.value);
}

function agregarEventoNombreUsuario(){
    const campoNombreUsuario = document.getElementById("nombre-usuario");
    campoNombreUsuario.addEventListener("input", ()=>{
        
        if(campoNombreUsuario.value === ""){
            botonContinuar.hidden = true;
        }
        else{
            botonContinuar.hidden = false;
        }
    })
}

function limpiarLocalStorage(){
    localStorage.clear();
}

/* Funcion que inicializa la seleccion del tema.*/

function aplicarTema(tema){
    if(tema == "claro"){
        document.body.classList.remove('tema-oscuro');
    }
    else{
        document.body.classList.add('tema-oscuro');
    }
}

function iniciarTema() {
    const selectorTema = document.getElementById("tema-select");
    aplicarTema(selectorTema.value);
    selectorTema.addEventListener('change', () => {
        aplicarTema(selectorTema.value);
    });
}

init();