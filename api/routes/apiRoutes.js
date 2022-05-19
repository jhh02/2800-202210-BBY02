'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.get('/users', (req, res) => {
    User.find({}, function (err, users) {
        if (err) {
            res.send('Error')
            next()
        }
        res.json(users)
    })
})


module.exports = router