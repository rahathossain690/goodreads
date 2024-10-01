const express = require('express');
const bookController = require('../controller/bookController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, bookController.create)
router.get('/:id', authMiddleware, bookController.getById)
router.get('/', authMiddleware, bookController.getAll)

module.exports = router;
