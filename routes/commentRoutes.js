const express = require('express');
const commentController = require('../controller/commentController');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, commentController.create)
router.get('/', authMiddleware, commentController.getAll)

module.exports = router;
