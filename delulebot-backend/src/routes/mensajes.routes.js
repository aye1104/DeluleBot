const express    = require('express');
const controller = require('../controllers/mensajes.controller');

const router = express.Router({ mergeParams: true });

router.get('/',                         controller.getAll);
router.post('/',                        controller.create);
router.patch('/:msgId/status',          controller.updateStatus);
router.patch('/:msgId/reaction',        controller.addReaction);
router.patch('/:msgId/delete',          controller.deleteMsg);
router.delete('/',                      controller.clearAll);

module.exports = router;
