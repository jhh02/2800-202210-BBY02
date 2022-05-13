const express = require('express')
const { render } = require('express/lib/response')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const router = express.Router()
const {
} = require('../controllers/userController')

router.get('/', (req, res) => {
    res.render('register')
})
router.post('/', registerUser)
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', loginUser)
router.post('/getme', getMe)



module.exports = router