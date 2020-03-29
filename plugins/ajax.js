import Vue from 'vue'
import BASEURL from './baseURL.js'
import Storage from '../utils/storage.js'
Vue.use({
  install(vue) {
    vue.prototype.$ajax = function(url, data, method, headers) {
      if (!url) {
        return console.error("请求url错误: ", url)
      }
      url = BASEURL.app + url
      let options = {
        method: method || "post",
        url,
        data,
        headers: Object.assign(
          {
            "Content-Type": "application/json;charset=utf-8",
            'access_token':Storage.getLocal('user_info').access_token || ''
          },
          headers
        )
      };
      return new Promise((resovle, reject) => {
        this.$axios(options)
          .then(res => {
            resovle(res.data);
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})

/**
 * @Description:  使用如下：
 * @author annlo luo
 * @date 2020/3/16
 *
    this.$ajax(url, data, method, headers).then(res => {

    }).catch(err => {

    })
 *
 * url: 接口名
 * data: 参数
 * method: 请求方法（默认是post）
 * headers: 设置请求头
 *
 */
