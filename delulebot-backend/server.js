require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const path         = require('path');
const { connectDB } = require('./config/db');
const requireAuth  = require('./src/middleware/auth.middleware');

const app  = express();
const PORT = process.env.PORT || 3000;

connectDB();

// ── Middlewares ────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// ── Frontend estático (build de React) ────────────────────────
app.use(express.static(path.join(__dirname, '../DeluleBot-build')));

// ── Health check (público) ─────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DeluleBot API funcionando' });
});

// ── Auth (público — sin token requerido) ───────────────────────
app.use('/api/auth', require('./src/routes/auth.routes'));

// ── Rutas protegidas (requieren cookie session_token) ─────────
app.use('/api/contactos',                      requireAuth, require('./src/routes/contactos.routes'));
app.use('/api/contactos/:contactoId/mensajes', requireAuth, require('./src/routes/mensajes.routes'));
app.use('/api/perfil',                         requireAuth, require('./src/routes/perfil.routes'));

// ── Fallback: sirve index.html para rutas desconocidas ─────────
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../DeluleBot-build', 'index.html'));
});

// ── Manejador global de errores ────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ── Arrancar ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
