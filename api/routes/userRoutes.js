const express = require('express')
const { render } = require('express/lib/response')
const router = express.Router()
const {
    getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// router.get('/', (req, res) => {
//     // res.render('register')
// })

// router.post('/register', registerUser, (req, res) => {
//     res.render()
// })
// router.get('/register', (req, res) => {
//     res.render('register')
// })


// router.get('/login', (req, res) => {
//     res.render('login')
// })

// router.post('/login', loginUser)



module.exports = router