import axios from 'axios'

export function request(config) {

  const instance  = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return err
  })

  instance.interceptors.response.use(result => {
    return result.data
  }, error => {
    return error
  })
  
  return instance(config)
}