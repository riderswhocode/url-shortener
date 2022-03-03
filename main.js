const express =  require('express')
const { static } = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const User = require('./models/users.model')
const URL = require('./models/url.model')

const app = express()


app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

const localCon = 'mongodb://localhost/url-shortener'

mongoose.connect(localCon)


mongoose.connection.once('open', () => {
    console.log("Successfully connected to the Database");
})

const UserRoute = require('./routes/user.route')
const UrlRoute = require('./routes/url.route')

app.use('/', UrlRoute)
app.use('/user', UserRoute)
app.use('/url', UrlRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server successfully started.")
})
