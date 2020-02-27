import {Axios} from "../utils/AxiosPlugin";

import AuthApi from './AuthApi'
import ProjectApi from './ProjectApi'
import PageApi from './PageApi'
import TestApi from './TestApi'
import CompinfoApi from './CompinfoApi'
import EchartThemeApi from './EchartThemeApi'
import ReleaseApi from './ReleaseApi'
import UserApi from './UserApi'
import HttpProxyApi from './HttpProxyApi'

/**
 *
 * @param url
 * @param params
 * @returns {Promise<*>}
 */
const getData = async function (url, params) {
  return await Axios.get(url, {params: params})
};


export default {
  getData,
  AuthApi,
  ProjectApi,
  PageApi,
  TestApi,
  CompinfoApi,
  EchartThemeApi,
  ReleaseApi,
  UserApi,
  HttpProxyApi
}
