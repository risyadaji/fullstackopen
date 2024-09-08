const mongoose = require('mongoose')

// connection
const uri = process.env.MONGODB_URI
mongoose.set('strictQuery', true)
mongoose
  .connect(uri)
  .then((_) => console.log('connected to mongoDB'))
  .catch((error) => console.log('error conntecting to mongoDB:', error.message))

// schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// update transform function
// replace _id to id
// delete _id and __v from mongoose
personSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
