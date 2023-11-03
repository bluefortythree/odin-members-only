const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId: payload.userId, firstName: payload.firstName}
    next()
  } catch (error) {
    throw new Error('You are not authorized to access this page')
  }
}

module.exports = authMiddleware
