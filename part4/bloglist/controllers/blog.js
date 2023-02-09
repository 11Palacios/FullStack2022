const blogRouter = require('express').Router()
const bloglist = require('../models/blog')

blogRouter.get('/', (request, response) => {
        response.send('<h1>Bloglist API</h1>')
})

blogRouter.get('/api/bloglist', (request, response) => {
  bloglist.find({}).then(blog => {
    response.json(blog)
  })
})

blogRouter.get('/api/bloglist/:id', (request, response) => {
    const id = request.params.id
    bloglist.findById(id)
    .then(blog => {
        response.json(blog)
    })
  })

blogRouter.post('/api/bloglist', (request, response) => {
    const body = request.body

    const blog = new bloglist({
        title: body.title,
        author: body.author,
        url: body.url
    })

    blog.save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedAndFormattedBlog => {
        response.json(savedAndFormattedBlog)
      })

})

module.exports = blogRouter