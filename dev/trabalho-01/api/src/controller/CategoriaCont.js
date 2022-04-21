const Categoria = require('../model/CategoriaSchema');

module.exports = {
  listar: async (req, res) => {
    Categoria.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    }).sort({ titulo: 1 }); // -1 decrescente 1 crescente
  },

  incluir: async (req, res) => {
    let obj = new Categoria(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  alterar: async (req, res) => {
    let obj = new Categoria(req.body);
    Categoria.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Categoria.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json('message:ok');
    });
  },

  obterPeloId: async (req, res) => {
    Categoria.findOne({ _id: req.params.id }, function (err, obj) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(obj);
      }
    });
  },
};
