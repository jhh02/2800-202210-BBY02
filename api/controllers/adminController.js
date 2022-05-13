const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const AddUsers = require('../models/adduserModel')



const addAUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, role, isAdmin } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await AddUsers.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hast password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user 
    const user = await AddUsers.create({
        name,
        email,
        password: hashedPassword,
        address,
        role,
        isAdmin,
    })

    if (user) {
        await AddUsers.find({})
            .then((data) => {
                res.send(data)
            }).catch((error) => {
                res.status(500).send(error)
            })
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


const editUser = asyncHandler(async (req, res) => [

])

const deleteUser = asyncHandler(async (req, res) => [

])

module.exports = {
    addAUser
}