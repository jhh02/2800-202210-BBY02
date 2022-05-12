
const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.ejs)?', (req, res) => {
    res.render('index')
})

module.exports = router