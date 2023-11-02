require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')

const notFoundMiddleware = require('./middleware/not-found')

const app = express();

const indexRouter = require('./routes/index')
const authenticateRouter = require('./routes/authenticate')

app.use(express.json());

app.use('/', indexRouter);
app.use('/register', authenticateRouter)

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
