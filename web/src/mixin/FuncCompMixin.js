// 功能组件混入对象

const FuncCompMixin = {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  created () {},
  destroyed () {

    // 清除定时器
    if(this.timer) {
      clearInterval(this.timer);
    }

  },
  data () {
    return {
      timer: null
    }
  },
  methods: {

    /**
     * 初始化数据源（只有设置数据源配置的组件才需要使用此函数初始化数据）
     * @param _staticCallback 静态数据源回调
     * @param _dynamicCallback 动态数据源回调
     */
    initDatasource (_staticCallback, _dynamicCallback) {
      if(this.component.compConfigData.ds_type == 'api' && this.component.compConfigData.ds_apiPath) {
        if (this.component.compConfigData.ds_useHttpServerProxy) {
          this.$PnApi.HttpProxyApi.httpGet(this.$PnUtil.buildApiPath(
            this.component.compConfigData.ds_apiPath,
            this.component.compConfigData.ds_linkageUrlParams)
          ).then(result=>{
            _dynamicCallback(result)
          })
        }else {
          this.$PnApi.getData(this.$PnUtil.buildApiPath(
            this.component.compConfigData.ds_apiPath,
            this.component.compConfigData.ds_linkageUrlParams)
          ).then(result=>{
            _dynamicCallback(result)
          })
        }
      }else {
        _staticCallback()
      }
    },

  },
  computed: {
    projectInfo () {
      if(this.$store.state.release.pageMetadata) {
        return this.$store.getters['release/getProjectInfo']
      }else {
        return this.$store.getters['designer/getProjectInfo']
      }
    },
    pageMetadata () {
      if(this.$store.state.release.pageMetadata) {
        return this.$store.getters['release/getPageMetadata']
      }else {
        return this.$store.getters['designer/getPageMetadata']
      }
    },
    component: function () {
      if(this.$store.state.release.pageMetadata) {
        return this.$store.getters['release/getLayoutItemById'](this.location).component
      }else {
        return this.$store.getters['designer/getLayoutItemById'](this.location).component
      }
    },

    /**
     * 是否显示布局块遮罩层
     * @returns {boolean}
     */
    shade () {
      if(this.$store.state.release.pageMetadata) {
        return false
      }else {
        return true;
      }
    },

    /**
     * 默认图片
     * @returns {string}
     */
    defaultImg () {
      return 'this.src="'+require('@/assets/image/default-img.png')+'";this.onerror=null'
    }
  }
};

export default FuncCompMixin
