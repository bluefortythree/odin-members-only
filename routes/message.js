const express = require('express');
const router = express.Router();
const {createMessage, editMessage, deleteMessage, adminDeleteMessage} = require('../controllers/messages')

router.post('/new', createMessage).get('/new', function (req, res) {
    res.render('messages')
})
module.exports = router