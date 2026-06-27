
// Middleware logger para analizar todas las solicitudes por consola (tener el historial del consumo de nuestra Api REST en la consola)
const loggerUrl = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next(); // next() da paso a que continue la respuesta o el siguiente middleware (en caso de haberlo)
};



const validarId = (req, res, next) => {
    const id = Number(req.params.id); // Transformo el id a un numbero

    // Si no es un entero o es 0 o inferior, devuelvo una respuesta 400 (Bad Request)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El id debe ser un numero entero positivo"
        });
    }

    // Incorporo el id a la req
    req.id = id;

    next(); // Damos paso al siguiente middleware o a procesar la respuesta
}

// Middleware de ruta para validar los campos de un formulario POST
const categoriasValidas = ["figura", "juguete"];
const validarProducto = (req, res, next) => {

    // Recogemos los datos del body
    const { nombre, precio, categoria } = req.body;
    

    // Array vacio de errores
    const errores = [];

    // Validamos si se recibieron todos del body
    if (!nombre || !categoria || !precio) {
        errores.push("Datos invalidos, asegurate de incluir todas las categorias");
    }

    if (typeof nombre !== "string" || nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof precio!== "number" || precio <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if(!categoriasValidas.includes(categoria)) {
        errores.push("Categoria invalida");
    };

    // Detectamos si existe algun error en la lista y lo devolvemos en un 400
    if (errores.length > 0) {
        return res.status(400).json({
            
            
            message: "Datos invalidos", errores
        });
    }

    next();
}

const validarVenta = (req, res, next) =>{

    const {nombre_usuario, fecha, precio_total} = req.body;
    const errores = []
    if(!nombre_usuario || !fecha || !precio_total){
        errores.push("Datos invalidos")
    }

    if (typeof nombre_usuario !== "string" || nombre_usuario.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof precio_total!== "number" || precio_total <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }
     
    if(errores.length > 0){
        return res.status(404).json({
            message: "Datos invalidos", errores
        });
    }

    next();

}

const requiereLogin = (req, res, next) =>{
    if(!req.session.user){
        //si no hay sesion lo mandamos al login
        return res.redirect("/login");
    }
    next();
}

export{
    loggerUrl,
    validarProducto,
    validarId,
    validarVenta,
    requiereLogin
}