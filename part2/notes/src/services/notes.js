import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 1000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then((resp) => resp.data.concat(nonExisting))
}

const create = (newNote) => {
  const request = axios.post(baseUrl, newNote)
  return request.then((resp) => resp.data)
}

const update = (id, updatedNote) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedNote)
  return request.then((resp) => resp.data)
}

export default { getAll, create, update }
