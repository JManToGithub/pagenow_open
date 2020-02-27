<!--基本饼图-->

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
    name: 'BasePieChart',
    mixins: [FuncCompMixin, ChartCompMixin],
    attr: {
      version: '1.1',
      configDataTemp: Object.assign({

        chartOption: {
          title: {
            show: false,
            text: '基本柱状图',
            subtext: '',
            x: 'left',
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'auto',
            textStyle: {
              color: '#fff'
            },
          },
          tooltip: {
            formatter: '{b} <br/>{c} ({d}%)'
          },
          series: {
            radius: ['0', '50%'],
            center: ['50%', '50%'],
            roseType: false,
            label: {
              normal: {
                show: true,
                position: 'outside'
              },
              emphasis: {
                show: true,
                textStyle: {

                }
              }
            },
            labelLine: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            }
          }
        },

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'name',
            remark: '类目'
          },
          {
            field: 'value',
            remark: '值'
          }
        ],
        ds_resultObj: [
          {
            'name': '南宁',
            'value': 10
          },
          {
            'name': '柳州',
            'value': 52
          },
          {
            'name': '桂林',
            'value': 200
          },
          {
            'name': '崇左',
            'value': 334
          },
          {
            'name': '北海',
            'value': 390
          },
          {
            'name': '防城港',
            'value': 330
          },
          {
            'name': '玉林',
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
          title : {
            show: this.component.compConfigData.chartOption.title.show,
            text: this.component.compConfigData.chartOption.title.text,
            subtext: this.component.compConfigData.chartOption.title.subtext,
            x: this.component.compConfigData.chartOption.title.x,
            textStyle: {
              color: this.component.compConfigData.chartOption.title.textStyle.color
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: this.component.compConfigData.chartOption.tooltip.formatter
          },
          legend: {
            show: this.component.compConfigData.chartOption.legend.show,
            orient: this.component.compConfigData.chartOption.legend.orient,
            left: this.component.compConfigData.chartOption.legend.left,
            top: this.component.compConfigData.chartOption.legend.top,
            textStyle: {
              color: this.component.compConfigData.chartOption.legend.textStyle.color
            },
            data: []
          },
          series : [
            {
              name: '',
              type: 'pie',
              radius : [this.component.compConfigData.chartOption.series.radius[0], this.component.compConfigData.chartOption.series.radius[1]],
              center: [this.component.compConfigData.chartOption.series.center[0], this.component.compConfigData.chartOption.series.center[1]],
              roseType: this.component.compConfigData.chartOption.series.roseType,
              data:[

              ],
              itemStyle: {

                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',

                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  show: this.component.compConfigData.chartOption.series.label.normal.show,
                  position: this.component.compConfigData.chartOption.series.label.normal.position
                },
                emphasis: {
                  show: this.component.compConfigData.chartOption.series.label.emphasis.show,
                  textStyle: {

                  }
                }
              },
              labelLine: {
                normal: {
                  show: this.component.compConfigData.chartOption.series.labelLine.normal.show
                },
                emphasis: {
                  show: this.component.compConfigData.chartOption.series.labelLine.emphasis.show
                }
              }
            },
          ]
        };

        option.series[0].data = this.component.compConfigData.ds_resultObj;

        this.component.compConfigData.ds_resultObj.forEach(item => {
          option.legend.data.push(item.name)
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
