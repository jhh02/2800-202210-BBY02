const express = require('express')
const { render } = require('express/lib/response')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', (req, res) => {
    res.render('register')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', registerUser)

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', loginUser)


// router.post('/', registerUser)
// router.post('/', registerUser)
// router.post('/login', loginUser)

module.exports = router