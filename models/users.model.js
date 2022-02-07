const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model("Users", UserSchema)