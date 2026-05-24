const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); //importamos el controlador de productos para usar sus funciones en las rutas
const authMiddleware = require('../middleware/authMiddleware'); //importamos el middleware de autenticacion para proteger las rutas de admin

router.get('/products', productController.product_list); //ruta para mostrar el catalogo de productos, tanto para admin como para user

router.get('/products/search', productController.product_search); //ruta para buscar un producto por su nombre, tanto para admin como para user

//rutas para admin
router.post('/products/add', authMiddleware.verifyToken, productController.add_product); //ruta para agregar un nuevo producto, protegida por el middleware de autenticacion
router.put('/products/update/:id', authMiddleware.verifyToken, productController.product_update); //ruta para actualizar un producto existente, protegida por el middleware de autenticacion

module.exports = router;