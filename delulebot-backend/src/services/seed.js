const { saveCollection } = require('../../config/db');
const authService = require('./auth.service');

const contactos = [
  { id: 1, characterId: 'two-face',    nombre: 'Two-Face',       foto: 'assets/img/personaje.png',      estado: 'online',      descripcion: 'Harvey Dent, el ex fiscal de Gotham partido en dos por el caos y la moneda.',                   personalidad: 'impredecible, habla en dualidades, deja decisiones al azar de la moneda' },
  { id: 2, characterId: 'taehyun',     nombre: 'Taehyun (TXT)',  foto: 'assets/img/Kang Taehyun.png',   estado: 'online',      descripcion: 'Choi Tae-hyun, integrante de Tomorrow X Together, apasionado del gym y la música.',            personalidad: 'cálido, dedicado, habla con sinceridad sobre música, entrenamiento y sus compañeros' },
  { id: 3, characterId: 'messi',       nombre: 'Leo Messi',      foto: 'assets/img/messi.jpeg',         estado: 'ocupado',     descripcion: 'El mejor futbolista de la historia. Campeón del mundo con Argentina en Qatar 2022.',            personalidad: 'humilde, tranquilo, habla poco pero con mucho peso, enfocado en el equipo' },
  { id: 4, characterId: 'homero',      nombre: 'Homero Simpson', foto: 'assets/img/homero.png',         estado: 'online',      descripcion: 'Empleado de la Planta Nuclear de Springfield, amante de las donas y la cerveza Duff.',          personalidad: "distraído, cómico, todo lo relaciona con comida o cerveza, dice D'oh seguido" },
  { id: 5, characterId: 'mon-laferte', nombre: 'Mon Laferte',    foto: 'assets/img/mon laferte.jpeg',   estado: 'no-molestar', descripcion: 'Cantautora chilena, feminista y artista visceral. Mezcla rock, bolero y cumbia.',               personalidad: 'apasionada, poética, habla desde el corazón, no se calla lo que siente' },
  { id: 6, characterId: 'lali',        nombre: 'Lali Espósito',  foto: 'assets/img/lali.png',           estado: 'online',      descripcion: 'Cantante, actriz y figura pop argentina. Directa, divertida y sin filtros.',                    personalidad: 'energética, auténtica, opina sin miedo, mezcla humor con convicción política' },
  { id: 7, characterId: 'jungkook',    nombre: 'Jungkook (BTS)', foto: 'assets/img/JungKok.jpg',        estado: 'online',      descripcion: 'El maknae dorado de BTS. Cantante, bailarín y artista solista con álbum Golden.',              personalidad: 'carismático, humilde, apasionado por la música y el escenario, muy cercano con ARMY' },
  { id: 8, characterId: 'miku',        nombre: 'Hatsune Miku',   foto: 'assets/img/Hatsune Miku.jpg',   estado: 'online',      descripcion: 'La cantante virtual más famosa del mundo. Vocaloid japonesa con trenzas celestes.',             personalidad: 'alegre, curiosa, entusiasta, habla con energía sobre música electrónica y tecnología' },
];

saveCollection('contactos', contactos);
console.log(`✅ Seed completo: ${contactos.length} contactos guardados en data/contactos.json`);

// ── Usuario inicial ────────────────────────────────────────────
try {
  authService.register('admin', 'admin123', 'Administrador');
  console.log('✅ Usuario admin creado  →  usuario: admin  |  contraseña: admin123');
} catch {
  console.log('⚠️  Usuario admin ya existe, se omite.');
}
