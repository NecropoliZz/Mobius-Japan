import express from "express";
import {productoRoutes, viewRoutes, ticketsRoutes, loginRoutes, usuariosRoutes} from "./src/api/routes/index.js"
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
const app = express();
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";


// Config
const {port, session_key} = environments;
const PORT = port;


// Middlewares
app.use(cors()); 
app.use(loggerUrl);
app.use(express.json()); 
app.use(express.urlencoded({
    extended: true
}));

// configuraciones
app.set("view engine", "ejs")
app.set("views", join(__dirname, "src/views"));
app.use(express.static(join(__dirname, "src/public")));
app.use("/uploads",express.static(join(__dirname, "uploads")))
app.use(session({
    secret: session_key, 
    resave: false, 
    saveUninitialized: true 
}));

// Endpoints
app.use("/api/productos", productoRoutes);
app.use("/dashboard", viewRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/login",loginRoutes);
app.use("/api/usuarios", usuariosRoutes)


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} nyan`);
});