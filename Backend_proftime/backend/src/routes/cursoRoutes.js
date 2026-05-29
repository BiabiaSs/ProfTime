const express = require('express');

const routes = express.Router();

const cursoControllers = require('../controllers/cursoControllers');


routes.get('/', cursoControllers.listarCursos);

routes.post('/', cursoControllers.cadastrarCurso);

routes.put('/:id', cursoControllers.editarCurso);

routes.delete('/:id', cursoControllers.excluirCurso);


module.exports = routes;