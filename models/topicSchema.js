const mongoose = require('mongoose')

const Schema = mongoose.Schema

const topicSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdTimestamp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('topics', topicSchema)