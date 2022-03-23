const { ObjectId } = require("mongodb");

module.exports = (app) => {
  app.get("/colaborador", (req, res) => {
    db.collection("colaborador")
      .find()
      .toArray((err, results) => {
        if (err) throw err;
        res.json(results);
      });
  });

  app.post("/colaborador", (req, res) => {
    db.collection("colaborador").insertOne(req.body, (err) => {
      if (err) throw err;
      res.json({ success: "Incluído com sucesso." });
    });
  });

  app.put("/colaborador", (req, res) => {
    var id = ObjectId(req.body._id);
    var newvalues = {
      $set: {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      },
    };
    db.collection("colaborador").updateOne(
      { _id: id },
      newvalues,
      (err, result) => {
        if (err) throw err;
        if (result.modifiedCount < 1)
          return res.json({ aviso: "Nada alterado." });
        res.json({ success: "Alterado com sucesso." });
      }
    );
  });

  app.delete("/colaborador/:id", (req, res) => {
    var id = ObjectId(req.params.id);
    db.collection("colaborador").deleteOne({ _id: id }, (err, result) => {
      if (err) throw err;
      if (result.deletedCount < 1) return res.json({ aviso: "Nada excluído." });
      res.json({ success: "Excluído com sucesso." });
    });
  });

  app.get("/colaborador/:id", (req, res) => {
    var id = ObjectId(req.params.id);
    db.collection("colaborador").findOne({ _id: id }, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/colaborador/filtro/:nome", (req, res) => {
    db.collection("colaborador")
      .find({
        $or: [
          { nome: { $regex: req.params.valor, $options: "i" } },
          { email: { $regex: req.params.valor, $options: "i" } },
          { senha: { $regex: req.params.valor, $options: "i" } },
        ],
      })
      .toArray((err, results) => {
        if (err) throw err;
        res.json(results);
      });
  });
};
