const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.clearCookie('token').status(200).json({message: 'Logged out'})
})

module.exports = router;
