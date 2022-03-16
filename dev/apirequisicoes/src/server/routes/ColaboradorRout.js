const express = require("express");
const routes = express.Router();
const controle = require("../controller/ColaboradorCont");

routes.route("/colaborador").get(controle.listar);
routes.route("/colaborador").post(controle.incluir);
routes.route("/colaborador").put(controle.alterar);
routes.route("/colaborador/:id").delete(controle.excluir);
routes.route("/colaborador/:id").get(controle.obterPeloId);
routes.route("/colaborador/filtro/:filtro").get(controle.filtrar);

module.exports = routes;
