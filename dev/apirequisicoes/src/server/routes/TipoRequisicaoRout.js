const express = require("express");
const routes = express.Router();
const controle = require("../controller/TipoRequisicaoCont");

routes.route("/tipoRequisicao").get(controle.listar);
routes.route("/tipoRequisicao").post(controle.incluir);
routes.route("/tipoRequisicao").put(controle.alterar);
routes.route("/tipoRequisicao/:id").delete(controle.excluir);
routes.route("/tipoRequisicao/:id").get(controle.obterPeloId);
routes.route("/tipoRequisicao/filtro/:filtro").get(controle.filtrar);

module.exports = routes;
