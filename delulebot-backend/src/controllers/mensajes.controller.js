const mensajesService = require('../services/mensajes.service');

function getAll(req, res) {
  const mensajes = mensajesService.getByContacto(req.user.id, req.params.contactoId);
  res.json(mensajes);
}

function create(req, res) {
  const { id, text, timestamp } = req.body;
  if (!text) return res.status(400).json({ error: 'text es requerido' });
  const nuevo = {
    id:        id        || Date.now().toString(36) + Math.random().toString(36).slice(2),
    senderId:  req.user.id,
    text,
    timestamp: timestamp || Date.now(),
    status:    'sent',
    reactions: [],
    deleted:   false,
  };
  const guardado = mensajesService.add(req.user.id, req.params.contactoId, nuevo);
  res.status(201).json(guardado);
}

function updateStatus(req, res) {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status es requerido' });
  const updated = mensajesService.updateStatus(req.user.id, req.params.contactoId, req.params.msgId, status);
  if (!updated) return res.status(404).json({ error: 'Mensaje no encontrado' });
  res.json(updated);
}

function addReaction(req, res) {
  const { emoji } = req.body;
  if (!emoji) return res.status(400).json({ error: 'emoji es requerido' });
  const updated = mensajesService.addReaction(req.user.id, req.params.contactoId, req.params.msgId, emoji);
  if (!updated) return res.status(404).json({ error: 'Mensaje no encontrado' });
  res.json(updated);
}

function deleteMsg(req, res) {
  const updated = mensajesService.deleteMsg(req.user.id, req.params.contactoId, req.params.msgId);
  if (!updated) return res.status(404).json({ error: 'Mensaje no encontrado' });
  res.json(updated);
}

function clearAll(req, res) {
  mensajesService.clearByContacto(req.user.id, req.params.contactoId);
  res.json({ ok: true });
}

module.exports = { getAll, create, updateStatus, addReaction, deleteMsg, clearAll };
