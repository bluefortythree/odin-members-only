const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

const messagesMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const token = req.headers.cookie.split('token=')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const user = await User.findOne({_id: userId})
        const isMember = user.membership
        if(isMember) {
            next()
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({message: 'You do not have permission to view this page.'})
        }
    } catch {
      return res.sendStatus(403)
    }
  }

module.exports = messagesMiddleware
