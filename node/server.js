require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to db'))


app.use(express.static(path.resolve('../assets')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () =>   
    console.log('server starting ....')
 )