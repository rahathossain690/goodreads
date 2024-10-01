const express = require('express');
const authController = require('../controller/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile)
router.get('/user', authController.getUserById)
router.get('/all', authMiddleware, authController.getAll)

module.exports = router;
