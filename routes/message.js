const express = require('express');
const router = express.Router();
const {createMessage, deleteMessage, viewMessage} = require('../controllers/messages')

router.post('/new', createMessage).get('/new', function (req, res) {
    res.render('messages')
})

router.post('/:id', deleteMessage).get('/:id', viewMessage)

module.exports = router