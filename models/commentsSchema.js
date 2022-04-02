const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    topicID: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    imageUser: {
        type: String,
        required: true
    },
    registeredUserTimestamp: {
        type: Number,
        required: true
    },
    createdTimestamp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('comments', commentSchema)