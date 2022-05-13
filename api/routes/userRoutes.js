const express = require('express')
const { render } = require('express/lib/response')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.get('/', (req, res) => {
    res.render('register')
})
router.post('/', registerUser)

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', loginUser)

router.get('/logout', (req, res) => {
    res.render('login')
})


router.get('/getme', protect, getMe)

router.get('/dashboard', protect, (req, res) => {
    res.render('dashboard')
})

module.exports = router