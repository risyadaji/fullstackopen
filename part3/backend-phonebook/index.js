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

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  // validation
  if (!name) {
    return res.status(400).json({ error: 'missing name' })
  }

  if (!number) {
    return res.status(400).json({ error: 'missing number' })
  }

  // todo: unique name validation

  const person = new Person({ name, number })
  person.save().then((savedPerson) => res.json(savedPerson))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = findById(id)

  if (!person) {
    res.status(404).end()
  } else {
    persons = persons.filter((person) => person.id !== id)
    res.status(204).end()
  }
})

app.get('/info', (req, res) => {
  let content = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `
  res.send(content)
})

// Server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
