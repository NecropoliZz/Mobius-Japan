// Controlador de vistas
import productosModels from "../models/productos.models.js";

////////////////////
// Vista principal
export const indexView = async (req, res) => {
    try {

        const [rows] = await productosModels.selectProductosActivos();

        res.render("index", {
            title: "Dashboard",
            productsArray: rows
        });

    } catch (error) {
        console.log("Error obteniendo informacion", error.message);

        res.status(500).json({
            message: "Error interno obteniendo la informacion"
        });

    }
}

// Vista consultar
export const consultarView = (req, res) => {
    res.render("consultar", {
        title: "Consultar"
    })
}

// Vista crear
export const crearView = (req, res) => {
    res.render("crear", {
        title: "crear"
    })
}

//Vista modificar
export const modificarView = (req,res)=>{
    res.render("modificar",{
        title:"Modificar"
    })
}