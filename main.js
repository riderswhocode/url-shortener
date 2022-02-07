const express =  require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const User = require('./models/users.model')
const URL = require('./models/url.model')

const app = express()

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://rootxenon-url-shortener:fRGWEQmwEME7dFs6@url-shortener.6vteg.mongodb.net/url-shortener')

mongoose.connection.once('open', () => {
    console.log("Successfully connected to the Database");
})

const UserRoute = require('./routes/user.route')
const UrlRoute = require('./routes/url.route')
app.use('/user', UserRoute)
app.use('/url', UrlRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server successfully started.")
})