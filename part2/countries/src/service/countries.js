import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
  const req = axios.get(`${baseUrl}/api/all`)
  return req.then((resp) => resp.data)
}

const getByName = (name) => {
  const req = axios.get(`${baseUrl}/api/name/${name}`)
  return req.then((resp) => resp.data)
}

export default { getAll, getByName }
