"use strict";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const addUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body

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
        // password: hashedPassword,
        // address,
        // role,
        // isAdmin,
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


const editUser = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id

        // const { name, email, password, address, role, isAdmin } = req.body
        console.log(req.body.payload);

        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, {
            new: true
        })
            .then(result => {
                res.json(result)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/user/dashboard' })
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = {
    addUser,
    editUser,
    deleteUser
}