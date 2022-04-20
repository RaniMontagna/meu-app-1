const mongoose = require('mongoose');

const ResponsavelSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Responsavel', ResponsavelSchema);
