const express = require('express');
const routes = express.Router();

const { recuperarSenha } = require('../controllers/RecuperarSenhaControllers');

// POST /recuperar-senha
routes.post('/', recuperarSenha);

module.exports = routes;