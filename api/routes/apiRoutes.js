'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.get('/users', (req, res) => {
    User.find({}).exec(function (err, users) {
        if (err) throw err;
        res.json(users)
    })
})


router.post('/users', (req, res) => {
    console.log(req);
})


router.get('/users:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(result => {
            res.render('profile', { user: result })
        })
})

module.exports = router