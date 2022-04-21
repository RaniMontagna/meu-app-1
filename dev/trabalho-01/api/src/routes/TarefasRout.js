const express = require('express');
const routes = express.Router();
const controle = require('../controller/TarefasCont');

routes.route('/tarefas').get(controle.listar);
routes.route('/tarefas').post(controle.incluir);
routes.route('/tarefas').put(controle.alterar);
routes.route('/tarefas/:id').delete(controle.excluir);
routes.route('/tarefas/:id').get(controle.obterPeloId);

module.exports = routes;
