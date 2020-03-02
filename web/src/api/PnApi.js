import {Axios} from "../utils/AxiosPlugin";

import ProjectApi from './ProjectApi'
import PageApi from './PageApi'
import TestApi from './TestApi'
import CompinfoApi from './CompinfoApi'
import EchartThemeApi from './EchartThemeApi'
import ReleaseApi from './ReleaseApi'

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
  ProjectApi,
  PageApi,
  TestApi,
  CompinfoApi,
  EchartThemeApi,
  ReleaseApi
}
