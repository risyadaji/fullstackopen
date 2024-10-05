const express = require('express')
require('express-async-errors')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const config = require('./utils/config')
const notesRouter = require('./controllers/notes')

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting mongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
