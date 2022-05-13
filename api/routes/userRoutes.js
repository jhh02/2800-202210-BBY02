const express = require('express')
const { render } = require('express/lib/response')
const { registerUser, loginUser, getMe, editUser } = require('../controllers/userController')
const { addAUser } = require('../controllers/adminController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const User = require('../models/userModel')

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

router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/edit', (req, res) => {
    res.render('edit')
})
// router.post('/edit', editUser)




router.get('/getme', protect, getMe)

router.get('/dashboard', (req, res) => {
    // res.render('dashboard')
    User.find({}).exec(function (err, users) {
        if (err) throw err;
        res.render('dashboard', { "users": users })
    })
})


router.get('/dashboard/:id', (req, res) => {
    const id = req.params.id
    User.findById(id).exec(function (err, users) {
        if (err) throw err;
        res.render('user-details', { "user": users })
    })

})



router.get('/dashboard/adduser', (req, res) => {
    res.render('addUser')
})

router.post('/dashboard/adduser', addAUser)

module.exports = router