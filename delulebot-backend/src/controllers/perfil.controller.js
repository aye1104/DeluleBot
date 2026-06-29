const perfilService = require('../services/perfil.service');

const VALID_STATUS = ['disponible', 'ocupado', 'no_molestar'];

function get(req, res) {
  res.json(perfilService.get(req.user.id));
}

function update(req, res) {
  const { name, descripcion, status, photo } = req.body;
  const changes = {};

  if (name !== undefined) {
    const trimmedName = String(name).trim();
    if (trimmedName.length === 0 || trimmedName.length > 40)
      return res.status(400).json({ error: 'El nombre debe tener entre 1 y 40 caracteres.' });
    changes.name = trimmedName;
  }
  if (descripcion !== undefined) {
    if (String(descripcion).length > 100)
      return res.status(400).json({ error: 'La descripción no puede superar 100 caracteres.' });
    changes.descripcion = String(descripcion).trim();
  }
  if (photo !== undefined) {
    if (photo !== null && typeof photo === 'string' && photo.length > 300_000)
      return res.status(400).json({ error: 'La foto es demasiado grande.' });
    changes.photo = photo;
  }

  if (status !== undefined) {
    if (!VALID_STATUS.includes(status))
      return res.status(400).json({ error: `Estado no válido. Usá: ${VALID_STATUS.join(', ')}.` });
    changes.status = status;
  }

  if (Object.keys(changes).length === 0)
    return res.status(400).json({ error: 'No hay campos para actualizar' });

  res.json(perfilService.save(req.user.id, changes));
}

module.exports = { get, update };
