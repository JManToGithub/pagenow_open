<!--圆形进度条-->

<template>
  <div class="w-h-full">
    <radial-progress-bar :diameter="radialProgressBarDiameter"
                         :completed-steps="component.compConfigData.ds_resultObj[0].value"
                         :total-steps="component.compConfigData.totalSteps"
                         :startColor="component.compConfigData.startColor"
                         :stopColor="component.compConfigData.stopColor"
                         :innerStrokeColor="component.compConfigData.innerStrokeColor"
                         :strokeWidth="component.compConfigData.stokeWidth"
                         :animateSpeed="component.compConfigData.animateSpeed">
      <p v-show="component.compConfigData.showSuffixText" :style="{
        color: component.compConfigData.textColor,
        fontSize: component.compConfigData.textFontSize + 'px',
      }">
        {{ component.compConfigData.ds_resultObj[0].value }}{{component.compConfigData.suffixText}}
      </p>
    </radial-progress-bar>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  import RadialProgressBar from 'vue-radial-progress'

  const _this = {
    name: 'RadialProgressBarComp',
    mixins: [FuncCompMixin],
    components: {
      RadialProgressBar
    },
    attr: {
      version: '1.0',
      configDataTemp: Object.assign({

        totalSteps: 100,
        animateSpeed: 1000,
        diameter: 200,
        stokeWidth: 20,
        startColor: '#1565c0',
        stopColor: '#64b5f6',
        innerStrokeColor: '#323232',

        showSuffixText: true,
        suffixText: '%',
        textColor: '#fff',
        textFontSize: 28,

      }, PnDesigner.buildFuncCompDatasourceField({ // 如果组件需要配置数据源，则需要调用此函数构建数据源字段对象
        ds_resultObjTemplate: [
          {
            field: 'value',
            remark: '值'
          }
        ],
        ds_resultObj: [
          {
            "value": 60
          }
        ],
      }), PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {
        completedSteps: 2,
        totalSteps: 10
      }
    },
    mounted() {
      this.init();

    },
    methods: {
      init () { // 组价初始化函数，函数名必须使用init，不可更改
        this.initDatasource(() => {

        }, (result) => {
          this.component.compConfigData.ds_resultObj = result.data;

        });
      }
    },
    computed: {
      radialProgressBarDiameter () {
        return this.$parent.$parent.layoutItem.layoutItemConfigData.width;
      }
    }
  };

  export default _this
</script>

<style scoped>

</style>
