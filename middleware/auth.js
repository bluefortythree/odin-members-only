const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = data.id
    req.firstName = data.firstName
    return next()
  } catch {
    return res.sendStatus(403)
  }
}

module.exports = authMiddleware
