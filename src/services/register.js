import axios from 'axios'

const baseUrl = 'http://localhost:8000/users'

const register = async (user) => {
  const res = await axios.post(baseUrl, user)
  return res.data
}

export default { register }