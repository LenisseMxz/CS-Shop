const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); //importamos el controlador de ordenes para usar sus funciones en las rutas
const productController = require('../controllers/productController'); //importamos el controlador de productos para usar sus funciones en las rutas, para mostrar el catalogo de productos en el frontend
const {verifyToken} = require('../middleware/authMiddleware'); //importamos el middleware de autenticacion para proteger las rutas de ordenes

router.get ('/products',verifyToken, productController.product_list); //ruta para mostrar el catalogo de productos
router.get('/products/search',verifyToken ,productController.product_search); //ruta para buscar un producto por su nombre

router.post('/orders', verifyToken, orderController.order_create_post); //ruta para crear una nueva orden, protegida por el middleware de autenticacion

router.get('/orders/history', verifyToken, orderController.order_user_list); //ruta para mostrar las ordenes del usuario que esta haciendo la consulta, protegida por el middleware de autenticacion

module.exports = router;