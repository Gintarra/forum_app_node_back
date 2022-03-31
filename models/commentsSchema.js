const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    topicID: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdTimestamp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('comments', commentSchema)