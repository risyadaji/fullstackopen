const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', (req) => {
  let { body } = req
  if (body.hasOwnProperty('number')) {
    body['number'] = '******' // sanitize
  }

  return JSON.stringify(body)
})

app.use(express.json())
app.use(express.static('dist'))

app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

// Functions
const findById = (id) => {
  return persons.find((person) => person.id === id)
}

const findByName = (name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}

const generateRandomId = () => {
  return String(Math.floor(Math.random() * 1000))
}

// Routes
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = findById(id)

  if (!person) {
    res.status(404).end()
  } else {
    res.json(person)
  }
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  // validation
  if (!name) {
    return res.status(400).json({
      error: 'missing name',
    })
  }

  if (!number) {
    return res.status(400).json({
      error: 'missing number',
    })
  }

  if (findByName(name)) {
    return res.status(400).json({
      error: 'name must be unique',
    })
  }

  // insertion
  const person = {
    id: generateRandomId(),
    name: name,
    number: number,
  }

  persons = persons.concat(person)
  res.json(person)
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
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
