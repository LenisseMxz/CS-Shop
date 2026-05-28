const db = require('../lib/db.js');

//carrito de compras, para agregar productos al carrito, eliminar productos del carrito, y mostrar el carrito, y tambien para crear una orden con el carrito
exports.order_create_post = async (req, res) => {
    const id_user = req.user.id; //es para obtener el id del usuario que esta haciendo la orden, que se obtiene el token por el middleware de autenticacion, me explico? xd
    const {total_price, products} = req.body; //esto es para obtener el total de la orden y los productos que se van a comprar, que se envia desde el frontend

    const sql = "INSERT INTO orders (id_user, total_price) VALUES (?, ?)"; //esto es para insertar la nueva orden en la base de datos, con el id del usuario y el total de la orden
    const [result] = await db.query(sql,[id_user, total_price]); //esto es para ejecutar la consulta y obtener el resultado, que es el id de la nueva orden que se acaba de crear

    const id_order = result.insertId; //esto es para preguntarle a la bd que id se le asigno a la orden

    for(let i = 0; i < products.length; i++){ //esto es para recorrer el array de productos que se van a comprar y agregar cada producto a la tabla order_products, que es la tabla que relaciona las ordenes con los productos y tambien para actualizar la cantidad de productos en la tabla products
        const product = products[i]; //esto es para obtener el producto actual del array
        const sql = "INSERT INTO order_details (id_order, id_product, qty, individual_price) VALUES (?, ?, ?, ?)"; //esto es para insertar el producto en la tabla order_products, con el id de la orden, el id del producto y la cantidad que se va a comprar
        await db.query(sql, [id_order, product.id, product.qty, product.price]); //esto es para ejecutar la consulta y agregar el producto a la tabla order_products
    }

    return res.json({message: "orden creada"}); //esto es para enviar la respuesta al cliente, que la orden se creo exitosamente
};


exports.order_user_list = async (req, res) => { 
    const id_user = req.user.id; //esto es para obtener el id del usuario que esta haciendo la consulta, que se obtiene el token por el middleware de autenticacion

    const sql = "SELECT o.total_price, od.qty, od.individual_price, p.name AS product_name, p.description FROM orders o INNER JOIN order_details od ON o.id = od.id_order INNER JOIN products p ON od.id_product = p.id WHERE o.id_user = ? ORDER BY o.order_date DESC"; //esto es para obtener todas las ordenes del usuario que esta haciendo la consulta, con el total de la orden, la cantidad de cada producto, el precio individual de cada producto, el nombre y la descripcion de cada producto, haciendo un inner join entre las tablas orders, order_details y products y las palabritas esas son los apodos para no estar escribiendo el nombre completo todo el rato
    const [rows] = await db.query(sql, [id_user]); //esto es para ejecutar la consulta y obtener el resultado, que es un array de ordenes
    return res.json(rows); //esto es para enviar la respuesta al cliente, en formato json, que es un array de ordenes
};


exports.admin_client_user = async (req,res) => { //esto es para que el admin pueda buscar a un cliente por su nombre, para poder ver sus ordenes
    const {user} = req.params; //esto es para obtener el nombre que se va a buscar
    
    const sql = "SELECT * FROM users WHERE user ?AND rol ='customer'"; //esto es para obtener todos los usuarios que tienen el rol de customer, que son los clientes
    const [rows] = await db.query(sql,[user]); //esto es para ejecutar la consulta y obtener el resultado, que es un array de clientes
    return res.json(rows[0]); //esto es para enviar la respuesta de todos los datos del cliente que se encontro, en formato json
};