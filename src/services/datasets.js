import axios from 'axios'

const baseUrl = 'http://localhost:8000/datasets'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id, config) => {
  const res = await axios.get(`${baseUrl}/${id}`, config)
  return res.data
}

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

export default { getAll, getOne, remove }