"use strict";
const express = require('express')
const colors = require('colors')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

//connect to mongodb
connectDB()
//initialize express
const app = express()
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(morgan('tiny'))
//parsing the incoming data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//static files
app.use('/html', express.static('public/html'))
app.use('/css', express.static('public/css'))
app.use('/fonts', express.static('public/fonts'))
app.use('/img', express.static('public/img'))
app.use('/js', express.static('public/js'))
//serving public files
app.use(cookieParser())

//routes
const userRoutes = require('./routes/userRoutes')
const rootRoutes = require('./routes/root')
// const donationRoutes = require('./routes/donationRoutes')

app.use('/', rootRoutes)
app.use('/user', userRoutes)
// app.use('/donation', donationRoutes)

//handles error
app.use(errorHandler)

//listen for requests
app.listen(port, () => console.log(`Server runnning on http://localhost:${port}`))