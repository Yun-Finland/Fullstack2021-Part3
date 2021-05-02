const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connected to MongoDB ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, useMongoClient:true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type:String,
      minlength: 3,
      validate: {
        validator: (temp) => {
          return /\S{3,}/.test(temp);
        },
        message: props => `${props.value} is shorter then the minimum allowed lenght (3)`
      },    
      required: [true, 'User name is required']
    },
    number: {
      type: String,
      validate: {
        validator: function(temp) {
          return /[0-9]{8,}/.test(temp);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number is required']
    },
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)