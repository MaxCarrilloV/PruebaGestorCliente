import axios from 'axios'
const baseUrl = '/api/clientes'

let Token = null

export const setToken = (newToken) => {
  Token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const config = {
    headers: { Authorization: Token },
  }
  const res = await axios.get(baseUrl,config)
  return res.data
}

export const create = async cliente => {

  const config = {
    headers: { Authorization: Token }
  }

  const res = await axios.post(baseUrl,cliente,config)
  return res.data
}

export const update = async cliente => {
  const config = {
    headers: { Authorization: Token },
  }
  const res = await axios.put(`${baseUrl}/${cliente.id}`,cliente,config)
  return res.data
}

export const remove = async id => {
  const config = {
    headers: { Authorization: Token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`,config)
  if(res.status === 200){
    return id
  }
  return res.data
}

