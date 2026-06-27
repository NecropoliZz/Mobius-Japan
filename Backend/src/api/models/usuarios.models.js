import connection from "../database/db.js";

const selectUsuario = (email, password) =>{
    const sql = "SELECT id, nombre, email FROM usuarios WHERE email = ? AND password = ?";
    return connection.query(sql, [email, password]);
}

export default{
    selectUsuario
}