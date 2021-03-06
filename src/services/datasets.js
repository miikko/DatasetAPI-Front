import axios from 'axios'

const baseUrl = 'http://localhost:8000/datasets'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id, fileFormat, config) => {
  const res = await axios.get(`${baseUrl}/${id}/${fileFormat}`, config)
  return res
}

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, getOne, remove }