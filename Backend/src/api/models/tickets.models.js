import connection from "../database/db.js";

const insertVentas = (nombre_usuario, fecha, precio_total) => {
    const sql = "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES(?, ?, ?)";
    return connection.query(sql, [nombre_usuario, fecha, precio_total]);
}

const inserVentasProductos = (id_venta, id_producto) => {
    const sql = "INSERT INTO ventas_productos (id_venta, id_producto) VALUES(?, ?)";
    return connection.query(sql, [id_venta, id_producto]);
}

export default{
    insertVentas,
    inserVentasProductos
}