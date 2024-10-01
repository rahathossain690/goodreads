const express = require('express');
const followController = require('../controller/followController');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, followController.follow)
router.delete('/', authMiddleware, followController.unfollow)
router.get('/follower/:id', authMiddleware, followController.getFollowers)
router.get('/following/:id', authMiddleware, followController.getFollowing)

module.exports = router;
