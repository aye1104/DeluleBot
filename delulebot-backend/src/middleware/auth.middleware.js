const { findByToken } = require('../services/auth.service');

function requireAuth(req, res, next) {
  const token = req.cookies?.session_token;
  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Iniciá sesión.' });
  }
  const user = findByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Sesión inválida. Iniciá sesión nuevamente.' });
  }
  req.user = user;
  next();
}

module.exports = requireAuth;
