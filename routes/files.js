const express = require('express');
const router = express.Router();
const controller = require('../controllers/file');

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/upload', controller.upload.single('file'), controller.post);
router.delete('/:id', controller.delete);

module.exports = router;