// Ruta de productos
import { Router } from "express";
import { validarId, validarProducto } from "../middlewares/middlewares.js";
import { obtenerProductosActivos, obtenerProductoPorId, crearProducto, modificarProducto, borrarProducto } from "../controllers/productos.controllers.js";

const router = Router();

// GET productos activos
router.get("/", obtenerProductosActivos);


// GET by id
router.get("/:id",validarId, obtenerProductoPorId);


// POST product
router.post("/", validarProducto, crearProducto);


// UPDATE product
router.put("/", modificarProducto);


// DELETE product
router.delete("/:id", validarId, borrarProducto);

// Exportamos router
export default router;