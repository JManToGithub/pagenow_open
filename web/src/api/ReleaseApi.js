import {Axios} from '../utils/AxiosPlugin'

const getReleaseData = async function (pageId) {
  return await Axios.get('/release/getReleaseData', {params: {pageId: pageId}});
};

export default {
  getReleaseData
}
