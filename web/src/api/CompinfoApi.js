import {Axios} from '../utils/AxiosPlugin'

/**
 * 保存组件类型
 * @param data
 * @param type 操作类型：add：新增，update：更新
 * @returns {Promise<*>}
 */
const saveCompinfoType = async function (data, type) {
  return await Axios.post('/compinfo/saveCompinfoType', {data: JSON.stringify(data), type: type});
};

const deleteCompinfoType = async function (id) {
  return await Axios.delete('/compinfo/deleteCompinfoType', {params: {id: id}});
};

const getCompinfoTypeByPage = async function (pageNum, pageSize) {
  return await Axios.get('/compinfo/getCompinfoTypeByPage', {params: {pageNum: pageNum, pageSize: pageSize}});
};

/**
 * 保存组件信息
 * @param data
 * @param type
 * @returns {Promise<*>}
 */
const saveCompinfo = async function (data, type) {
  return await Axios.post('/compinfo/saveCompinfo', {data: JSON.stringify(data), type: type});
};

const getCompinfoById = async function (id) {
  return await Axios.get('/compinfo/getCompinfoById', {params: {id: id}});
};

const getAllCompinfo = async function () {
  return await Axios.get('/compinfo/getAllCompinfo');
};

const getCompinfoByPage = async function (typeId, pageNum, pageSize) {
  return await Axios.get('/compinfo/getCompinfoByPage', {params: {typeId: typeId, pageNum: pageNum, pageSize: pageSize}});
};

const deleteCompinfo = async function (id) {
  return await Axios.delete('/compinfo/deleteCompinfo', {params: {id: id}});
};

const buildComponentLibrary = async function () {
  return await Axios.get('/compinfo/buildComponentLibrary');
};

export default {
  saveCompinfoType,
  deleteCompinfoType,
  getCompinfoTypeByPage,
  saveCompinfo,
  getCompinfoById,
  getAllCompinfo,
  getCompinfoByPage,
  deleteCompinfo,
  buildComponentLibrary
}
