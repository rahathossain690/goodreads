const express = require('express')
const router = express.Router()

const errorHandler = require('../middleware/errorHandler.js')
const authRoutes = require('./authRoutes.js')
const bookRoutes = require('./bookRoutes.js')
const reviewRoutes = require('./reviewRoutes.js')
const commentRoutes = require('./commentRoutes.js')
const followRoutes = require('./followRoutes.js')

// frontend
const path = require('path');
router.use(express.static('public'));

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/index.html')));
router.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/login.html')))
router.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/register.html')))
router.get('/user', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/user.html')))
router.get('/add-review', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/addReview.html')))
router.get('/users', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/users.html')))
router.get('/review', (req, res) => res.sendFile(path.resolve(__dirname, '../public/pages/review.html')))

// api
router.use('/api/auth', authRoutes);
router.use('/api/book', bookRoutes)
router.use('/api/review', reviewRoutes)
router.use('/api/comment', commentRoutes)
router.use('/api/follow', followRoutes)

router.use(errorHandler);

module.exports = router