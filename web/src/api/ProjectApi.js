import {Axios} from '../utils/AxiosPlugin'

const saveProject = async function (data, type) {
  return await Axios.post('/project/saveProject', {data: JSON.stringify(data), type: type});
};

const updateProjectEchartThemeId = async function (projectId, echartThemeId) {
  return await Axios.post('/project/updateProjectEchartThemeId', {projectId: projectId, echartThemeId: echartThemeId});
};

const getProjectByPage = async function (pageNum, pageSize) {
  return await Axios.get('/project/getProjectByPage', {params: {pageNum: pageNum, pageSize: pageSize}});
};

const deleteProject = async function (id) {
  return await Axios.delete('/project/deleteProject', {params: {id: id}});
};

const getProjectById = async function (id) {
  return await Axios.get('/project/getProjectById', {params: {id: id}});
};

export default {
  saveProject,
  updateProjectEchartThemeId,
  getProjectByPage,
  deleteProject,
  getProjectById
}
