<!--水波球-->

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

  import 'echarts-liquidfill/src/liquidFill.js';

  const _this = {
    name: 'WaterBallChart',
    mixins: [FuncCompMixin, ChartCompMixin],
    attr: {
      version: '1.0',
      configDataTemp: Object.assign({

        chartOption: {

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
      return {}
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

        let value = 0.50;
        let data = [value, value, value, value];

        let option = {

          graphic: [{
            type: 'group',
            left: 'center',
            bottom: 10
          }],
          series: [{
            type: 'liquidFill',
            radius: '90%',
            center: ['50%', '50%'],
            data: data,
            backgroundStyle: {
              borderWidth: 5,
              borderColor: '#1daaeb',
              color: '#fff'
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 10,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(69, 73, 240, 0)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(69, 73, 240, .25)'
                  }, {
                    offset: 1,
                    color: 'rgba(69, 73, 240, 1)'
                  }],
                  globalCoord: false
                },
                shadowBlur: 10,
                shadowColor: '#000',
              }
            },
            label: {
              normal: {
                formatter: (value * 100).toFixed(2) + '%',
                textStyle: {
                  fontSize: 20
                }
              }
            }
          }]
        };

        return option;
      }
    }
  };

  export default _this
</script>

<style scoped>

</style>
