import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const remove = id => {
  axios
    .delete(`${baseUrl}/${id}`)
    .catch(error => {alert(`the person was already deleted from server`)})
}

const methods = { getAll, create, remove }

export default methods