const Message = require('../models/Message')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

const createMessage = async (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId
    const user = await User.findOne({_id: userId})
    const message = await Message.create({...req.body, author: user._id})
    res.status(StatusCodes.ACCEPTED).json({message: 'Message created successfully.'})
    console.log(message)
}

const editMessage = async (req, res) => {
    console.log('edit')
}

const deleteMessage = async (req, res) => {
    console.log('delete')
}

const adminDeleteMessage = async (req, res) => {
    console.log('admin delete')
}

module.exports = {createMessage, editMessage, deleteMessage, adminDeleteMessage}
