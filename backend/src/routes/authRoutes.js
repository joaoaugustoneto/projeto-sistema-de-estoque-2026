const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para cadastrar um novo usuário
router.post('/register', authController.register);

// Rota para autenticar um usuário e receber o token JWT
router.post('/login', authController.login);

module.exports = router;
