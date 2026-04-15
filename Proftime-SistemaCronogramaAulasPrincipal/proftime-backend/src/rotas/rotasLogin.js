const express = require('express');
const rotas = express.Router();
const loginController = require('../controllers/loginControllers');

rotas.post('/', loginController.login);

module.exports = rotas;
