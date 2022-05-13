const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const { handleLogin } = require('../controllers/authController')

router.get('/', (req, res) => {
    res.render('login')
})
router.post('/', handleLogin)

router.post('/change-password', (req, res) => {
    const { token } = req.body
    const user = jwt.verify(token, process.env.JWT_SECRET)

    console.log(user);
    res.json({ status: "ok " })

})



module.exports = router