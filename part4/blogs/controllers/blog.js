const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})

  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title: title,
    url: url,
    author: author,
    likes: likes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
