//este maneja el catalogo de los proctuctos y las funciones de agregar, eliminar y editar productos, solo para el admin

const db = require('../lib/db');

exports.product_list = async (req, res) => {   //esto es para mostrar el catalogo de productos, tanto para admin como para user
    
    const sql = "SELECT * FROM products"; //esto es para obtener todos los productos de la base de datos
    const [rows] = await db.query(sql); //esto es para ejecutar la consulta y obtener el resultado

    return res.json(rows); //esto es para enviar el resultado al cliente
};

exports.product_search = async (req, res) => { //esto es para buscar un producto por su nombre, tanto para admin como para user

    const {name} = req.query; //esto es para obtener el nombre del producto que se quiere buscar, se usa req.query porque se envia como parametro en la url, ya te la sabes mas que yo xd
  
    const sql = "SELECT * FROM products WHERE name LIKE ?"; //esto es para buscar el producto en la base de datos, se usa LIKE para que busque por coincidencia, y el ? es para evitar inyeccion sql
    const [rows] = await db.query(sql, [`%${name}%`]); //esto es para ejecutar la consulta y obtener el resultado, se usa % para que busque por coincidencia en cualquier parte del nombre

    return res.json(rows);
};

//para los admins
exports.add_product = async (req, res) => {   //esto es para agregar un nuevo producto
    const {name, price, qty, description} = req.body; //esto es para obtener los datos del nuevo producto que se quiere agregar

    const sql = "INSERT INTO products (name, price, qty, description) VALUES (?, ?, ?, ?)"; //esto es para insertar el nuevo producto en la base de datos

    await db.query(sql, [name, price, qty, description]); //esto es para ejecutar la consulta y agregar el nuevo producto a la base de datos
    
    return res.json({message: "producto agregado"});
};


exports.product_update = async (req, res) => {    //esto es para actualizar un producto existente

    const {id} = req.params; //esto es para obtener el id del producto que se quiere actualizar
    const {name, price, qty, description} = req.body; //esto es para obtener los nuevos datos del producto que se quiere actualizar

    const sql = "UPDATE products SET name = ?, price = ?, qty = ?, description = ? WHERE id = ?"; //esto es para actualizar el producto en la base de datos

    await db.query(sql, [name, price, qty, description, id]); //esto es para ejecutar la consulta y actualizar el producto en la base de datos

    return res.json({message: "producto actualizado"});
};