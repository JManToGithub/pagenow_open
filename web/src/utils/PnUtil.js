/* eslint-disable no-useless-escape */
import router from '../router'
import EventBus from './EventBus'

import html2canvas from 'html2canvas'
import _ from 'lodash'

/**
 * 生成UUID
 * @returns {string}
 */
const uuid = function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
};

/**
 * 获取当前时间戳
 * @returns {number}
 */
const getTimestamp = function () {
  return new Date().getTime();
};

/**
 * 打开一个新的页面
 * @param path
 * @param query
 */
const openPageToBlank = function (path, query) {
  let routeUrl = router.resolve({
    path: path,
    query: query
  });
  window.open(routeUrl.href, '_blank');
};

/**
 * 获取反色差值
 * @param hexcolor (示例：FFFFFF)
 * @returns {string}
 */
const getContrastYIQ = function (hexcolor) {
  let r = parseInt(hexcolor.substr(0,2),16);
  let g = parseInt(hexcolor.substr(2,2),16);
  let b = parseInt(hexcolor.substr(4,2),16);
  let yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
};

/**
 * 判断是否为Mac系统
 * @returns {*|boolean}
 */
const isMac = function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

/**
 * 判断是否为Windows系统
 * @returns {*|boolean}
 */
const isWindows = function () {
  return /windows|win32/i.test(navigator.userAgent);
};

/**
 * 删除iView的Table中行数据的一些前端无用字段，提供给后端JFinal更新使用
 * @param obj
 * @returns {*}
 */
const deleteTableRowUselessField = function (obj) {
  if(obj) {
    let newObj = Object.assign({}, obj);
    delete newObj._index;
    delete newObj._rowKey;
    delete newObj.username;
    return newObj
  }
  return null
};

/**
 * 深拷贝对象
 * @param obj
 * @returns {any}
 */
const deepClone = function (obj) {
  // let objStr = JSON.stringify(obj);
  // let cloneObj = JSON.parse(objStr);
  // return cloneObj
  return _.cloneDeep(obj)
};

/**
 * 深拷贝数组
 * @param arr
 * @returns {*}
 */
const recursiveClone = function (arr) {
  return Array.isArray(arr) ? Array.form(arr, recursiveClone) : arr;
};

/**
 * 动态添加URL参数
 * @param key
 * @param value
 */
const addUrlParams = function (key, value) {
  let uri = window.location.href;

  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    uri = uri.replace(re, '$1' + key + "=" + value + '$2');
  }else {
    uri = uri + separator + key + "=" + value;
  }
  window.history.replaceState({
    path: uri
  }, '', uri);
};

/**
 * 动态删除URL参数
 * @param name
 */
const deleteUrlParams = function (name) {
  let loca = window.location;
  let baseUrl = loca.origin + loca.pathname + "?";
  let query = loca.search.substr(1);
  if (query.indexOf(name)>-1) {
    let obj = {};
    let arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    let url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
    window.history.replaceState({
      path: url
    }, '', url);
  }
};

/**
 * 获取URL参数值
 * @param name
 * @returns {string|boolean}
 */
const getUrlParam  = function (name) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i<vars.length; i++) {
    let pair = vars[i].split("=");
    if(pair[0] == name){ return pair[1]; }
  }
  return(false);
};

/**
 * 构建接口地址
 * @param apiPath 接口地址
 * @param linkageUrlParams 联动参数集合
 * @returns {*}
 */
const buildApiPath = function (apiPath, linkageUrlParams) {
  let params = '';
  for(let q in router.history.current.query) {
    linkageUrlParams.forEach(item=>{
      if (item.field == q) {
        params += '&' + q + '=' + router.history.current.query[q] + ''
      }
    });
  }
  params = params.substr(0, params.length-1);

  if (linkageUrlParams.length == 0) {
    return apiPath
  }else {
    if(apiPath.indexOf('?') > 0) {
      apiPath += params;
    }else {
      apiPath += '?' + params;
    }
    return apiPath;
  }
};

/**
 * 获取组件的compConfigData默认配置数据
 * @param compName
 * @returns {*}
 */
const getCompConfigData = function (compName) {
  let compConfigData = null;
  const componentsContext = require.context('../components/', true, /\.vue$/);

  componentsContext.keys().forEach(fileName => {
    const componentConfig = componentsContext(fileName);

    if(componentConfig.default.name == compName) {
      const compInst = require('../components/'+fileName.slice(2, fileName.length));
      compConfigData = Object.assign({}, compInst.default.attr.configDataTemp)
    }
  });

  return compConfigData
};

/**
 *
 * @param compName
 * @returns {*}
 */
const getCompVersion = function (compName) {
  let version = '';
  const componentsContext = require.context('../components/', true, /\.vue$/);

  componentsContext.keys().forEach(fileName => {
    const componentConfig = componentsContext(fileName);

    if(componentConfig.default.name == compName) {
      const compInst = require('../components/'+fileName.slice(2, fileName.length));
      if (compInst.default.attr.version !== undefined) {
        version = compInst.default.attr.version
      }
    }
  });

  return version
};

