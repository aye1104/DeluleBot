const { getCollection, saveCollection } = require('../../config/db');

const DEFAULT = {
  descripcion: '',
  status:      'disponible',
  photo:       null,
};

const key = userId => `perfil_${userId}`;

function get(userId) {
  const data = getCollection(key(userId));
  if (!data || Array.isArray(data) || Object.keys(data).length === 0) return { ...DEFAULT };
  return data;
}

function save(userId, changes) {
  const current = get(userId);
  const updated = { ...current, ...changes };
  saveCollection(key(userId), updated);
  return updated;
}

module.exports = { get, save };
