
import PnApi from '../../api/PnApi'

import { getField, updateField } from 'vuex-map-fields';

const state = {

  // 工程信息
  projectInfo: {},

  // 页面源数据
  pageMetadata: {
    layout: {
      layoutItems: [

      ]
    }
  },

  rightSidebarPageConfigFormName: '',       // 右侧边栏页面信息编辑表单名称
  rightSidebarLayoutItemConfigFormName: '', // 右侧边栏布局块编辑区表单名称
  currentSelectLayoutItemId: '',            // 当前选中的布局块ID

  rightSidebarFuncCompConfigFormName: '',   // 右侧边栏组件编辑区表单名称

  currentSelectLayoutItemIds: [],           // 当前选中的多个布局块的ID数组

  currentHoverLayoutItemId: '',             // 当前滑入的布局块ID

  canvasEnabled: true,                      // 画布激活状态

};

const getters = {
  getField,

  /**
   * 获取工程信息
   * @param state
   * @returns {state.projectInfo|{}|*|string}
   */
  getProjectInfo (state) {
    return state.projectInfo
  },

  /**
   * 获取页面源数据
   * @param state
   * @returns {state.pageMetadata|{layout}|*|string|EchartCompMixin.computed.pageMetadata|null}
   */
  getPageMetadata (state) {
    return state.pageMetadata
  },

  /**
   * 获取布局块对象，内部根据currentSelectLayoutItemId状态属性来查询匹配的布局块对象
   * @param state
   * @returns {*}
   */
  getLayoutItem (state) {
    return getField(state.pageMetadata.layout.layoutItems.find(o=>o.id==state.currentSelectLayoutItemId))
  },

  /**
   * 根据布局块的ID获取布局块对象
   * @param state
   * @returns {function(*): *}
   */
  getLayoutItemById: (state) => (id) => {
    return state.pageMetadata.layout.layoutItems.find(o=>o.id==id)
  },

  getComponents (state) {
    let layoutItems = state.pageMetadata.layout.layoutItems;
    let components = [];
    layoutItems.forEach((item)=>{
      if(item.component.id) {
        components.push(item.component)
      }
    });
    return components;
  },

  getLayoutConfigFormName (state) {
    if(state.pageMetadata.developCanvas === 'AbsoluteLayoutCanvas') {
      return 'AbsoluteLayoutConfigDataForm'
    }
    return ''
  },

};

const actions = {

  loadPage ({commit}, pageId) {
    PnApi.PageApi.getPageById(pageId).then(result => {
      let page = result.data;
      let pageMetadataTmp = {
        id: page.id,
        name: page.name,
        path: page.path,
        component: page.component,
        developCanvas: page.developCanvas,
        remark: page.remark,
        create_date: page.create_date,
        layout: JSON.parse(page.layout),
        ownEchartTheme: page.ownEchartTheme,
        echartThemeId: page.echartThemeId,
        publish: page.publish,
        encrypt: page.encrypt,
      };

      if(pageMetadataTmp.ownEchartTheme == '1' && pageMetadataTmp.echartThemeId) {
        PnApi.EchartThemeApi.getEchartThemeById(pageMetadataTmp.echartThemeId).then(result=>{
          let echartTheme = result.data;
          pageMetadataTmp.echartThemeJsonText = echartTheme.jsonText;
          commit('setPageMetadata', pageMetadataTmp)
        })
      }else {
        commit('setPageMetadata', pageMetadataTmp)
      }
    });

  }

};

