// ===============================
//    Utilidades de rutas (ESM)
// ===============================

// Convertir import.meta.url → ruta de archivo
import { fileURLToPath } from "url";

// Herramientas para manejar rutas
import { dirname, join } from "path";

// Ruta del archivo actual (utils/index.js)
const __filename = fileURLToPath(import.meta.url);

// Retrocedemos 3 carpetas: utils → routes → api → src → (¡llegamos a root!)
const __dirname = join(dirname(__filename), "../../../");

// Exportamos para usar en todo el proyecto
export { __dirname, 
    join };


