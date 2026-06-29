const contactosService = require('../services/contactos.service');

function getAll(req, res) {
  const contactos = contactosService.getAll();
  res.json(contactos);
}

function getOne(req, res) {
  const contacto = contactosService.getById(req.params.characterId);
  if (!contacto) return res.status(404).json({ error: 'Contacto no encontrado' });
  res.json(contacto);
}

module.exports = { getAll, getOne };
