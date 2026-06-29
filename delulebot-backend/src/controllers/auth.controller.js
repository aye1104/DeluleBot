const authService = require('../services/auth.service');

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'strict',
  secure:   process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
};

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });

  const result = authService.login(username, password);
  if (!result.ok) {
    if (result.reason === 'not_found')
      return res.status(404).json({ error: 'Ese usuario no existe.', code: 'USER_NOT_FOUND' });
    return res.status(401).json({ error: 'Contraseña incorrecta.', code: 'WRONG_PASSWORD' });
  }

  const { ok: _, token, ...user } = result;
  res.cookie('session_token', token, COOKIE_OPTS);
  res.json({ user });
}

function registro(req, res) {
  const { username, password, name } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });

  const trimmedUser = username.trim();
  if (trimmedUser.length < 3)
    return res.status(400).json({ error: 'El usuario debe tener al menos 3 caracteres.' });
  if (trimmedUser.length > 30)
    return res.status(400).json({ error: 'El usuario no puede superar 30 caracteres.' });
  if (!/^[a-zA-Z0-9_]+$/.test(trimmedUser))
    return res.status(400).json({ error: 'El usuario solo puede tener letras, números y guiones bajos.' });

  if (password.length < 4)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres.' });

  try {
    const result = authService.register(trimmedUser, password, name);
    const { token, ...user } = result;
    res.cookie('session_token', token, COOKIE_OPTS);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function logout(req, res) {
  res.clearCookie('session_token');
  res.json({ ok: true });
}

module.exports = { login, registro, logout };