/**
 * 获取FunctionalComponents文件夹下所有功能组件的文件名（已排除掉了配置表单文件名）
 * @returns {Array}
 */
const getAllFuncCompName = function () {
  let arr = [];
  const componentsContext = require.context('../components/functional/', true, /\.vue$/);

  componentsContext.keys().forEach(fileName => {
    const componentConfig = componentsContext(fileName);
    if (componentConfig.default.name.indexOf('Form') < 0) {
      arr.push(componentConfig.default.name)
    }
  });
  return arr;
};

/**
 * 客户端下载图片工具对象
 */
const img = {
  download(imgData, name) {
    this.downloadFile(name ? name : 'test', imgData);
  },
  //下载
  downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    let blob = this.base64ToBlob(content); //new Blob([content]);

    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName + ".png";
    aLink.href = URL.createObjectURL(blob);

    // aLink.dispatchEvent(evt);
    document.getElementsByTagName('body')[0].appendChild(aLink);//火狐浏览器添加项
    aLink.click();
    document.getElementsByTagName('body')[0].removeChild(aLink);
  },
  //base64转blob
  base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  },
};

/**
 * 截屏
 * @param domId DOM节点ID
 */
const screenShot = function (domId) {
  let canvasContent = document.getElementById(domId), //需要截图的包裹的（原生的）DOM 对象
    width = canvasContent.clientWidth,//canvasContent.offsetWidth || document.body.clientWidth; //获取dom 宽度
    height = canvasContent.clientHeight,//canvasContent.offsetHeight; //获取dom 高度
    canvas = document.createElement("canvas"), //创建一个canvas节点
    scale = 1; //定义任意放大倍数 支持小数

  canvas.width = width * scale; //定义canvas 宽度 * 缩放
  canvas.height = height * scale; //定义canvas高度 *缩放
  canvas.style.width = canvasContent.clientWidth * scale + "px";
  canvas.style.height = canvasContent.clientHeight * scale + "px";
  canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

  let opts = {
    scale: scale, // 添加的scale 参数
    canvas: canvas, //自定义 canvas
    logging: false, //日志开关，便于查看html2canvas的内部执行流程
    width: width, //dom 原始宽度
    height: height,
    useCORS: true, // 【重要】开启跨域配置
    backgroundColor: null
  };

  html2canvas(canvasContent, opts).then((canvas) => {
    img.download(canvas.toDataURL(), getTimestamp());
  });
};

/**
 * 图片转base64
 * @param imgSrc 图片路径
 * @param ext 后缀
 * @param callback 回调函数
 */
const imageToBase64 = function (imgSrc, ext, callback) {
  let canvas = document.createElement("canvas"); //创建canvas DOM元素
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imgSrc + '?v=' + Math.random();
  img.onload =  function () {
    canvas.width = img.width; //指定画板的宽度，自定义
    canvas.height = img.height; //指定画板的高度,自定义
    ctx.drawImage(img, 0, 0, img.width, img.height); //参数可自定义
    let dataURL = canvas.toDataURL("image/" + ext);
    callback.call(this, dataURL); //回掉函数获取Base64编码
    canvas = null;
  }
};

/**
 * 深合并对象
 * @param obj1
 * @param obj2
 */
const deepMerge = function (obj1, obj2) {
  let key;
  for(key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ?
      deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key];
  }
  return obj1;
};

/**
 * 添加图片相对路径至本地存储
 * @param relativePath
 */
const addImageToLocalStorage = function (relativePath) {
  if (!localStorage.getItem('uploadImageRecord')) {
    localStorage.setItem('uploadImageRecord', '[]')
  }
  let uploadImageRecord = JSON.parse(localStorage.getItem('uploadImageRecord'));
  uploadImageRecord.unshift({
    relativePath: relativePath
  });
  localStorage.setItem('uploadImageRecord', JSON.stringify(uploadImageRecord));
  EventBus.$emit('uploadImageRecordChange');
};

/**
 * 获取当前登录用户信息
 * @returns {*}
 */
const getCurrentUser = function () {
  let currentUser = JSON.parse(localStorage.getItem('current_user'));
  if (currentUser) {
    return currentUser
  }else {
    return null
  }
};


export default {
  uuid,
  getTimestamp,
  openPageToBlank,
  getContrastYIQ,
  isMac,
  isWindows,
  deleteTableRowUselessField,
  deepClone,
  recursiveClone,
  addUrlParams,
  deleteUrlParams,
  getUrlParam,
  buildApiPath,
  getCompConfigData,
  getCompVersion,
  getAllFuncCompName,
  screenShot,
  imageToBase64,
  deepMerge,
  addImageToLocalStorage,
  getCurrentUser
}
