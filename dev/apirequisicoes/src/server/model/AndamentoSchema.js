const mongoose = require("mongoose");

const AndamentoSchema = new mongoose.Schema({
  dataHora: { type: Date },
  titulo: { type: String, required: true },
  descricao: { type: String },
  colaborador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colaborador",
    required: true,
  },
  atividade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Atividade",
    required: true,
  },
});

module.exports = mongoose.model("Andamento", AndamentoSchema);
