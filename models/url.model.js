const mongoose = require('mongoose')
const shortId = require('shortid')
const Schema = mongoose.Schema

const URLSchema = new Schema({
    fullUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, default: shortId.generate },
    clicks: { type: Number, default: 0},
    user_id: { type: Object }
})

module.exports = mongoose.model("URL", URLSchema)