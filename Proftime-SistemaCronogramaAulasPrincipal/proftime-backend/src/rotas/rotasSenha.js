const express = require("express");
const rotas = express.Router();

const { recuperarSenha } = require("../controllers/RecuperarSenha");

rotas.post("/recuperar-senha", recuperarSenha);

module.exports = rotas;