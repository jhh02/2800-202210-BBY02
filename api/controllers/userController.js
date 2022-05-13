const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//post /users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, role, isAdmin } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hast password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        role,
        isAdmin,
    })

    if (user) {
        res.redirect('http://localhost:8000/user/login')
        // res.status(201).json({
        //     _id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     password: user.password,
        //     address: user.address,
        //     role: user.role,
        //     isAdmin: user.isAdmin,
        //     token: generateToken(user._id)
        // })
    } else {
        res.status(400)
        throw new Error('Invalid User')
    }
    res.json({ message: 'register User' })
})



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        // res.json({
        //     _id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     token: generateToken(user._id)
        // })
        // check for admin
        if (user.isAdmin) {
            // res.json({
            //     status: 'ok', message: 'Admin access authorized.', _id: user.id,
            //     name: user.name,
            //     email: user.email,
            //     isAdmin: user.isAdmin,
            //     token: generateToken(user._id)
            // })
            res.redirect('/user/dashboard')
        }
        // if (user.role === 'bakery') {

        // }
        // if (user.role === 'organization') {

        // }
        // if (user.role === 'driver') {

        // }
        if (user.role) {
            res.redirect('/user/profile')
        }

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({ message: 'login User' })
})

// private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})


const editUser = asyncHandler(async (req, res) => [

])




// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}