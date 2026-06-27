import ticketsModels from "../models/tickets.models.js";

export const crearVenta = async (req, res) => {
    try{
    console.log(req.body);       
             
    const {nombre_usuario, fecha, precio_total, productos } = req.body;
     
    const [resultado] = await ticketsModels.insertVentas(nombre_usuario, fecha, precio_total);

    let idVenta = resultado.insertId;

    productos.forEach(async idProd =>  {
        const [result] = await ticketsModels.inserVentasProductos(idVenta, idProd )
    });
    
    res.status(201).json({
            message: "Ticket creado con exito",
        });

    } catch(error){
        res.status(500).json({
            message: "Error interno en el servidor",
            error: error
        });
    }
    
}

