let botonCambiarEstilo = document.querySelector(".btn-cambiar-estilo");

function init(){
    actualizarModoNocturno(cargarEstilo());
}

function guardarEstiloALocalStorage(valor){
    localStorage.setItem("modoNocturno", valor);
}
function cargarEstilo(){
    let modoNocturnoActivo = JSON.parse(localStorage.getItem("modoNocturno"));
    if(!modoNocturnoActivo){
        modoNocturnoActivo = false;
    }
    return modoNocturnoActivo;
}
function cambiarEstilo(){
    modoNocturnoActivo = cargarEstilo();
    if(modoNocturnoActivo == false){
        modoNocturnoActivo = true;
    }
    else{
        modoNocturnoActivo = false;
    }
    actualizarModoNocturno(modoNocturnoActivo);
    guardarEstiloALocalStorage(modoNocturnoActivo);
}
function actualizarModoNocturno(modoNocturnoActivo){
    if(modoNocturnoActivo){
        estiloNocturno();
        botonCambiarEstilo.textContent = "Modo diurno";
    }
    else{
        estiloNormal();
        botonCambiarEstilo.textContent = "Modo nocturno";
    }
}

function estiloNocturno(){
    document.documentElement.style.setProperty("--color-fondo", "#000");
    document.documentElement.style.setProperty("--color-texto","#fff");
    document.documentElement.style.setProperty("--color-bordes","#fff");
    document.documentElement.style.setProperty("--color-formulario-sombra","#fff");
    document.documentElement.style.setProperty("--color-fondo-hover","#fff");
    document.documentElement.style.setProperty("--color-texto-hover","#000");

}
function estiloNormal(){
    document.documentElement.style.setProperty("--color-fondo", "#fff");
    document.documentElement.style.setProperty("--color-texto","#000");
    document.documentElement.style.setProperty("--color-bordes","#000");
    document.documentElement.style.setProperty("--color-formulario-sombra","#000");
    document.documentElement.style.setProperty("--color-fondo-hover","#000");
    document.documentElement.style.setProperty("--color-texto-hover","#fff");
    
}
init();