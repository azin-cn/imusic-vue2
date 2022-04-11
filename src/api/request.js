import axios from 'axios'

export function request(config) {

  const instance  = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    // 每次发送请求前检查token是否存在
    return config
  }, err => {
    return err
  })

  instance.interceptors.response.use(resp => {
    return resp.data || resp
  }, err => { // 接口错误状态处理
    switch (err.response.status) {
      case 404:
        // 直接退出函数，注意这里必须要再次封装一个Promise函数，
        // 因为最外层的一个异常需要有catch来捕获
        err.response.msg = "404"
    }
    // console.log(err.response);
    // return new Promise((resolve,reject) => { // 不知道为什么，使用静态的方法无法正确调用
    //   reject(err.response)
    // })
    return Promise.reject(err.response)
  })
  
  return instance(config)
}