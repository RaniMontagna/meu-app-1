const Tarefas = require('../model/TarefasSchema');

module.exports = {
  listar: async (req, res) => {
    Tarefas.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate('responsavel')
      .populate('categoria')
      .sort({ resumo: 1 }); // -1 decrescente 1 crescente
  },

  incluir: async (req, res) => {
    let obj = new Tarefas(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  alterar: async (req, res) => {
    let obj = new Tarefas(req.body);
    Tarefas.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Tarefas.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json('message:ok');
    });
  },

  obterPeloId: async (req, res) => {
    Tarefas.findOne({ _id: req.params.id }, function (err, obj) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(obj);
      }
    });
  },
};
