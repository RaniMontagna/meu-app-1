const express = require('express');
const routes = express.Router();
const controle = require('../controller/CategoriaCont');

routes.route('/categoria').get(controle.listar);
routes.route('/categoria').post(controle.incluir);
routes.route('/categoria').put(controle.alterar);
routes.route('/categoria/:id').delete(controle.excluir);

module.exports = routes;
