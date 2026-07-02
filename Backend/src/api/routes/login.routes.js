//Rutas de usuarios
import { Router } from "express";
import { loginVista, validarLoginInfo, destruirLogin } from "../controllers/login.controllers.js";
const router = Router();


// Vista login
router.get("/", loginVista);

// Validar el login
router.post("/", validarLoginInfo);

//Destruir la sesion
router.post("/destruir", destruirLogin);

export default router;