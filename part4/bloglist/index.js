const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const bloglist = require('./models/blog')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  bloglist
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new bloglist(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT || 4005
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})