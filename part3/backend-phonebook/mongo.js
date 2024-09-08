const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password argument')
  process.exit(1)
}

// Setup
const password = process.argv[2] // 0: node, 1: mongo.js
const uri = `mongodb+srv://risyadaji:${password}@cluster22147.1svmk.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster22147`
mongoose.set('strictQuery', true)
mongoose.connect(uri)

// Schema Preps
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Operation
switch (process.argv.length) {
  case 3:
    Person.find({}).then((persons) => {
      console.log('phonebook:')

      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })

      mongoose.connection.close()
    })

    break

  case 5:
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({ name, number })
    person.save().then((result) => {
      console.log(`added ${name} ${number} to phonebook`)
      mongoose.connection.close()
    })

    break

  default:
    console.log('invalid arguments')
    process.exit(1)
}
