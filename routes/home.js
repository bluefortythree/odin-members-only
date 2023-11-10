const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const cookie = req.headers.cookie
  res.render('home', {cookie})
})

module.exports = router;
