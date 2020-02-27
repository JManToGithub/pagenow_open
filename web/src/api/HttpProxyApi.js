import {Axios} from '../utils/AxiosPlugin'

const httpGet = async function (url) {
  return await Axios.get('/httpProxy/httpGet', {params: {url: url}});
};

export default {
  httpGet
}
