"use strict";
const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    let doc = fs.readFileSync('./public/html/index.html', "utf8");
    console.log('index sent');
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc);
})

module.exports = router