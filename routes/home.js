const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({msg: 'it works'})
})

module.exports = router;
