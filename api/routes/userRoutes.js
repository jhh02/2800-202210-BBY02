const express = require('express')
const { render } = require('express/lib/response')
const router = express.Router()
const {
} = require('../controllers/userController')

router.get('/profile', (req, res) => {
    res.render('profile')
})




module.exports = router