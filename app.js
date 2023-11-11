require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
// const flash = require('express-flash')
// const session = require('express-session')

const User = require('./models/User')

const notFoundMiddleware = require('./middleware/not-found')
const authMiddleware = require('./middleware/auth')
const messagesMiddleware = require('./middleware/messages')

const app = express();
app.set('view engine', 'pug')

const homeRouter = require('./routes/home')
const indexRouter = require('./routes/index')
const membershipRouter = require('./routes/membership')
const messageRouter = require('./routes/message')

app.use(express.json())
// app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/home', authMiddleware, messagesMiddleware, homeRouter)
app.use('/', indexRouter)
app.use('/membership', authMiddleware, membershipRouter)
app.use('/messages', messagesMiddleware, messageRouter)

app.use(notFoundMiddleware)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()

module.exports = app;
