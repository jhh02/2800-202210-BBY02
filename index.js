"use strict";
const express = require('express')
const session = require("express-session");
const bcrypt = require('bcryptjs')
const fs = require("fs");
const { JSDOM } = require('jsdom');


/*remove:
colors
bodyparser
cookieparser
cors
morgan
dotenv
jwt
asyncHandler

middleware

keep: bcrypt
modify: mongoose to mysql2

add:
sessions
JSDOM
multer
*/


//initialize express
const app = express()

// for posting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use('/html', express.static('./public/html'))
app.use('/css', express.static('public/css'))
app.use('/fonts', express.static('public/fonts'))
app.use('/img', express.static('public/img'))
app.use('/js', express.static('public/js'))

//routes
const rootRoutes = require('./api/routes/root');
//const apiRoutes = require('./api/routes/apiRoutes');
const userRoutes = require('./api/routes/userRoutes');
const donationRoutes = require('./api/routes/donationRoutes');


var sessionMiddleware = (session(
    {
      secret: "secret",
      name: "sessionID",
      resave: false,
      saveUninitialized: true,
    })
);

app.use(sessionMiddleware);
/*
app.use(function (req, res, next) {
  req.session.user_id;
  req.session.loggedIn = true;
  next();
});
*/
app.use('/', sessionMiddleware, rootRoutes)
//app.use('/api', apiRoutes)
app.use('/user', sessionMiddleware, userRoutes)
app.use('/donation',  sessionMiddleware, donationRoutes)

//handles error

//listen for requests
const port = process.env.PORT || 8000
app.listen(port)
console.log(`Server runnning on http://localhost:${port}`)