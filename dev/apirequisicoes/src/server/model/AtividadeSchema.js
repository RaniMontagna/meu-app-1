const mongoose = require("mongoose");

const AtividadeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  status: { type: String },
  prazo: { type: Date },
  agendaInicio: { type: Date },
  dataHoraTermino: { type: Date },
  colaborador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colaborador",
    required: true,
  },
  requisicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requisicao",
    required: true,
  },
});

module.exports = mongoose.model("Atividade", AtividadeSchema);
