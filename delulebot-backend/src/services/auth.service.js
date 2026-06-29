const crypto = require('crypto');
const { getCollection, saveCollection } = require('../../config/db');
const KEY = 'usuarios';

function _hash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
}

function _generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function _all() {
  const data = getCollection(KEY);
  return Array.isArray(data) ? data : [];
}

function findByUsername(username) {
  return _all().find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

function findByToken(token) {
  if (!token) return null;
  const user = _all().find(u => u.token === token);
  if (!user) return null;
  const { salt: _s, passwordHash: _h, token: _t, ...safe } = user;
  return safe;
}

function register(username, password, name) {
  if (findByUsername(username)) throw new Error('El nombre de usuario ya está en uso.');
  const salt  = crypto.randomBytes(16).toString('hex');
  const token = _generateToken();
  const newUser = {
    id:           `user_${Date.now()}`,
    username:     username.trim(),
    name:         (name || username).trim(),
    status:       'disponible',
    photo:        null,
    salt,
    passwordHash: _hash(password, salt),
    token,
    createdAt:    new Date().toISOString(),
  };
  const users = _all();
  users.push(newUser);
  saveCollection(KEY, users);
  const { salt: _s, passwordHash: _h, ...rest } = newUser;
  return rest;
}

function login(username, password) {
  const users = _all();
  const idx   = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
  if (idx === -1) return { ok: false, reason: 'not_found' };
  if (_hash(password, users[idx].salt) !== users[idx].passwordHash) return { ok: false, reason: 'wrong_password' };

  users[idx].token = _generateToken();
  saveCollection(KEY, users);

  const { salt: _s, passwordHash: _h, ...rest } = users[idx];
  return { ok: true, ...rest };
}

module.exports = { register, login, findByToken };
