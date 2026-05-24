const mysql = require('mysql2/promise');    //se usa la libreria promise porque podemos seguir atendiendo otras consultas mientras se resuelve la consulta a la base de datos

const connection = mysql.createPool({ //se usa createPoool para que haya más de una conexion a la bd y no atender una consulta a la vez
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,   //este es si las 10 conexiones estan ocupadas, las consultas se esperan hasta que haya una disponible
    connectionLimit: 10, //este es numero maximo de conexiones en la bd, si supera el numero, las consultas se esperan hasta que haya una conexion disponible
    queueLimit: 0   //este es el limite de consultas en espera, pero si se pone 0, no hay limite, se reciben todas las consultas
});

//connection.connect(); //lo comente porque el pool se conecta en automatico cuando se ocupa
module.exports = connection;