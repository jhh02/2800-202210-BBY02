"use strict";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user2Model')

const addAUser = asyncHandler(async (req, res) => {
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

    // Hash password
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
        res.redirect('http://localhost:8000/user/dashboard')
        // res.redirect('http://localhost:8000/user/login')
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


const editAUser = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        const { name, email, password, address, role, isAdmin } = req.body

        const editedUser = await user.findByIdAndUpdate(id, { name, email, password, address, role, isAdmin }, {
            new: true
        })
            .then(result => {
                res.send(result);
                // res.json({ redirect: '/user/dashboard' })
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => [

])

module.exports = {
    addAUser,
    editAUser
}