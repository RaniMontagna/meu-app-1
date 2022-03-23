const Requisicao = require("../model/RequisicaoSchema");

module.exports = {
  listar: async (req, res) => {
    Requisicao.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    })
      .populate("tipoRequisicao")
      .populate("solicitante")
      .sort({ nome: 1 }); // -1 decrescente 1 crescente
  },

  incluir: async (req, res) => {
    let obj = new Requisicao(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  alterar: async (req, res) => {
    let obj = new Requisicao(req.body);
    Requisicao.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Requisicao.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },

  obterPeloId: async (req, res) => {
    Requisicao.findOne({ _id: req.params.id }, function (err, obj) {
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
    Requisicao.find(
      {
        $or: [
          { titulo: { $regex: req.params.filtro } },
          { descricao: { $regex: req.params.filtro } },
        ],
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
