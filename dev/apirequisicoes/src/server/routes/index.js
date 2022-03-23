const { Router } = require("express");
const routes = Router();

// Liberar origens para requisições
var cors = require("cors");
routes.use(cors({ origin: "*" }));
//routes.use(cors({origin: 'http://localhost:3001'}));

// rotas colaborador
const colaboradorRout = require("./ColaboradorRout");
routes.use("/api", colaboradorRout);

// rotas solicitantes
const solicitanteRout = require("./SolicitanteRout");
routes.use("/api", solicitanteRout);

// rotas tipoRequisicao
const tipoRequisicaoRout = require("./TipoRequisicaoRout");
routes.use("/api", tipoRequisicaoRout);

// rotas andamento
const andamento = require("./AndamentoRout");
routes.use("/api", andamento);

// rotas atividade
const atividade = require("./AtividadeRout");
routes.use("/api", atividade);

// rotas requisição
const requisicao = require("./RequisicaoRout");
routes.use("/api", requisicao);

module.exports = routes;
