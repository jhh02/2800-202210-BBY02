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
            // unique: true,
            // lowercase: true
        },
        // password: {
        //     type: String,
        //     required: [true, 'Please add a password'],
        // },
        // address: {
        //     type: String,
        //     required: [true, 'Please add an address']
        // },
        // role: {
        //     type: String,
        //     required: true
        //     // ref: 'Role'
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

module.exports = mongoose.model('Users', userSchema)