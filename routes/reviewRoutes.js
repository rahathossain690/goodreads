const express = require('express');
const reviewController = require('../controller/reviewController');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, reviewController.create)
router.get('/newsfeed', authMiddleware, reviewController.getNewsFeed)
router.get('/:id', authMiddleware, reviewController.getById)
router.get('/', authMiddleware, reviewController.getAll)

module.exports = router;
