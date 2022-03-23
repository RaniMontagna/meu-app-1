const Andamento = require("../model/AndamentoSchema");

module.exports = {
  listar: async (req, res) => {
    Andamento.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("colaborador")
      .populate("atividade")
      .sort({ nome: 1 }); // -1 decrescente 1 crescente
  },

  incluir: async (req, res) => {
    let obj = new Andamento(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  alterar: async (req, res) => {
    let obj = new Andamento(req.body);
    Andamento.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Andamento.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },

  obterPeloId: async (req, res) => {
    Andamento.findOne({ _id: req.params.id }, function (err, obj) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(obj);
      }
    })
      .populate("colaborador")
      .populate("atividade");
  },

  filtrar: async (req, res) => {
    Andamento.find(
      {
        $or: [{ titulo: { $regex: req.params.filtro } }],
      },
      function (err, obj) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(obj);
        }
      }
    ).sort({ nome: -1 }); // -1 decrescente 1 crescente
  },
};
