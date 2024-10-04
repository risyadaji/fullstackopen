const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => (sum += blog.likes))

  return sum
}

const favoriteBlog = (blogs) => {
  let favorite = {}

  blogs.forEach((blog) => {
    if (Object.keys(favorite).length === 0) {
      favorite = blog
    } else if (favorite.likes < blog.likes) {
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  let countByAuthor = {}
  let mostBlogs = {}

  blogs.forEach((blog) => {
    const obj = countByAuthor[blog.author]
    if (obj === undefined) {
      countByAuthor[blog.author] = { author: blog.author, blogs: 1 }
    } else {
      countByAuthor[blog.author] = { ...obj, blogs: obj.blogs + 1 }
    }

    if (Object.keys(mostBlogs).length === 0) {
      mostBlogs = countByAuthor[blog.author]
    } else if (mostBlogs.blogs < countByAuthor[blog.author].blogs) {
      mostBlogs = countByAuthor[blog.author]
    }
  })

  return mostBlogs
}

const mostLikes = (blogs) => {
  let countByAuthor = {}
  let mostLikes = {}

  blogs.forEach((blog) => {
    const obj = countByAuthor[blog.author]
    if (obj === undefined) {
      console.log('true')
      countByAuthor[blog.author] = { author: blog.author, likes: blog.likes }
    } else {
      countByAuthor[blog.author] = { ...obj, likes: obj.likes + blog.likes }
      console.log('false')
    }

    if (Object.keys(mostLikes).length === 0) {
      mostLikes = countByAuthor[blog.author]
    } else if (mostLikes.likes < countByAuthor[blog.author].likes) {
      mostLikes = countByAuthor[blog.author]
    }
  })

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
