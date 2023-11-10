const express = require('express');
const router = express.Router();
const {register, login, logout} = require('../controllers/authenticate')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'testing'})
});

router.post('/register', register).get('/register', function(req, res) {
  res.render('register')
});

router.post('/login', login).get('/login', function(req, res) {
  res.render('login')
})


router.post('/logout', logout).get('/logout', function(req, res) {
  res.render('logout')
})

// router.post('/membership', membership).get('/membership', function(req, res) {
//   res.render('membership')
// })

module.exports = router;
