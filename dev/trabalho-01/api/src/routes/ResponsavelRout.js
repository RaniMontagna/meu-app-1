const express = require('express');
const routes = express.Router();
const controle = require('../controller/ResponsavelCont');

routes.route('/responsavel').get(controle.listar);
routes.route('/responsavel').post(controle.incluir);
routes.route('/responsavel').put(controle.alterar);
routes.route('/responsavel/:id').delete(controle.excluir);

module.exports = routes;
