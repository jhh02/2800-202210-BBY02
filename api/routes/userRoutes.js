const express = require('express')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { addUser, editUser, deleteUser } = require('../controllers/adminController')
const router = express.Router()
const fs = require('fs')
const { protect } = require('../middleware/authMiddleware')
const User = require('../models/userModel')



// show register page /user
router.get('/', (req, res) => {
    let doc = fs.readFileSync('./public/html/register.html', "utf8");
    res.send(doc)
})
// register user /user
router.post('/', registerUser)

// show login page /user/login
router.get('/login', (req, res) => {
    let doc = fs.readFileSync('./public/html/login.html', "utf8");
    res.send(doc)
})
// login user /user/login
router.post('/login', loginUser)

// show logout page  /user/logout
router.get('/logout', (req, res) => {
    let doc = fs.readFileSync('./public/html/logout.html', "utf8");
    res.send(doc)
})

// show my profile page /user/profile/objecid
router.get('/profile/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(result => {
            res.render('profile', { user: result })
        })
})

// direct to my profile page /user/profile/objectid
router.post('/profile/:id', (req, res) => {
    res.render('user-edit')
    try {
        const id = req.params.id
        console.log(id);
        // const user = await User.findById(id)
        // const { name, email, password, address, role, isAdmin } = req.body

        // const editedUser = await user.findByIdAndUpdate(id, { name, email, password, address, role, isAdmin }, {
        //     new: true
        // })
        //     .then(result => {
        //         res.send(result);
        //         // res.json({ redirect: '/user/dashboard' })
        //     })
    } catch (error) {
        res.status(400).send(error)
    }

})




// router.get('/getme', protect, getMe)

router.get('/dashboard', (req, res) => {
    User.find({}).exec(function (err, users) {
        if (err) throw err;
        // res.render('dashboard', { "users": users })
        res.sendFile(path.join(__dirname + '../../../views/dashboard.html'))
    })
})

router.get('/dashboard/adduser', (req, res) => {
    res.render('addUser')
})

router.post('/dashboard/adduser', addUser)

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

router.put('/dashboard/:id', editUser)

router.delete('/dashboard/:id', deleteUser)


router.get('/dashboard/adduser', (req, res) => {
    res.render('addUser')
})

router.post('/dashboard/adduser', addUser)

module.exports = router