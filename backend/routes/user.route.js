const express = require('express')
const { loginUser, registerUser, getUserProfile } = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router