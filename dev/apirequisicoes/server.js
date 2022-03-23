require("dotenv").config();

console.log("Arquivo server.js executou com sucesso!");

// usar o express
const express = require("express");
const app = express();
app.use(express.json()); // para tratar json

// definir porta para a API de serviço
const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  return console.log("API executando na porta " + port);
});

// usar o mongo
require("./src/server/db/mongo");

// Usar as rotas
const routes = require("./src/server/routes/index");
app.use(routes);
