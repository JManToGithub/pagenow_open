
const EchartCompMixin = {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,          // 存储图表实例
      echartThemeName: '',  // echart主题名称
      sourceData: null,     // 存储接口返回的源数据
    }
  },
  created () {

  },
  mounted () {
    if(this.pageMetadata.ownEchartTheme == '1' && this.pageMetadata.echartThemeId) {
      this.echartThemeName = 'globalEchartTheme';
      this.$Echarts.registerTheme(this.echartThemeName, JSON.parse(this.pageMetadata.echartThemeJsonText));
    }else {
      if(this.projectInfo.echartThemeId && this.projectInfo.echartThemeJsonText) {
        this.echartThemeName = 'globalEchartTheme';
        this.$Echarts.registerTheme(this.echartThemeName, JSON.parse(this.projectInfo.echartThemeJsonText));
      }
    }

    this.chart = this.$Echarts.init(document.getElementById('chart-'+this.component.id), this.echartThemeName);
    this.drawChart();
  },
  beforeDestroy () {
    this.chart.dispose()
  },
  methods: {
    resizeHandle () {
      this.chart.resize();
    },
    /**
     * 构建接口路径，内部判断如果图表配置了使用URL参数联动，将会拼接所有URL参数到原始接口路径中
     * @param apiPath
     * @param useUrlParam
     * @returns {*}
     */
    buildApiPath (apiPath, useUrlParam) {
      if(useUrlParam) {
        let params = '';
        for(let q in this.$route.query) {
          params += ''+q+'='+this.$route.query[q]+'&'
        }
        params = params.substr(0, params.length-1);

        apiPath += '?'+params;
      }
      return apiPath
    },

    /**
     * 绘制图表，初始化接口返回的源数据
     */
    drawChart () {
      let _this = this;

      // 判断是否调用接口获取数据
      if(this.component.compConfigData.useApiPath) {
        if(this.component.compConfigData.apiPath) {
          this.$PnApi.getData(this.buildApiPath(this.component.compConfigData.apiPath, this.component.compConfigData.useUrlParam)).then(result => {
            this.sourceData = result.data.data;

            this.chart.setOption(this.component.compConfigData.chartOption);

            if(this.component.compConfigData.onlyUseCustomJsCode) {
              if(this.component.compConfigData.customJsCode) {
                eval(this.component.compConfigData.customJsCode)
              }
            }else {
              this.implant();
              this.implantLoadSourceDataAfter();
              if(this.component.compConfigData.customJsCode) {
                eval(this.component.compConfigData.customJsCode)
              }
            }

          });
        }
      }else {
        this.chart.setOption(this.component.compConfigData.chartOption);

        if(this.component.compConfigData.onlyUseCustomJsCode) {
          if(this.component.compConfigData.customJsCode) {
            eval(this.component.compConfigData.customJsCode)
          }
        }else {
          this.implant();
          if(this.component.compConfigData.customJsCode) {
            eval(this.component.compConfigData.customJsCode)
          }
        }
      }

    },

    /**
     * 刷新图表
     */
    refreshChart () {
      let _this = this;
      this.chart.setOption(this.component.compConfigData.chartOption);

      if(this.component.compConfigData.onlyUseCustomJsCode) {
        if(this.component.compConfigData.customJsCode) {
          eval(this.component.compConfigData.customJsCode)
        }
      }else {
        this.implant();
        this.implantLoadSourceDataAfter();
      }
    },

    /**
     * 运行子组件的嵌入代码
     * @param implant
     */
    runImplantFunction () {
      if(!this.component.compConfigData.onlyUseCustomJsCode) {
        this.implant();
        this.implantLoadSourceDataAfter()
      }
    }
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
    }
  },
  watch: {
    'component.compConfigData.chartOption': {
      handler: 'drawChart',
      deep: true
    },
    'component.compConfigData.useApiPath': {
      handler: 'drawChart'
    },
    'component.compConfigData.onlyUseCustomJsCode': {
      handler: 'drawChart'
    }
  }
};

export default EchartCompMixin
