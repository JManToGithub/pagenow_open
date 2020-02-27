// 页面信息接口

import {Axios} from '../utils/AxiosPlugin'

const getMsg = async function (msg) {
  return await Axios.get('/test/getMsg', {params: {msg: msg}});
};


export default {
  getMsg
}
