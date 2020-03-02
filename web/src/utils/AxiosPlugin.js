import axios from 'axios'
import { Message, LoadingBar } from 'iview'

import router from '../router'
import PnApi from '../api/PnApi'

// 创建 axios 实例
// 这里 export 的原因是方便组件外使用 axios
export const Axios = axios.create({
  //baseURL: process.env.BASE_URL,
  baseURL: process.env.VUE_APP_BASEPATH,
  timeout: 10000,
});

// POST传参序列化(添加请求拦截器)
// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
  LoadingBar.start();

  // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
  if(config.method  === 'post'){

    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    let ret = '';
    for (let it in config.data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
    }
    config.data = ret;

  }

  const token = localStorage.getItem('token');

  if (token) {
    config.headers['token'] = token;
  }

  return config

},error =>{
  return Promise.reject(error)
});

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  LoadingBar.finish();

  //对响应数据做些事
  if(res.data.code == 0){
    Message.error(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, error => {
  LoadingBar.error();

  if (error.response.status === 403) {

    Message.error(error.response.data.message);

  } else if (error.response.status === 500) {
    // 服务器错误
    // do something
    return Promise.reject(error.response.data)
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response.data)
});


// 将 Axios 实例添加到Vue的原型对象上
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}

