import axios from 'axios'
const baseUrl = '/api/auth'
const login = async credential => {
  const res = await axios.post(`${baseUrl}/login`,credential)
  return res.data
}

const register  =async credential => {
  const res = await axios.post(`${baseUrl}/register`,credential)
  return res.data;
}
export default { login, register }