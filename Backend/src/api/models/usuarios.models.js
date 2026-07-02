import connection from "../database/db.js";


const selectUsuario = (email) =>{
    const sql = "SELECT id, nombre, email, password FROM usuarios WHERE email = ?";
    return connection.query(sql, [email]);
}

const insertAdminUsuario = (nombre, email, password) => {
    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    return connection.query(sql, [nombre, email, password]);
}


export default{
    selectUsuario,
    insertAdminUsuario
}