const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); //importamos el controlador de productos para usar sus funciones en las rutas
const {verifyToken} = require('../middleware/authMiddleware'); //importamos el middleware de autenticacion para proteger las rutas de admin
const orderController = require('../controllers/orderController'); //importamos el controlador de ordenes para usar sus funciones en las rutas

router.post('/products', verifyToken, productController.add_product); //ruta para agregar un nuevo producto
router.put('/products/:id', verifyToken, productController.product_update); //ruta para actualizar un producto existente

router.get('/users/:username', verifyToken, orderController.admin_client_user); //ruta para mostrar la lista de clientes

module.exports = router;