const express = require('express');
const router = express.Router();
const controller = require('../controllers/book');

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.delete('/soft/:id', controller.softDelete);

module.exports = router;
