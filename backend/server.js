const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.port || 3000

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals', require('./routes/goalRoutes.js'))
app.use(errorHandler)


app.get('/', (req, res) => {

})


app.listen(port, () => console.log(`Server started on port ${port}`))