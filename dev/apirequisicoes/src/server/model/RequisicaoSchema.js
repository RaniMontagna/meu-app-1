const mongoose = require("mongoose");

const RequisicaoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  dataHoraCriada: { type: Date, default: Date.now },
  status: { type: String },
  prazoAtendimento: { type: Date },
  tipoRequisicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoRequisicao",
    required: true,
  },
  solicitante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Solicitante",
    required: true,
  },
});

module.exports = mongoose.model("Requisicao", RequisicaoSchema);
