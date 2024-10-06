// test requirement
const { beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

// dependencies
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

// Prepare
// Cleanup db, insert seeder data
// Test
// Get list, Get Detail, Create, Delete
// Close connection

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('db cleaned up')

  const blogsObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogsObject.map((blog) => blog.save())
  await Promise.all(promiseArray)

  console.log('db seeded')
})

test('all blogs are returned and as a json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('is id attribute exists', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blog = response.body[0]

  assert(blog['id'] !== undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new blog for test',
    author: 'Risyad Aji',
    url: 'https://example.com',
    likes: 99,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // compare after inserted and initialBlogs length
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  // check is new title inserted
  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  assert(blogTitles.includes('new blog for test'))
})

test('undefined likes should default 0 when added', async () => {
  const newBlog = {
    title: 'new blog for test',
    author: 'Risyad Aji',
    url: 'https://example.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // compare after inserted and initialBlogs length
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  // check is createdBlog's like is 0
  const createdBlog = blogsAtEnd[blogsAtEnd.length - 1]
  assert.strictEqual(createdBlog.likes, 0)
})

test('blog without title or url will not added', async () => {
  const emptyTitleBlog = {
    author: 'Risyad Aji',
    url: 'https://example.com',
  }

  const emptyUrlBlog = {
    title: 'new blog for test',
    author: 'Risyad Aji',
  }

  await api.post('/api/blogs').send(emptyTitleBlog).expect(400)
  await api.post('/api/blogs').send(emptyUrlBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('update by id', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const previousBlog = blogsAtStart[0]
  previousBlog.title = 'this title is updated'

  await api
    .put(`/api/blogs/${previousBlog.id}`)
    .send(previousBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  // console.log(blogsAtEnd[0])
  // length not changed
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  assert(blogsAtEnd[0].title === previousBlog.title)
})

test('delete blog by id', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const deletedBlog = blogsAtStart[0]
  await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
