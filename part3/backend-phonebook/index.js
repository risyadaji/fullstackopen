require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Models
const Person = require('./models/person')

const sanitizeNumber = (req) => {
  let { body } = req
  if (body.hasOwnProperty('number')) {
    body['number'] = '******' // sanitize
  }
  return JSON.stringify(body)
}
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  // parse error
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const validatePayload = (name, number) => {
  if (!name) {
    return { error: 'missing name' }
  }
  if (!number) {
    return { error: 'missing number' }
  }
  return null
}

morgan.token('body', sanitizeNumber)

app.use(express.json())
app.use(express.static('dist'))

app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Routes
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  let isError = validatePayload(name, number)
  if (isError) {
    return res.status(400).send(isError)
  }

  const person = new Person({ name, number })
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  let isError = validatePayload(name, number)
  if (isError) {
    return res.status(400).send(isError)
  }

  const person = { name, number }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((_) => res.status(204).end())
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  Person.find({})
    .then((persons) => {
      let content = `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${Date()}</p>
     `
      res.send(content)
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

// Server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
