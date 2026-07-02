import connection from "../database/db.js";

// Traer solo los productos activos
const selectProductosActivos = () => {
    const sql = "SELECT id, nombre, precio, imagen, categoria FROM productos WHERE activo = 1";
    return connection.query(sql);
}

//Traer todos los productos
const selectProductosAll = () => {
    const sql = "SELECT id, nombre, precio, imagen, categoria, activo FROM productos";
    return connection.query(sql);
}

// Traer producto por Id
const selectProductoPorId = (id) => {
    const sql = "SELECT id, nombre, precio, imagen, categoria, activo FROM productos WHERE productos.id = ?";
    return connection.query(sql, [id]);
}
//Crear Producto
const intoProducto = (nombre, imagen, precio, categoria) => {
    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [nombre, imagen, categoria, precio]);
}
// Modificar producto
const updateProducto = (nombre, imagen, precio, categoria, id, activo) => {
    const sql = "UPDATE productos SET nombre = ?, imagen = ?, precio = ?, categoria = ?, activo = ? WHERE id = ?";   
    return connection.query(sql, [nombre, imagen, precio, categoria, activo, id]);

}
//Borrar Producto
const deleteProducto = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?"
    return connection.query(sql, [id]);

}
export default {
    selectProductosActivos,
    selectProductosAll,
    selectProductoPorId,
    intoProducto,
    updateProducto,
    deleteProducto
}