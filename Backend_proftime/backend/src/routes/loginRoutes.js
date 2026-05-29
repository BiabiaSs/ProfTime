
const express = require('express');
const routes = express.Router();

// Importa controller
const { login } = require('../controllers/loginControllers');

// Define rota POST /login
routes.post('/', login);

// Exporta rotas
module.exports = routes;