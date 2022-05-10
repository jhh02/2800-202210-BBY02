const express = require('express')
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController')

// Registering a user
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

// Login

// Get user information


module.exports = router 