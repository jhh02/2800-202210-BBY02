"use strict";
const express = require('express')
const colors = require('colors')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const { errorHandler } = require('./doughme/api/middleware/errorMiddleware')
const connectDB = require('./doughme/api/config/db')
const port = process.env.PORT || 8000


async function toArray(iterator) {
    return new Promise((resolve, reject) => {
        iterator.toArray((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

//connect to mongodb
connectDB();

//initialize express
const app = express()
//register view engine
var corsOptions = {
    origin: "http://localhost:8000"
};
app.use(cors(corsOptions));
// app.set('views', path.join(__dirname, 'views'));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(morgan('tiny'))
//parsing the incoming data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//static files
app.use('/html', express.static('./public/html'))
app.use('/css', express.static('public/css'))
app.use('/fonts', express.static('public/fonts'))
app.use('/img', express.static('public/img'))
app.use('/js', express.static('public/js'))

//routes
const rootRoutes = require('./doughme/api/routes/root')
const apiRoutes = require('./api/routes/apiRoutes')
const userRoutes = require('./doughme/api/routes/userRoutes');
// const donationRoutes = require('./routes/donationRoutes')

app.use('/', rootRoutes)
app.use('/api', apiRoutes)
app.use('/user', userRoutes)
// app.use('/donation', donationRoutes)

//handles error
app.use(errorHandler)

//listen for requests
app.listen(port, () => console.log(`Server runnning on http://localhost:${port}`))