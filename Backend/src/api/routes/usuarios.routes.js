//usuarios rutas
import { Router } from "express";
import { crearAdminUsuario } from "../controllers/usuarios.controllers.js";
import { validarcreacionUsuario } from "../middlewares/middlewares.js";

const router = Router();

//Crear usuario
router.post("/", validarcreacionUsuario, crearAdminUsuario)


export default router;
