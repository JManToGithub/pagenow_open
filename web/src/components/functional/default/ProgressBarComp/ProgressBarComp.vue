<!--条形进度条-->

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
    name: 'ProgressBarComp',
    mixins: [FuncCompMixin, ChartCompMixin],
    attr: {
      version: '1.0',
      configDataTemp: Object.assign({

        chartOption: {
          marginLeft: 5,
          marginRight: 40,

          totalSteps: 100,
          stokeWidth: 20,
          startColor: '#1565c0',
          stopColor: '#00feff',
          innerStrokeColor: '#323232',

          showLabel: true,
          prefixText: '',
          suffixText: '%',
          textColor: '#fff',
          labelPosition: 'right'

        }

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'value',
            remark: '值'
          }
        ],
        ds_resultObj: [
          {
            'value': 46
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
          grid: {
            top: '0',
            left: this.component.compConfigData.chartOption.marginLeft,
            right: this.component.compConfigData.chartOption.marginRight,
            bottom: '0',
          },
          "xAxis": {
            type: 'value',
            max: this.component.compConfigData.chartOption.totalSteps,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [{
            type: 'category',
            inverse: false,
            dat: [],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show:false,
            }
          }],
          series: [{ //内
            type: 'bar',
            barWidth: this.component.compConfigData.chartOption.stokeWidth, // 宽度
            label: {
              normal: {
                show: this.component.compConfigData.chartOption.showLabel,
                position: this.component.compConfigData.chartOption.labelPosition,
                textStyle: {
                  color: this.component.compConfigData.chartOption.textColor
                },
                formatter: (e) => {
                  return this.component.compConfigData.chartOption.prefixText +
                    (e.value / this.component.compConfigData.chartOption.totalSteps * 100).toFixed(0)
                    + this.component.compConfigData.chartOption.suffixText
                }
              }
            },
            legendHoverLink: false,
            silent: true,
            itemStyle: {
              barBorderRadius: 30,
              color: {
                colorStops: [{
                  offset: 0,
                  color: this.component.compConfigData.chartOption.startColor // 0% 处的颜色
                }, {
                  offset: 1,
                  color: this.component.compConfigData.chartOption.stopColor // 100% 处的颜色
                }],
              } //底色
            },
            data: [this.component.compConfigData.ds_resultObj[0].value]
          },
            { //框
              type: 'bar',
              barWidth: this.component.compConfigData.chartOption.stokeWidth, // 宽度
              barGap: '-100%',
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  textStyle: {
                    color: '#000'
                  }
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 30,
                  color: this.component.compConfigData.chartOption.innerStrokeColor, //底色
                }
              },
              data: [this.component.compConfigData.chartOption.totalSteps],
              z: 1,
            },

          ]
        };

        // this.component.compConfigData.ds_resultObj.forEach(item => {
        //   option.xAxis[0].data.push(item.label);
        //   option.series[0].data.push(item.value)
        // });

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
