const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

// Define as rotas para o endpoint principal da API
router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;