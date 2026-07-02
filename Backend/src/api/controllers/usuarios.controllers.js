//usuarios controllers
import bcrypt from "bcrypt"
import usuariosModels from "../models/usuarios.models.js";

//Crear usuario admin
export const crearAdminUsuario = async (req, res) => {

    try {
        // Recogemos los datos limpios del body
        const { nombreUsuario, emailUsuario, passwordUsuario } = req.body;

        // definimos el nivel de hasheo y hasheamos la contraseña antes de insertar
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordUsuario, saltRounds);

        const [rows] = await usuariosModels.insertAdminUsuario(nombreUsuario, emailUsuario, hashedPassword);
        
        res.status(201).json({
            message: `Usuario creado con exito`,
            userId: rows.insertId
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}