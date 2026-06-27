//Ruta de tickets/ventas
import { Router} from "express";
import { validarVenta } from "../middlewares/middlewares.js";
import { crearVenta } from "../controllers/tickets.controllers.js";

const router = Router();

//Post venta
router.post("/", validarVenta, crearVenta);

export default router;