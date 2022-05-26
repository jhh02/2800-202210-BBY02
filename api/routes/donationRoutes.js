"use strict";
const express = require('express')
const router = express.Router()
const fs = require('fs')
//const User = require('../models/userModel')
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
    connectionLimit : 100,
    host     : "localhost",
    user     : "root",
    password : "",
    database : "comp2800",
});



router.get('/', (req, res) => {
    let doc = fs.readFileSync('./public/html/role.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.get('/donationform', (req, res) => {
    let doc = fs.readFileSync('./public/html/donationform.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.post('/donationform', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let tle = req.body.title;
    let des = req.body.description;
    let loc = req.body.location;
    let dat = req.body.date;
    let did = req.session.user_id;
    console.log(did + " " + tle + " " + des + " " + loc + " " + dat);
    
    connection.query('INSERT INTO BBY36_donations (bakery_ID, title, description, location, donated_date) VALUES (?, ?, ?, ?, ?)',
                    [did, tle, des, loc, dat],
                    function (error, results, fields) {
                        if (error) {
                            console.log("Uh oh");
                            console.log(error);
                        } else {
                            res.send({ status: "success", msg: "Record added."});
                        }
                        
                    }
                );


})

router.get('/thanksdonor', (req, res) => {
    let doc = fs.readFileSync('./public/html/thanksdonor.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.get('/availabledonations', (req, res) => {
    let doc = fs.readFileSync('./public/html/availabledonations.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    const lid = req.session.user_id;
    //console.log(id);
    connection.query(
        "SELECT * FROM BBY36_donations WHERE status = 0",
        function(error, results, fields) {
          if (error) {
            throw error;
          }
          if (results.length >= 1) {
              let docDOM = new JSDOM(doc);
              let str = "<!---->";
              for (let i = 0; i < results.length; i++){
                  if (results[i].bakery_ID !== lid) {
                    str += "<div class='card'" + "id='"+ results[i].donation_ID +"'>";

                    str += "<a href='donationdescription/" + results[i].donation_ID + "'>";
                    str += "<div class='image'>";
                    str += "<img src='/img/croissant.jpg' alt='Responsive image' class='img-fluid'>";
                    str += "</div>";

                    str += "<div class='content'>";

                    str += "<div class='main'>"
                    str += "Title: " + results[i].title +"<br>";
                    str += "Description: " + results[i].description + "<br>";
                    str += "Location: " + results[i].location + "<br>";
                    str += "Status: Available";
                    str += "</div>";

                    str += "<div class='below'>";
                    str += "Last updated: " + results[i].donated_date
                    str += "</div>";

                    str += "</div>";

                    str += "</div>";
                    str += "</a>";

                    str += "</div>";
                  }
              }
              docDOM.window.document.getElementsByClassName("container")[0].innerHTML = str;
              res.send(docDOM.serialize());
           //res.send(doc);
          } else {
            console.log("cannot find donations");
            res.send(doc);
          }
        }
    )
})




router.post('/donationdescription', (req, res) => {
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.get('/donationdescription/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        "SELECT * FROM BBY36_donations WHERE donation_ID = ?", [id],
        function(error, results, fields) {
          if (error) {
            throw error;
          }
          if (results.length >= 1) {
              if (results[0].status == 0) {
                let doc = fs.readFileSync('./public/html/donationdescription.html', "utf8");
                res.set("Server", "Wazubi Engine");
                res.set("X-Powered-By", "Wazubi");
                let docDOM = new JSDOM(doc);
                docDOM.window.document.getElementById("name").innerHTML = results[0].title;
                docDOM.window.document.getElementById("location").innerHTML = results[0].location;
                docDOM.window.document.getElementById("date").innerHTML = results[0].donated_date;
                docDOM.window.document.getElementById("status").innerHTML = "Available";
                docDOM.window.document.getElementById("description").innerHTML = results[0].description;
                docDOM.window.document.getElementById("groupbutton").innerHTML = `<button type='button' onclick='location.href="/donation/addedtocart"'>Add to Cart</button>`;
                res.send(docDOM.serialize());
              } else {
                let doc = fs.readFileSync('./public/html/donationdescription.html', "utf8");
                res.set("Server", "Wazubi Engine");
                res.set("X-Powered-By", "Wazubi");
                let docDOM = new JSDOM(doc);
                docDOM.window.document.getElementById("name").innerHTML = results[0].title;
                docDOM.window.document.getElementById("location").innerHTML = results[0].location;
                docDOM.window.document.getElementById("date").innerHTML = results[0].delivered_date;
                docDOM.window.document.getElementById("status").innerHTML = "Complete";
                docDOM.window.document.getElementById("description").innerHTML = results[0].description;
                docDOM.window.document.getElementById("groupbutton").innerHTML = `<div class="qty">Sold</div>`;
                res.send(docDOM.serialize());
              }
            
          } else {
            let doc = fs.readFileSync('./public/html/donationdescription.html', "utf8");
            res.set("Server", "Wazubi Engine");
            res.set("X-Powered-By", "Wazubi");
            res.send(doc);
          }
        }
    )
    
})

router.post('/donationdescription/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        "SELECT * FROM BBY36_donations WHERE donation_ID = ?", [id],
        function(error, results, fields) {
          if (error) {
            throw error;
          }
        }
    )
})

router.get('/addedtocart', (req, res) => {
    let doc = fs.readFileSync('./public/html/addedtocart.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.get('/cart', (req, res) => {
    let doc = fs.readFileSync('./public/html/cart.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})

router.get('/thanksreceiver', (req, res) => {
    let doc = fs.readFileSync('./public/html/thanksreceiver.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    res.send(doc)
})


router.get('/history', (req, res) => {
    let doc = fs.readFileSync('./public/html/history.html', "utf8");
    res.set("Server", "Wazubi Engine");
    res.set("X-Powered-By", "Wazubi");
    const id = req.session.user_id;
    connection.query(
        "SELECT * FROM BBY36_donations WHERE bakery_id = ?", [id],
        function(error, results, fields) {
          if (error) {
            throw error;
          }
          if (results.length >= 1) {
              let docDOM = new JSDOM(doc);
              let str = "<!---->";
              for (let i = 0; i < results.length; i++){
                  if (results[i].status == 0) {
                    str += "<div class='card'" + "id='" +  results[i].donation_ID + "'>";

                    str += "<div class='image'>"
                    str += "<img src='/img/strawberry_muffins.jpg' alt='Responsive image' class='img-fluid'>";
                    str += "</div>";

                    str += "<div class='content'>";

                    str += "<div class='main'>"
                    str += "Title: " + results[i].title +"<br>";
                    str += "Description: " + results[i].description + "<br>";
                    str += "Location: " + results[i].location + "<br>";
                    str += "Status: Available"
                    str += "</div>";

                    str += "<div class='below'>";
                    str += "Last updated: " + results[i].donated_date
                    str += "</div>";

                    str += "</div>";

                    str += "<div class='deleteButton'>"
                    str += "<button class='delete'>Delete</button>"
                    str += "</div>";

                    str += "</div>"

                    str += "</div>";
                  } else {
                    str += "<div class='card'>";

                    str += "<div class='image'>"
                    str += "<img src='/img/strawberry_muffins.jpg' alt='Responsive image' class='img-fluid'>";
                    str += "</div>";

                    str += "<div class='content'>";

                    str += "<div class='main'>"
                    str += "Title: " + results[i].title +"<br>";
                    str += "Description: " + results[i].description + "<br>";
                    str += "Location: " + results[i].location + "<br>";
                    str += "Status: Complete"
                    str += "</div>";

                    str += "<div class='below'>";
                    str += "Last updated: " + results[i].delivered_date
                    str += "</div>";

                    str += "</div>";

                    str += "<div class='delete'>"
                    str += "Buyer ID: " + results[i].organization_ID;
                    str += "</div>";

                    str += "</div>"

                    str += "</div>";
                  }
              }
              docDOM.window.document.getElementsByClassName("container")[0].innerHTML = str;
              res.send(docDOM.serialize());
           //res.send(doc);
          } else {
            console.log("cannot find donations");
            res.send(doc);
          }
        }
    )
})

router.post('/deleteHistory', (req, res) => {
    const donationID = req.body.donationID;
    connection.query("DELETE FROM bby36_donations WHERE donation_ID = ?", [donationID], function(err, data, fields) {
      if (err) throw err;
      res.setHeader("Content-Type", "application/json");
      res.send({ status: "success" });
    });
})


module.exports = router
