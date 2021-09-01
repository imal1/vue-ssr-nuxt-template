/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'
// import { Dialog, Toast } from 'vant';
import { Message } from 'element-ui'
// import appconfig  from '../../public/appconfig' ;\

// create an axios instance
const hostJSON = require('../../public/host.json')

const service = axios.create({
  baseURL: hostJSON.host,
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (request) => {
    // if (config.method === "get") {
    //   config.data = { unused: 0 }; // 这个是关键点，加入这行就可以了,解决get,请求添加不上Content-Type
    // }
    request.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 控制跨域

    request.headers['Access-Control-Allow-Origin'] = '*'
    request.headers['Access-Control-Allow-Methods'] =
      'GET,HEAD,OPTIONS,POST,PUT'
    request.headers['Access-Control-Allow-Headers'] =
      'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    // jwt头

    // if (!request.headers['Authorization']) {
    //   request.headers['Authorization'] = `Bearer ${window.localStorage.getItem(
    //   // constkey.Key_Auth
    //   ) || ''}`;
    // }
    return request
  },
  (err) => Promise.reject(err)
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    // console.log("响应");
    // console.log(response);
    // const apidata = response.data

    if (response.status === 401) {
      // if (store.state.tokenStatus) {
      //   // 饿了么框架弹框
      Message.warning('登录超时！401')
      //   // 修改tokenStatus状态，防止多次点击
      //   store.commit('updateTokenStatus', false)
      // }
      // setTimeout(() => {
      //   window.location = '#/login/'
      // }, 1500)
      // return Promise.reject('error')
    } else if (response.status === 502) {
      Message.warning('网站内部错误，请联系网站维护人员')
      return Promise.reject('error')
    }
    if (response.status === 501) {
      Message.warning('请求方式不对')
      return Promise.reject('error')
    }
    if (response.status === 402) {
      Message.warning('参数值不对')
      return Promise.reject('error')
      // } else if (apidata.Code !== 0) {
      //   // 非5xx的错误属于业务错误，留给具体页面处理
      //   return Promise.reject(response)
    } else {
      // console.log("1");
      return response
    }
  },
  (error) => {
    // console.log('err' + error) // for debug
    // console.log(error)
    Message.error({
      title: '警告',
      message: '登录连接超时',
    })
    return Promise.reject(error)
  }
)

export default service
