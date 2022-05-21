const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('^/$|/index(.ejs)?', (req, res) => {
    let doc = fs.readFileSync('./public/html/index.html', "utf8");
    res.send(doc)
})

module.exports = router