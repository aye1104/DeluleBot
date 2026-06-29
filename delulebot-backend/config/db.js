const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

function getCollection(name) {
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function saveCollection(name, data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

function connectDB() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`✅ Base de datos JSON lista en: ${DATA_DIR}`);
}

module.exports = { connectDB, getCollection, saveCollection };
