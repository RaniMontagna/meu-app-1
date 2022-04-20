const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
