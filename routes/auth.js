const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); //importamos el controlador de auth para usar sus funciones en las rutas

router.post('/register', authController.register_post); //ruta para registrar un nuevo usuario

router.post('/login', authController.login_post); //ruta para iniciar sesion

module.exports = router;