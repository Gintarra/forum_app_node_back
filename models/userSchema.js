const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    registerTimestamp: {
        type: Number,
        required: true
    },
    commentsAmount: {
        type: Number,
        required: true
    },
    notification: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('users', userSchema)