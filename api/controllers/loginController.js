
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST api/users/register
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, role, isAdmin } = req.body
    if (!name || !email || !password) {
        res.status(400).json({ 'message': 'Please add all fields' })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        return res.status(409) // conflict

    }

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //store the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role,
            isAdmin,
        })

        if (newUser) {
            res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                address: newUser.address,
                role: newUser.role,
                isAdmin: newUser.isAdmin,
            })
            await newUser.save()


        }
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
})

module.exports = { loginUser }