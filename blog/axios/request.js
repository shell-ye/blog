import { Message } from 'element-ui'

const baseURL = 'http://localhost:3002'

// const baseURL = AXIOS_URL

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ease:'ease',speed:500});
NProgress.configure({showSpinner: false});

const instance = axios.create({  // 创建一个axios实例
  baseURL, 
  timeout: 5000,
  withCredentials: true // 携带 cookie 信息
});

// 默认表单提交
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
instance.interceptors.request.use((config) => {
// 在发送请求之前做些什么
  NProgress.start()
  return config
},(error) => {
// 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  NProgress.done()
  return response
},(error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const request = ({
  url,
  method = "GET",
  params,
  data, 
  withCredentials = false, // default
  headers
}) => {
  // 解决 IE 的 GET 请求来自缓存问题: 添加一个时间戳
  let obj = {t: ''}
  obj.t = Date.parse(new Date());
  if ( params ) {
    Object.assign(params,obj)
  }
  let result = new Promise(( resolved,rejected ) => {
    // 区别两个不同的数据请求就行  get  post 
    switch ( method.toUpperCase() ) {
      case 'POST':
        var real_data = {}
        // if ( headers['Content-Type'] == 'application/x-www-form-urlencoded' ){
        //   // 表单提交
        //   const p = new FormData()
        //   for ( let key in data ) {
        //     p.append( key, data[ key ] )
        //   }
        //   real_data = p
        // } else {
          // json提交
          real_data = data 
        // }
        instance.post( url,data = real_data, {
          withCredentials, // default
          headers
        }).then( res => resolved( res ))
          .catch( err => rejected( err ))
        break;

        case 'PUT':
          instance.put( url, {
            method,
            params,
            withCredentials, // default
            headers
          }).then( res => resolved( res ))
            .catch( err => rejected( err ))
          break;
        default:
          instance.get( url, {
            method,
            params,
            withCredentials, // default
            headers
          }).then( res => resolved( res ))
            .catch( err => rejected( err ))
          break;
        }
    })
    result.then((res) => {
      if ( res.data.code != 200 ) {
        Message({
          type: 'error',
          message: res.data.msg,
          showClose: true,
          duration: 1500
        })
      }
    })
    return result
}

export default request 

// module.exports = request 