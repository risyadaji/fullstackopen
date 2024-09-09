const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => logger.info('connected to mongoDB'))
  .catch((error) => logger.error(error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
