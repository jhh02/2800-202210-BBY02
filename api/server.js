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


connectDB()


const app = express()
//register view engine
app.set('view engine', 'ejs')
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// app.set('views', path.join(__dirname, 'views'));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(morgan('tiny'))
//parsing the incoming data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//static files
app.use('/css', express.static('public/css'))
app.use('/fonts', express.static('public/fonts'))
app.use('/img', express.static('public/img'))
app.use('/js', express.static('public/js'))

//routes
const userRoutes = require('./routes/userRoutes')
// const donationRoutes = require('./routes/donationRoutes')

//serving public files
app.use(cookieParser())


app.use('/', require('./routes/root'))
app.use('/user', userRoutes)
// app.use('/donation', donationRoutes)


// app.post('/users', async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         // console.log(salt);
//         // console.log(hashedPassword);

//         const user = { name: req.body.name, password: hashedPassword }
//         users.push(user)
//         res.status(201).send(user)
//     } catch (error) {
//         res.status(500).send()
//     }

//     // hash('password') // encrypt pw
//     // hash(salt + 'password') //dddd
//     // hash(salt2 + 'password')
// })

// app.post('/users/login', async (req, res) => {
//     // copy 
//     const user = users.find(user => user.name = req.body.name)
//     // no user
//     if (!user) {
//         return res.status(400).send('Cannot find user')
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             res.send('Success')
//         } else {
//             res.send('Not Allowed')
//         }
//     } catch {
//         res.status(500).send()
//     }
// })

// app.get('/posts', (req, res) => {
//     res.json(posts)
// })


// app.get('/', (req, res) => {
//     res.render('index')
// })

// app.get('/register', (req, res) => {
//     res.render('register')
// })

// app.post('/register', async (req, res) => {
//     // res.send(req.body);
//     try {
//         const hashedPassword = bcrypt.hash(req.body.password, 10)

//         res.redirect('/login')
//     } catch (error) {
//         res.redirect('/register')
//     }
//     console.log(users);
// })

// app.get('/login', (req, res) => {
//     //authenticate user
//     res.render('login')
// })






//handles error
app.use(errorHandler)

//listen for requests
app.listen(port, () => console.log(`Server runnning on http://localhost:${port}`))