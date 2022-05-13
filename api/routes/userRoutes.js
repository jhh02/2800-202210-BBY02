const express = require('express')
const objectId = require('mongodb').ObjectId
const { render } = require('express/lib/response')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { addAUser, editAUser } = require('../controllers/adminController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const User = require('../models/userModel')
const { db } = require('../models/userModel')

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

router.get('/profile/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(result => {
            res.render('profile', { user: result })
        })
})

router.post('/profile/:id', (req, res) => {
    res.render('user-edit')
})


// router.get('/getme', protect, getMe)

router.get('/dashboard', (req, res) => {
    User.find({}).exec(function (err, users) {
        if (err) throw err;
        res.render('dashboard', { "users": users })
    })
})

router.get('/dashboard/adduser', (req, res) => {
    res.render('addUser')
})

router.post('/dashboard/adduser', addAUser)

router.get('/dashboard/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(result => {
            res.render('user-details', { user: result })
        })
})

// router.get('/dashboard/:id', (req, res) => {
//     const id = req.params.id
//     User.findById(id)
//         .then(result => {
//             res.render('updateUser', { user: result })
//         })
// })

router.patch('/dashboard/:id', editAUser)

router.delete('/dashboard/:id', async (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/user/dashboard' })
        })
        .catch(err => {
            console.log(err);
        })
})


router.get('/dashboard/adduser', (req, res) => {
    res.render('addUser')
})

router.post('/dashboard/adduser', addAUser)

module.exports = router