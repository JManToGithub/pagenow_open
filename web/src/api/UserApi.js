import {Axios} from '../utils/AxiosPlugin'

const registerNewUser = async function (data) {
  return await Axios.post('/user/registerNewUser', {data: JSON.stringify(data)});
};

const getUserByPage = async function (pageNum, pageSize) {
  return await Axios.get('/user/getUserByPage', {params: {pageNum: pageNum, pageSize: pageSize}});
};

const deleteUser = async function (id) {
  return await Axios.delete('/user/deleteUser', {params: {id: id}});
};

const changePassword = async function (data) {
  return await Axios.post('/user/changePassword', {data: JSON.stringify(data)});
};

export default {
  registerNewUser,
  getUserByPage,
  deleteUser,
  changePassword
}
