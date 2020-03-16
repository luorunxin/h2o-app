import axios from 'axios'
axios.defaults.withCredentials = true// 跨域处理 允许携带cookie
export default function ({ $axios, redirect }) {
  //正常请求返回处理
  $axios.onRequest(req => {
    console.log(req)
  })
  //错误请求返回处理
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      //错误代码
      case 401:
        sessionStorage.clear();
        redirect('/login')
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