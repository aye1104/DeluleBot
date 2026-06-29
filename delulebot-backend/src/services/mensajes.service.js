const { getCollection, saveCollection } = require('../../config/db');

const key = (userId, contactoId) => `mensajes_${userId}_${contactoId}`;

function getByContacto(userId, contactoId) {
  return getCollection(key(userId, contactoId));
}

function add(userId, contactoId, mensaje) {
  const mensajes = getCollection(key(userId, contactoId));
  mensajes.push(mensaje);
  saveCollection(key(userId, contactoId), mensajes);
  return mensaje;
}

function updateStatus(userId, contactoId, msgId, status) {
  const mensajes = getCollection(key(userId, contactoId));
  const idx = mensajes.findIndex(m => m.id === msgId);
  if (idx === -1) return null;
  mensajes[idx].status = status;
  saveCollection(key(userId, contactoId), mensajes);
  return mensajes[idx];
}

function addReaction(userId, contactoId, msgId, emoji) {
  const mensajes = getCollection(key(userId, contactoId));
  const idx = mensajes.findIndex(m => m.id === msgId);
  if (idx === -1) return null;
  if (!mensajes[idx].reactions) mensajes[idx].reactions = [];
  if (mensajes[idx].reactions.some(r => r.userId === userId)) return mensajes[idx];
  mensajes[idx].reactions.push({ emoji, userId });
  saveCollection(key(userId, contactoId), mensajes);
  return mensajes[idx];
}

function deleteMsg(userId, contactoId, msgId) {
  const mensajes = getCollection(key(userId, contactoId));
  const idx = mensajes.findIndex(m => m.id === msgId);
  if (idx === -1) return null;
  mensajes[idx].deleted = true;
  saveCollection(key(userId, contactoId), mensajes);
  return mensajes[idx];
}

function clearByContacto(userId, contactoId) {
  saveCollection(key(userId, contactoId), []);
}

module.exports = { getByContacto, add, updateStatus, addReaction, deleteMsg, clearByContacto };
