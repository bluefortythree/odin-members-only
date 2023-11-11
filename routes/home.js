const express = require('express');
const router = express.Router();
const Message = require('../models/Message')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {createMessage, editMessage, deleteMessage, adminDeleteMessage} = require('../controllers/messages')

router.post('/', deleteMessage).get('/', async (req, res) => {
  const allMessages = await Message.find({})
  const cookie = req.headers.cookie
  const token = req.headers.cookie.split('token=')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const userId = decoded.userId
  const user = await User.findOne({_id: userId})
  const isMember = user.membership

  res.render('home', {cookie, allMessages, isMember})
})

module.exports = router;
