const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authenticate')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'testing'})
});

router.post('/register', register).get('/register', function(req, res, next) {
  res.render('register')
});

router.post('/login', login).get('/login', function(req, res,next) {
  res.render('login')
})


module.exports = router;
