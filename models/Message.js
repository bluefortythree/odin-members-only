const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title is required'],
        minlength: 1,
        maxlength: 100,
    },
    text: {
        type: String,
        required: [true, 'Please enter a message'],
        minlength: 1,
        maxlength: 500,
    },
    author: {
        type: String,
        required: [true, 'Please provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema)