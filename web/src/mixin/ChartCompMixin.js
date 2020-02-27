
const ChartCompMixin = {
  props: {

  },
  data() {
    return {
      chart: null,          // 存储图表实例
      echartThemeName: '',  // echart主题名称
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

  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    resizeHandle () {
      if (this.chart) {
        this.chart.resize();
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
    }
  },
  watch: {
    'component.compConfigData.chartOption': {
      handler: 'init',
      deep: true
    },
    'component.compConfigData.ds_resultObj': {
      handler: 'init',
      deep: true
    },
  }
};

export default ChartCompMixin
