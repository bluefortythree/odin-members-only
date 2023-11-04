require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')


const notFoundMiddleware = require('./middleware/not-found')
const authMiddleware = require('./middleware/auth')

const app = express();
app.set('view engine', 'pug')

const indexRouter = require('./routes/index')
// const authenticateRouter = require('./routes/authenticate')
const homeRouter = require('./routes/home')
const logoutRouter = require('./routes/logout')

app.use(express.json())
// app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', indexRouter);
// app.use('/', authenticateRouter)
app.use('/home', authMiddleware, homeRouter)
app.use('/logout', authMiddleware, logoutRouter)

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
