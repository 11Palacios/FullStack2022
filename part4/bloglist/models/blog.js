const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../utils/config')

const url = config.MONGODB_URI
mongoose.connect(url)
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)  
  })

const bloglistSchema = new mongoose.Schema({
  title: { type: String, minlength: 3, required: true, unique: true },
  author: { type: String, minlength: 3, required: true },
  url: {type: String, minlength: 5, required: true },
  likes: {type: Number, }
})

bloglistSchema.plugin(uniqueValidator);

module.exports = mongoose.model('bloglist', bloglistSchema)