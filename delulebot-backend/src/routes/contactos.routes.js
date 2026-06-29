const express    = require('express');
const controller = require('../controllers/contactos.controller');

const router = express.Router();

router.get('/',                    controller.getAll);
router.get('/:characterId',        controller.getOne);

module.exports = router;
