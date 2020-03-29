import axios from 'axios'
import Storage from '~/utils/storage.js'
import baseURL from './baseURL.js'
axios.defaults.withCredentials = true// 跨域处理 允许携带cookie

function refreshToken(config, redirect) {
  return new Promise((resolve, reject) => {
    let userInfo = Storage.getLocal('user_info')
    if(!userInfo) return redirect('/login')
    let params = {
      refresh_token: userInfo.refresh_token
    }
    axios.post(baseURL.app+'/refreshToken', params).then(res => {
      if(res.data.status == 200){
        userInfo.access_token = res.result.access_token
        Storage.setLocal('user_info', userInfo)
        axios.post(config.url, JSON.parse(config.data)).then(re => {
          resolve(re.data)
        }).catch(err => reject(err))
      }
      if(res.data.status == 401){
        axios.post(baseURL.app+'/logout').then(() => {
          redirect('/login')
        }).catch(err => reject(err))
      }
    }).catch(err => reject(err))
  })
}

export default function ({ $axios, redirect, route }) {
  //正常请求返回处理
  $axios.onRequest(req => {
    console.log(req)
    return
  })
  //错误请求返回处理
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      //错误代码
      case 401:
        return refreshToken(error.response.config,redirect)
        break;
      case 403:
        sessionStorage.clear();
        redirect('/login')
        break;
      case 404:
        sessionStorage.clear();
        break;
      case 500:
        console.error("Server exception");
        break;
      case 502:
        console.error("Bad Gateway");
        break;
      case 503:
        console.error(error.message);
        break;
      case 504:
        console.error(error.message);
        break;
      default:
        break;
    }
  })
}