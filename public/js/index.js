// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const session = require("express-session");
const app = express();
const fs = require("fs");
const {
    JSDOM
} = require('jsdom');


// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/fonts", express.static("./public/fonts"))

app.use(session({
    secret: "extra text that no one will guess",
    name: "wazaSessionID",
    resave: false,
    // create a unique identifier for that client
    saveUninitialized: true
}));


app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    // just send the text stream
    res.send(doc);
});

app.get("/admin", function (req, res) {
    let doc = fs.readFileSync("./app/html/admin.html", "utf8");

    // just send the text stream
    res.send(doc);
});

app.get("/bakery", function (req, res) {
    let doc = fs.readFileSync("./app/html/bakery.html", "utf8");

    // just send the text stream
    res.send(doc);
});

app.get("/driver", function (req, res) {
    let doc = fs.readFileSync("./app/html/driver.html", "utf8");

    // just send the text stream
    res.send(doc);
});

app.get("/profile", function (req, res) {
    let doc = fs.readFileSync("./app/html/profile.html", "utf8");

    // just send the text stream
    res.send(doc);
});


app.get("/organization", function (req, res) {
    let doc = fs.readFileSync("./app/html/organization.html", "utf8");

    // just send the text stream
    res.send(doc);
});

app.get("/sign_up", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/admin");
    } else {
        let doc = fs.readFileSync("./app/html/sign_up.html", "utf8");
        res.set("Server", "Wazubi Engine");
        res.set("X-Powered-By", "Wazubi");
        // just send the text stream
        res.send(doc);
    }


    // let doc = fs.readFileSync("./app/html/sign_up.html", "utf8");

    // // just send the text stream
    // res.send(doc);
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/login", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/admin");
    } else {
        let doc = fs.readFileSync("./app/html/login.html", "utf8");
        res.set("Server", "Wazubi Engine");
        res.set("X-Powered-By", "Wazubi");
        // just send the text stream
        res.send(doc);
    }
});

app.post("/loginInput", function (req, res) {
    res.setHeader("Content-Type", "application/json");

    console.log("What was sent", req.body.username, req.body.password);

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        port: 50,
        database: "foodonation"
    });

    connection.connect();
    //login---------------------------------------------------------- 
    var password = req.body.password;
    var username = req.body.username;
    if (password && username) {
        connection.query('SELECT * FROM BBY36_user WHERE password = ? AND username = ?', [password, username], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedIn = true;
                req.session.password = password;
                req.session.name = results[0].username;
                req.session.uid = results[0].UID;

                res.send({
                    status: "success",
                    msg: "Logged in."
                });
            } else {
                res.send({
                    status: "fail",
                    msg: "User account not found."
                });
            }
        });
    } else {
        res.send({
            status: "fail",
            msg: "User account not found."
        });
        //res.end();
    }
    connection.end();
    //-----------------------------------------------------------------

});


app.get("/logout", function (req, res) {

    if (req.session) {
        req.session.destroy(function (error) {
            if (error) {
                res.status(400).send("Unable to log out")
            } else {
                // session deleted, redirect to home
                res.redirect("/");
            }
        });
    }
});

app.post("/signup", function (req, res) {
    res.setHeader("Content-Type", "application/json");

    // in values
    let eml = req.body.email;
    let usr = req.body.username;
    let pwd = req.body.password;
    //let adr = req.body.address;
    //let rol = req.body.role;
    console.log(eml, usr, pwd);

    // db values
    let mailResults = null;
    let userResults = null;

    // connect to sql
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "foodonation"
    });

    // connect to database and get the data
    connection.connect();
    //signup --------------------------------------------------------------------
    // to check if email or name is taken
    connection.execute(
        "SELECT 1 FROM BBY36_user WHERE BBY36_user.email = ? OR BBY36_user.username = ?",
        [eml, usr],
        function (error, results, fields) {
            //console.log("results:", results);

            //console.log(results);
            //console.log(results.length);

            if (error) {
                console.log(error);
                console.log("did you misspell a table/field value?");
            }
            //console.log(mailResults, userResults, passResults);
            console.log(results[0])

            // check if user and email taken
            if (results.length > 0) {
                console.log("ID taken!")
                res.send({ status: "error", msg: "ID taken!" });

                // if user and email not taken then make new account
            } else {

                // insert new account
                connection.query('INSERT INTO BBY36_user (email, username, password) VALUES (?, ?, ?)',
                    [eml, usr, pwd],
                    function (error, results, fields) {
                        if (error) {
                            console.log("Uh oh");
                            console.log(error);
                        }
                        //console.log('Rows returned are: ', results);

                        //req.session.uid = results[0].UID;
                        res.send({ status: "success", msg: "Record added." });
                        //res.redirect("/");
                    });

            }
            connection.end();
        }
    )
});

// for page not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});



async function init() {

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        //port: 3305,
        port: 50,
        multipleStatements: true
    });
    const createDBAndTables = `CREATE DATABASE IF NOT EXISTS foodonation;
        use foodonation;
        CREATE TABLE IF NOT EXISTS BBY36_user (
        UID int NOT NULL AUTO_INCREMENT,
        username varchar(30),
        firstname varchar(15),
        lastname varchar(15),
        email varchar(30),
        password varchar(30),
        PRIMARY KEY (UID));`;
    await connection.query(createDBAndTables);


    const [rows, fields] = await connection.query("SELECT * FROM BBY36_user");
    // no records? Let's add a couple - for testing purposes
    if (rows.length == 0) {
        // no records, so let's add a couple
        let userRecords = "insert into BBY36_user (username, firstname, lastname, email, password) values ?";
        let recordValues = [
            ["admin", "Dongil", "Kwon", "dkwon5@bcit.ca", "admin"],

        ];
        await connection.query(userRecords, [recordValues]);
    }

    connection.end();
    console.log("index.js app listening on port " + port + "!");
}


// RUN SERVER
let port = 8000;
// RUN SERVER
app.listen(port, init);