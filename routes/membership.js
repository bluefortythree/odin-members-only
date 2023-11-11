const express = require('express');
const router = express.Router();
const {membership} = require('../controllers/authenticate')

router.post('/', membership).get('/', function(req, res) {
    res.render('membership')
  })

module.exports = router