const express = require('express');
const rotas = express.Router();
const gruposController = require('../controllers/GruposControllers');

// cadastrar grupo
rotas.post('/', gruposController.cadastrarGrupo);

// listar grupos
rotas.get('/', gruposController.listarGrupos);

// editar grupo
rotas.put('/:id', gruposController.editarGrupo);

// excluir grupo
rotas.delete('/:id', gruposController.excluirGrupo);

module.exports = rotas;
