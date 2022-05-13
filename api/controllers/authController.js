
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

// @desc    authenticate the user
// @route   POST api/login
// @access  Public
const handleLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ 'message': 'Please add all fields' })
    }




    const foundUser = await User.findOne({ email }).lean()

    if (!foundUser) {
        return res.json({ status: 'error', error: "Invalid username/password" })
    }

    if (bcrypt.compare(password, foundUser.password)) {
        const token = jwt.sign({
            id: foundUser._id,
            name: foundUser.name
        },
            process.env.JWT_SECRET
        )

        // email , password combination is successful
        return res.json({ status: 'ok', data: token })

    }

    // res.redirect('http://localhost:8000/user/profile')
    // if (!foundUser) return res.sendStatus(401) //unauthorized

    // //evaluate password
    // const match = await bcrypt.compare(password, foundUser.password)
    // // create JWTs 
    // if (true) {
    //     // res.json({ 'success': `User ${foundUser.name} is logged in!` })
    //     res.redirect('http://localhost:8000/profile')
    //     // admin?
    //     // if (foundUser.isAdmin) {
    //     //     res.redirect('http://localhost:8000')
    //     // }
    // } else {
    //     res.sendStatus(401)
    // }
})



module.exports = { handleLogin }