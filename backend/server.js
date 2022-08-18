const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 7400

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/cats', require('./routes/catRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.get('*', (req, res)=>{res.send('Cats!!!')})

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port: ${port}`))