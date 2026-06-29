const { getCollection, saveCollection } = require('../../config/db');

const COLLECTION = 'contactos';

function getAll() {
  return getCollection(COLLECTION);
}

function getById(characterId) {
  return getCollection(COLLECTION).find(c => c.characterId === characterId) || null;
}

module.exports = { getAll, getById };
