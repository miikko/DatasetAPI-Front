import axios from 'axios'

const baseUrl = 'http://localhost:8000/upload'

const send = async (file, config) => {
  const formData = new FormData()
  formData.append('file', file, file.name)
  const res = await axios.post(formData, config)
  return res
}

export default { send }