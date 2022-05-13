
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST api/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, role, isAdmin } = req.body

    if (!name || !email || !password) {
        return res.json({ status: 'error', error: "Invalid" })
    }

    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(409) // conflict
    }

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log(hashedPassword);
        //store the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role,
            isAdmin,
        })

        console.log(newUser);
        if (newUser) {
            // res.status(201).json({
            //     _id: newUser.id,
            //     name: newUser.name,
            //     email: newUser.email,
            //     password: newUser.password,
            //     address: newUser.address,
            //     role: newUser.role,
            //     isAdmin: newUser.isAdmin,
            // }).render("/login")
            await newUser.save()
            res.redirect("http://localhost:8000/login")
        }
    } catch (err) {
        if (err.code === 11000) { return res.json({ status: 'error', error: 'Username already in use' }) }
        console.log(error);
        throw error
    }
})

module.exports = { registerUser }