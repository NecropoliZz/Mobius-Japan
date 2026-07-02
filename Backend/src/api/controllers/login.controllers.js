import usuariosModels from "../models/usuarios.models.js";
import bcrypt from "bcrypt"

export const loginVista = (req, res) => {
   res.render("login",
    {
        title: "Login"
    });
}

export const validarLoginInfo = async (req, res) => {

    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.render("login",{
                title: "Login",
                error: "Envia todos los datos"
            })
        }

        const [filas] = await usuariosModels.selectUsuario(email);

        if(filas.length === 0){
            return res.render("login", {
                title: "Login",
                error: "usuario no encontrado"
            });
        }
        const user = filas[0];
        const match = await bcrypt.compare(password, user.password);
        

        if(!match){
            return res.render("login", {
                title: "Login",
                error: "datos invalidos"
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        res.redirect("/dashboard/index")

    }catch(error)
    {
        console.log(error);
    }
}

export const destruirLogin = (req, res) => {
    req.session.destroy((error) => {
        if(error){
            console.log("Error al destruir la sesion", error);
            return res.status(500).json({
                message: "Error al cerrar la sesion"
            })
        }
        res.redirect("/login");

    });
}