const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose
  .connect(uri)
  .then((_) => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting mongoDB:', error.message)
  })

// Schema Preparation
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
