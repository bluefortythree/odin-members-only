const express = require('express')
const router = express.Router()

const register = require('../controllers/authenticate')

router.post('/', register)

module.exports = router