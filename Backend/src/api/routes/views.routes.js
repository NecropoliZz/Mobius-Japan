// Ruta de productos

import { Router } from "express";
import { indexView, consultarView, crearView } from "../controllers/views.controllers.js";
import { requiereLogin } from "../middlewares/middlewares.js";

const router = Router();

// Vista principal
router.get("/index",requiereLogin, indexView);


////////////////////
// Vista obtener producto
router.get("/consultar", requiereLogin, consultarView);


////////////////////
// Vista crear producto
router.get("/crear", requiereLogin, crearView);


////////////////////
// Vista modificar producto
//router.get("/modificar", modificarView);


////////////////////
// Vista eliminar producto
//router.get("/eliminar", eliminarView);

export default router;