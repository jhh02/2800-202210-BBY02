
const express = require('express')
const colors = require('colors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()
//register view engine
app.set('view engine', 'ejs')
//parsing the incoming data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//routes
const userRoutes = require('../api/routes/userRoutes')

//serving public files
app.use(express.static(__dirname))
app.use(cookieParser())
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.render('index')
})

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