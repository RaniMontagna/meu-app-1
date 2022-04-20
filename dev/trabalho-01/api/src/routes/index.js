const { Router } = require('express');
const routes = Router();

// Liberar origens para requisições
var cors = require('cors');
routes.use(cors({ origin: '*' }));
//routes.use(cors({origin: 'http://localhost:3001'}));

// rotas categorias
const categoriaRout = require('./CategoriaRout');
routes.use('/api', categoriaRout);

// rotas responsavel
const responsavelRout = require('./ResponsavelRout');
routes.use('/api', responsavelRout);

// rotas tarefas
const tarefasRout = require('./TarefasRout');
routes.use('/api', tarefasRout);

module.exports = routes;
