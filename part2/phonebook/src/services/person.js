import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((resp) => resp.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((resp) => resp.data);
};

const update = (id, updatePerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatePerson);
  return request.then((resp) => resp.data);
};

const deleteById = (id) => {
  // note: somehow json-server will return not found when id is integer
  // so for simplicity lets make all created user with string ids
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((resp) => resp.data);
};

export default { getAll, create, update, deleteById };
