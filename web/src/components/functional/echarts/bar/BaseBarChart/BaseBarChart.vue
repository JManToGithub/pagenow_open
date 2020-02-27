<!--基本柱状图-->

<template>
  <div class="w-h-full">
    <div v-resize="resizeHandle" style="width: 100%; height: 100%;">
      <div :id="'chart-'+component.id" class="w-h-full"></div>
    </div>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import ChartCompMixin from '@/mixin/ChartCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'BaseBarChart',
    mixins: [FuncCompMixin, ChartCompMixin],
    attr: {
      version: '1.1',
      configDataTemp: Object.assign({

        chartOption: {
          backgroundColor: '',
          color: '#2196f3',
          title: {
            show: false,
            text: '基本柱状图',
            textAlign: 'auto'
          },
          grid: {
            left: '40px',
            top: '20px',
            right: '20px',
            bottom: '30px'
          },
          xAxis: {
            show: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              color: '#fff'
            },
          },
          yAxis: {
            show: false,
            axisLabel: {
              color: '#FFF'
            }
          }
        },

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'label',
            remark: '类目'
          },
          {
            field: 'value',
            remark: '值'
          }
        ],
        ds_resultObj: [
          {
            'label': '南宁',
            'value': 10
          },
          {
            'label': '柳州',
            'value': 52
          },
          {
            'label': '桂林',
            'value': 200
          },
          {
            'label': '崇左',
            'value': 334
          },
          {
            'label': '北海',
            'value': 390
          },
          {
            'label': '防城港',
            'value': 330
          },
          {
            'label': '玉林',
            'value': 220
          }
        ],
      }), PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {

      }
    },
    mounted() {

      this.init();

    },
    methods: {

      init() {
        this.initDatasource(() => {
          this.chart.setOption(this.chartOption);

        }, () => {
          this.component.compConfigData.ds_resultObj = result.data;
          this.chart.setOption(this.chartOption);

        });
      },

    },
    computed: {
      chartOption() {

        let option = {
          backgroundColor: this.component.compConfigData.chartOption.backgroundColor,
          title: {
            textStyle: {
              color: '#fff'
            },
            show: this.component.compConfigData.chartOption.title.show,
            text: this.component.compConfigData.chartOption.title.text,
          },
          color: [this.component.compConfigData.chartOption.color],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: this.component.compConfigData.chartOption.grid.top,
            left: this.component.compConfigData.chartOption.grid.left,
            right: this.component.compConfigData.chartOption.grid.right,
            bottom: this.component.compConfigData.chartOption.grid.bottom
          },
          xAxis: [
            {
              show: this.component.compConfigData.chartOption.xAxis.show,
              type: 'category',
              data: [],
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: this.component.compConfigData.chartOption.xAxis.axisLabel.color
              },
              axisLine: {
                show: this.component.compConfigData.chartOption.xAxis.axisLine.show,
                lineStyle: {
                  color: this.component.compConfigData.chartOption.xAxis.axisLine.lineStyle.color
                }
              },
            }
          ],
          yAxis: [
            {
              show: this.component.compConfigData.chartOption.yAxis.show,
              type: 'value',
              axisLabel: {
                color: this.component.compConfigData.chartOption.yAxis.axisLabel.color
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '数量',
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: new this.$Echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                      offset: 0,
                      color: '#00feff'
                    },
                      {
                        offset: 0.5,
                        color: '#027eff'
                      },
                      {
                        offset: 1,
                        color: '#0286ff'
                      }
                    ]
                  )
                }
              },
              data: [],
            }
          ]
        };

        this.component.compConfigData.ds_resultObj.forEach(item => {
          option.xAxis[0].data.push(item.label);
          option.series[0].data.push(item.value)
        });

        return option;
      }
    },
    watch: {

    }
  };

  export default _this
</script>

<style scoped>

</style>
