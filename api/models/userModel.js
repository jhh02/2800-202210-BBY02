const { bold } = require('colors')
const mongoose = require('mongoose')

// creating a user schema
const userSchema = new mongoose.Schema(
    // fields
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        role: {
            type: String
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date,
            default: () => Date.now()
        },
        isAdmin: {
            type: Boolean,
            default: () => false,
        },
    },
)

module.exports = mongoose.model('User', userSchema)