const { bold } = require('colors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


// creating a user schema
const adduserSchema = new mongoose.Schema(
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
            type: String,
            // ref: 'Role'
        },
        // createdAt: {
        //     type: Date,
        //     default: () => Date.now()
        // },
        // updatedAt: {
        //     type: Date,
        //     default: () => Date.now()
        // },
        isAdmin: {
            type: Boolean,
            default: () => false,
        },
    },
    { collection: 'BBY_36_users' },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User2', adduserSchema)