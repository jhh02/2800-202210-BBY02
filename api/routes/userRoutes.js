"use strict";
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { append } = require('express/lib/response')
const session = require("express-session");
const { JSDOM } = require('jsdom');

router.use(session(
    {
        secret: "secret",
        name: "sessionID",
        resave: false,
        saveUninitialized: true,
    })
);

const mysql = require("mysql2");
const connection = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "comp2800",
});

// show register page /user
router.get('/', (req, res) => {
    let doc = fs.readFileSync('./public/html/register.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

// register user /user
router.post('/register', (req, res) => {
    let usr = req.body.username;
    let eml = req.body.email;
    let pwd = req.body.password;
    let adr = req.body.address;
    connection.query(
        "SELECT * FROM BBY36_user WHERE username = ? OR email = ?", [usr, eml],
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log(results);
            if (results.length >= 1) {
                console.log("ID taken!")
                res.send({ status: "error", msg: "ID taken!" });
            } else {
                console.log("not taken")

                connection.query('INSERT INTO BBY36_user (email, username, password, address) VALUES (?, ?, ?, ?)',
                    [eml, usr, pwd, adr],
                    function (error, results, fields) {
                        if (error) {
                            console.log("Uh oh");
                            console.log(error);
                        }
                        //console.log('Rows returned are: ', results);
                        res.send({ status: "success", msg: "Record added." });
                    });

            }
        }
    )
})

// show login page /user/login
router.get('/login', (req, res) => {
    let doc = fs.readFileSync('./public/html/login.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})
// login user /user/login
router.post('/login', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let usr = req.body.username;
    let pwd = req.body.password;
    connection.query(
        "SELECT * FROM BBY36_user WHERE username = ? AND password = ?", [usr, pwd],
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            if (results.length >= 1) {
                // email and password found
                if (results[0].admin >= 1) {
                    req.session.loggedIn = true;
                    req.session.user_id = results[0].UID;
                    req.session.name = results[0].username;
                    req.session.admin = true;
                    //req.session.role = results[0].role
                    //req.session.pic = results[0].profilepic
                    console.log("success")
                    res.send({
                        status: "admin", msg: "Admin login", sessionID: req.session.user_id
                    })
                } else {
                    req.session.loggedIn = true;
                    req.session.user_id = results[0].UID;
                    req.session.name = results[0].username;
                    //req.session.role = results[0].role
                    //req.session.pic = results[0].profilepic
                    console.log("success")
                    res.send({
                        status: "success", msg: "Login", sessionID: req.session.user_id
                    })
                }
            } else {
                console.log("failure")
                res.send({
                    status: "failure", msg: "User not found!"
                })
            }
        }
    );
})

// show logout page  /user/logout
router.get('/logout', (req, res) => {
    let doc = fs.readFileSync('./public/html/logout.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.get('/profile', (req, res) => {
    const id = req.session.user_id;

    connection.query(
        "SELECT * FROM BBY36_user WHERE UID = ?", [id],
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            if (results.length >= 1) {

                let doc = fs.readFileSync('./public/html/profile.html', "utf8");
                res.set("Server", "Wazubi Engine");
                res.set("X-Powered-By", "Wazubi");

                let docDOM = new JSDOM(doc);
                docDOM.window.document.getElementsByClassName("username")[0].innerHTML
                    = results[0].username;
                docDOM.window.document.getElementsByClassName("email")[0].innerHTML
                    = results[0].email;
                docDOM.window.document.getElementsByClassName("address")[0].innerHTML
                    = results[0].address;
                res.send(docDOM.serialize());

                //res.send(doc)
            } else {
                console.log("cannot find user")
            }
        }
    )
})


// show my profile page /user/profile/objecid
router.get('/profile/:id', (req, res) => {
    const id = req.params.id

    connection.query(
        "SELECT * FROM BBY36_user WHERE UID = ?", [id],
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            if (results.length >= 1) {

                let doc = fs.readFileSync('./public/html/profile.html', "utf8");
                res.set("Server", "Wazubi Engine");
                res.set("X-Powered-By", "Wazubi");

                let docDOM = new JSDOM(doc);
                docDOM.window.document.getElementsByClassName("username")[0].innerHTML
                    = results[0].username;
                docDOM.window.document.getElementsByClassName("email")[0].innerHTML
                    = results[0].email;
                docDOM.window.document.getElementsByClassName("address")[0].innerHTML
                    = results[0].address;
                res.send(docDOM.serialize());

                //res.send(doc)
            } else {
                console.log("cannot find user")
            }
        }
    )
})

// direct to my profile page /user/profile/objectid
router.post('/profile/:id', (req, res) => {
    res.render('user-edit')
    try {
        const id = req.params.id

        res.set("Server", "Wazubi Engine");
        res.set("X-Powered-By", "Wazubi");
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/fix', (req, res) => {
    let doc = fs.readFileSync('./public/html/thanksreceiver.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})



// router.get('/getme', protect, getMe)

router.get('/dashboard', async (req, res) => {
    let doc = fs.readFileSync('./public/html/dashboard.html', "utf8")
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})
/*
router.post('/dashboard', async (req, res) => {
    // console.log(req.body);
    const { name, email, password, address, role, isAdmin } = req.body
    // console.log(name, email);

    // Create user 
    const newUser = await User.create({
        name: name,
        email: email,
        // password: hashedPassword, 
        // address,
        // role,
        // isAdmin,
    })
    // console.log(newUser.name, newUser.email);

    if (newUser) {
        res.json({
            status: 'success',
            name: name,
            email: email,
        })
        // let doc = fs.readFile('./public/html/dashboard.html', "utf8");
        // res.send(doc)

        // res.send('/user/dashboard')
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

})

router.get('/dashboard/:id', (req, res) => {
    const id = req.params.id
    console.log(req.params);
    User.findById(id)
        .then(result => {
            return result;
        })
        .then(data => {
            console.log(data);
            res.send(data)
        })

    // let doc = fs.readFileSync(`./public/html/dashboard/${id}`)

})

// router.get('/dashboard/:id', (req, res) => {
//     const id = req.params.id
//     User.findById(id)
//         .then(result => {
//             res.render('updateUser', { user: result })
//         })
// })

router.put('/dashboard/:id', editUser)

router.delete('/dashboard/:id', deleteUser)


router.get('/dashboard/adduser', (req, res) => {
    res.render('addUser')
})

router.post('/dashboard/adduser', addUser)
*/
module.exports = router