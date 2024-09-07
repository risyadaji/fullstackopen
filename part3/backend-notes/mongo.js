const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password argument')
  process.exit(1)
}

// Setup
const password = process.argv[2]
const url = `mongodb+srv://risyadaji:${password}@cluster22147.1svmk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster22147`
mongoose.set('strictQuery', true)
mongoose.connect(url)

// Schema Preparation
// this only mandatory if we set `strictQuery` on mongodb
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// Operation
const note = new Note({
  content: 'HTML is easy',
  important: true,
})

// note.save().then((result) => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then((result) => {
  console.log(result)
  result.forEach((note) => {
    console.log(note.id, note.content)
  })

  mongoose.connection.close()
})
