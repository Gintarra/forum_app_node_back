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
    },
    commentsAmount: {
        type: Number,
        required: true,
        default: 0
    },
    lastCommentBy: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('topics', topicSchema)