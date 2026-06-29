import productosModels from "../models/productos.models.js";


export const obtenerProductos = async (req, res) => {
    
    try {
        
        //Traemos la filas y meta data del resultado de models
        const [rows, fields] = await productosModels.selectProductosActivos();

        
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
    
        res.status(200).json({
            payload: rows,
            total: rows.length 
        });

    } catch (error) {
        console.log("Error obteniendo los productos: ", error);

        
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

export const obtenerProductoPorId = async (req, res) => {

    try {
        
        const [rows] = await productosModels.selectProductoPorId(req.id);
    
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${req.id}`
            });
        }
    
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${req.id}`, error.message);

        
        res.status(500).json({
            message: `Error interno al obtener un producto con id ${req.id}`
        });
    }
}

export const crearProducto = async (req, res) => {

    try {
        
        console.log(req.body);
        
        const { nombre, imagen, categoria, precio, activo} = req.body;

        const [rows] = await productosModels.intoProducto(nombre,imagen,precio,categoria, activo)
        
        res.status(200).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

export const modificarProducto = async (req, res) => {
   
    try {
        console.log(req.body.id)

        const { id, nombre, imagen, precio, categoria, activo } = req.body;

        if (!nombre || !imagen || !precio || !categoria || !activo) {
            return res.status(400).json({
                message: "Todos los campos del formulario son requeridos"
            });
        }
        const [result] = await productosModels.updateProducto(nombre,imagen,precio,categoria,id,activo)
        
        // Verificamos si realmente se actualizo algo, guardando la respuesta de la BBDD
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se actualizó ningún campo"
            })
        }
    
        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const borrarProducto = async (req, res) => {

    try {
    
        await productosModels.deleteProducto(req.id);
    
        res.status(204).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log(`Error en peticion DELETE`, error);

        //Enviamos una respuesta 500 al cliente
        res.status(500).json({
            message : "Error interno del servidor"
        });
    }
}