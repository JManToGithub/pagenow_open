// 此工具类用于构建设计器所使用的源数据的对象模板

import PnUtil from './PnUtil'

const buildInitPageMetadata = function () {
  let pageMetadata = {
    layout: {

      layoutItems: [

      ]
    }
  };
  return pageMetadata
};

/**
 * 构建 绝对布局默认配置
 * @returns
 */
const buildAbsoluteLayoutConfigData = function () {
  let layoutConfigData = { // 绝对布局默认配置
    width: 1024,
    widthPixelUnit: 'px',
    height: 768,
    heightPixelUnit: 'px',
    backgroundColor: '#0E2B43',
    showGrid: false,
    canvasGridClass: 'canvas-grid-white-10px10px',
    dragPixel: 1,  // 拖拽单位像素

    imageRelativePath: '',
    imageRepeat: 'no-repeat',
    imageSize: '100% 100%',

  };
  return layoutConfigData
};

/**
 * 构建 绝对布局布局块对象
 * @param payload
 * @returns
 */
const buildAbsoluteLayoutItem = function () {
  let layoutItem = {
    id: PnUtil.uuid(),
    name: 'DefaultLayoutItem',
    aliasName: '',
    layoutItemConfigData: {

      draggableEnabled: true,
      resizableEnabled: true,

      width: 250,
      height: 250,
      left: 0,
      top: 0,

      backgroundColor: '',
      padding: 0,

      backgroundColorHover: '', // 鼠标滑入背景色

      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: '#000',

      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,

      boxShadowInset: false,
      boxShadowLeft: 0,
      boxShadowTop: 0,
      boxShadowRadius: 0,
      boxShadowColor: '',

      zIndex: 2,

      display: 'block',


    },
    component: {
      id: '',
      name: '',
      compConfigData: {

      }
    }
  };

  return layoutItem
};

/**
 * 构建 Echart组件默认配置
 * @returns {{useUrlParam: boolean, apiPath: string}}
 */
const buildEchartConfigDataTemp = function () {
  let configDataTemp = {
    useUrlParam: false,           // 使用URL参数
    apiPath: '',                  // 接口地址
    useApiPath: false,            // 是否调用接口获取数据
    customJsCode: '',             // 自定义JS代码
    onlyUseCustomJsCode: false,   // 只使用自定义JS代码逻辑
  };
  return configDataTemp
};


/**
 * 构建 功能组件数据源相关字段对象
 * @param customObj 自定义合并对象（同名字段会覆盖原有字段）
 */
const buildFuncCompDatasourceField = function (customObj = {}) {
  let dsFieldObj = {
    ds_type: 'static',
    ds_apiPath: '',

    ds_resultObjTemplate: [

    ],
    ds_resultObj: [

    ],

    ds_linkageUrlParams: [],

  };
  dsFieldObj = PnUtil.deepMerge(dsFieldObj, customObj);
  return dsFieldObj
};

/**
 * 构建 功能组件通用配置字段
 * @param customObj 自定义合并对象（同名字段会覆盖原有字段）
 */
const buildFuncCompGlobalField = function (customObj = {}) {
  let fieldObj = {

  };
  fieldObj = PnUtil.deepMerge(fieldObj, customObj);
  return fieldObj
};

export default {
  buildInitPageMetadata,
  buildAbsoluteLayoutConfigData,
  buildAbsoluteLayoutItem,
  buildEchartConfigDataTemp,

  buildFuncCompDatasourceField,
  buildFuncCompGlobalField
}
