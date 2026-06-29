const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  characterId:  { type: String, required: true, unique: true },
  nombre:       { type: String, required: true },
  foto:         { type: String, default: null },
  estado:       { type: String, enum: ['online', 'ocupado', 'no-molestar'], default: 'online' },
  descripcion:  { type: String, default: '' },
  personalidad: { type: String, default: '' },
});

module.exports = mongoose.model('Contacto', contactoSchema);
