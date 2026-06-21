const botonCambiarEstilo = document.querySelector(".btn-cambiar-estilo");
const campoNombreUsuario = document.querySelector(".nombre-usuario")
const NOMBRE_USUARIO = getNombreUsuario(); // Obtengo y guardo el nombre del usuario
//export default NOMBRE_USUARIO; //Exporto el Nombre de usuario, facilitando la obtencion de nombre usuario para las demas clases 

function init(){
    iniciarTema();
}


/*-- Funcion que guarda al localStorage el nombre del usuario.  ---*/ 

function guardarNombreUsuario(){
    localStorage.setItem("nombre-usuario", campoNombreUsuario.value);
}

/*-- Funcion que obtiene el nombre del usuario del localStorage*/
function getNombreUsuario(){
    return localStorage.getItem("nombre-usuario") || "Nombre No definido";
}


/* Obtiene el valor booleano de la key "modoNocturno" y lo retorna */
function cargarEstilo(){
    let modoNocturnoActivo = JSON.parse(localStorage.getItem("modoNocturno"));
    if(!modoNocturnoActivo){
        modoNocturnoActivo = false;
    }
    return modoNocturnoActivo;
}


/* 
Cambia el valor booleano de modoNocturnoActivo. Actualiza los cambios y Guarda los el valor modificado al localStorage.
Sin retorno */

function cambiarEstilo(){
    modoNocturnoActivo = cargarEstilo();
    if(modoNocturnoActivo){
        modoNocturnoActivo = false;
    }
    else{
        modoNocturnoActivo = true;
    }
    actualizarModoNocturno(modoNocturnoActivo);
    guardarEstiloALocalStorage(modoNocturnoActivo);
}


/* Actualiza el estilo de la pagina por el valor booleano recibido como parametro.
Sin retorno*/

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


/* Cambia los colores a un estilo oscuro.
Sin retorno*/

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
    console.log("HODFLGG")
    aplicarTema(select.value);
    select.addEventListener('change', () => {
        const nuevoTema = select.value;
        localStorage.setItem('tema', nuevoTema);
        aplicarTema(nuevoTema);
    });
}

init();