const mongoose = require('mongoose')
const {DateTime} = require('luxon')

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
    }, 
    authorName: {
        type: String,
        required: [true, 'Please provide author']
    },
    createdAt: {
        type: Date,
        default: DateTime.now().setZone('system')
    }
})

module.exports = mongoose.model('Message', MessageSchema)