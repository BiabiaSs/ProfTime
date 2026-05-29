const express = require('express');
const routes = express.Router();

const { redefinirSenha } = require('../controllers/RedefinirSenhaControllers');

// POST /redefinir-senha
routes.post('/', redefinirSenha);

module.exports = routes;