const mutations = {

  updateField,

  /**
   * 重置设计器相关状态
   * @param state
   */
  resetDesigner (state) {
    state.rightSidebarLayoutItemConfigFormName = '';
    state.currentSelectLayoutItemId = '';
    state.currentSelectLayoutItemIds = [];
    state.rightSidebarFuncCompConfigFormName = '';
    state.pageMetadata.layout.layoutItems = [];
  },

  setProjectInfo (state, projectInfo) {
    state.projectInfo = projectInfo
  },

  setPageMetadata (state, pageMetadata) {
    state.pageMetadata = pageMetadata
  },

  setPagePublishAndEncrypt (state, payload) {
    state.pageMetadata.publish = payload.publish;
    state.pageMetadata.encrypt = payload.encrypt;
  },

  /**
   * 设置layout对象
   * @param state
   * @param layout
   */
  setLayout (state, layout) {
    state.pageMetadata.layout = layout
  },

  /**
   *
   * @param state
   * @param layoutConfigData
   */
  setLayoutConfigData (state, layoutConfigData) {
    state.pageMetadata.layout.layoutConfigData = layoutConfigData
  },

  /**
   *
   * @param state
   * @param layoutItems
   */
  setLayoutItems (state, layoutItems) {
    state.pageMetadata.layout.layoutItems = layoutItems
  },

  /**
   * 删除指定布局块绑定的组件
   * @param state
   * @param layoutItemId
   */
  deleteComponentByLayoutItemId (state, layoutItemId) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==layoutItemId);
    obj.component = {}
  },

  /**
   * 设置布局块别名
   * @param state
   * @param payload
   */
  setLayoutItemAliasName (state, payload) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.id);
    obj.aliasName = payload.aliasName
  },

  /**
   * 设置布局块的左和上偏移
   * @param state
   * @param payload
   */
  setLayoutItemLeftAndTop (state, payload) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.id);
    obj.layoutItemConfigData.left = payload.left;
    obj.layoutItemConfigData.top = payload.top;
  },

  /**
   * 设置布局块的左和上偏移（用于方向键调整位置时使用）
   * @param state
   * @param payload
   */
  setLayoutItemLeftAndTopOffset (state, payload) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.id);
    obj.layoutItemConfigData[payload.direction] = obj.layoutItemConfigData[payload.direction] + payload.offset;
  },

  /**
   * 设置布局块的宽度和高度
   * @param state
   * @param payload
   */
  setLayoutItemWidthAndHeight (state, payload) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.id);
    obj.layoutItemConfigData.width = payload.width;
    obj.layoutItemConfigData.height = payload.height;
  },

  /**
   * 添加布局块
   * @param state
   * @param layoutItem
   */
  addLayoutItem(state, layoutItem) {
    state.pageMetadata.layout.layoutItems.push(layoutItem)
  },

  /**
   * 删除布局块
   * @param state
   * @param layoutItemId
   */
  deleteLayoutItem(state, layoutItemId) {
    let layoutItems = state.pageMetadata.layout.layoutItems;
    for (let i = 0; i < layoutItems.length; i++) {
      if(layoutItems[i].id === layoutItemId) {
        layoutItems.splice(i, 1);
        i--
      }
    }
  },

  /**
   * 添加组件到布局块
   * @param state
   * @param payload
   */
  addComponentToLayoutItem (state, payload) {
    let layoutItem = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.layoutItemId);
    layoutItem.component = payload.component
  },

  /**
   * 设置右侧边栏页面信息编辑表单名称
   * @param state
   * @param payload
   */
  setRightSidebarPageConfigFormName (state, payload) {
    state.rightSidebarPageConfigFormName = payload
  },

  /**
   * 设置右侧边栏布局块配置关联的组件表单名
   * @param state
   * @param compName
   */
  setRightSidebarLayoutItemConfigFormName (state, payload) {
    state.rightSidebarLayoutItemConfigFormName = payload
  },

  /**
   * 设置当前选中的单个布局块ID
   * @param state
   * @param layoutItemId
   */
  setCurrentSelectLayoutItemId (state, layoutItemId) {
    state.currentSelectLayoutItemId = layoutItemId;
  },

  updateLayoutItem (state, field) {
    updateField(state.pageMetadata.layout.layoutItems.find(o=>o.id==state.currentSelectLayoutItemId), field);
  },

  /**
   * 设置 右侧边栏组件配置关联的组件表单名
   * @param state
   * @param payload
   */
  setRightSidebarFuncCompConfigFormName (state, payload) {
    state.rightSidebarFuncCompConfigFormName = payload
  },

  /**
   * 设置 当前选中的多个布局块的ID数组
   * @param state
   * @param layoutItemIds 一个存储布局块ID字符串的数组
   */
  setCurrentSelectLayoutItemIds (state, layoutItemIds) {
    state.currentSelectLayoutItemIds = layoutItemIds
  },

  /**
   * 设置 画布激活状态
   * @param state
   * @param enabled
   */
  setCanvasEnabled (state, enabled) {
    state.canvasEnabled = enabled
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

