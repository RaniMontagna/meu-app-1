const mongoose = require('mongoose');

const TarefasSchema = new mongoose.Schema({
  resumo: { type: String, required: true },
  descricao: { type: String },
  status: { type: Number, default: 0 },
  responsavel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Responsavel',
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
});

module.exports = mongoose.model('Tarefas', TarefasSchema);
