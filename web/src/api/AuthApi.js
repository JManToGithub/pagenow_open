import {Axios} from '../utils/AxiosPlugin'

const getPublicKey = async function () {
  return await Axios.get('/auth/getPublicKey');
};

const login = async function (credentials) {
  return await Axios.post('/auth/login', {data: JSON.stringify(credentials)});
};

/**
 * 暂时弃用
 * @param token
 * @returns {Promise<*>}
 */
const refreshToken = async function (token) {
  return await Axios.post('/auth/refreshToken', {token: token})
};

const logout = async function (token) {
  return await Axios.post('/auth/logout', {token: token})
};

export default {
  getPublicKey,
  login,
  refreshToken,
  logout
}
