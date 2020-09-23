import { Message } from 'element-ui'
import { getCookie,setCookie } from '@/utils/cookie'
import { getToken } from './user'
import store from '@/store'
const config = require('./../../../config.json')
const baseURL = config.server_URL

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

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use((config) => {
  NProgress.start()
  return config
},(error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  NProgress.done()
  return response
},(error) => {
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
  let obj = {t: '', token: getCookie('token')}
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
    result.then(async (res) => {
      if ( res.data.code != 200 ) {
        Message({
          type: 'error',
          message: res.data.msg,
          showClose: true,
          duration: 1500
        })
        if ( res.data.code == '000013' ) {
          store.commit('logout')
          let result = await getToken()
          if ( result.data.code == 200 ) {
            store.commit('setToken', result.data.data)
            setCookie('token', result.data.data)
            window.location.href = '/login'
          }
        }
      }
    }).catch(err => {
      Message({
        type: 'error',
        message: err,
        showClose: true,
        duration: 1500
      })
    })
    return result
}

export default request 

// module.exports = request 