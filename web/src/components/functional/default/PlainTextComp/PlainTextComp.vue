<!--纯文本、多行文本组件-->

<template>
  <div class="plain-text-comp w-h-full"
       :style="{
         backgroundColor: component.compConfigData.backgroundColor,

         fontSize: component.compConfigData.fontSize + 'px',
         color: component.compConfigData.color,
         fontWeight: component.compConfigData.fontWeight,
         lineHeight: component.compConfigData.lineHeight + 'px',
         textAlign: component.compConfigData.textAlign,
         textIndent: component.compConfigData.textIndent + 'px',
         overflow: component.compConfigData.overflow,
         opacity: component.compConfigData.opacity
       }"
       :title="component.compConfigData.title"
       v-html="component.compConfigData.ds_resultObj[0].value">

  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'PlainTextComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.1',
      configDataTemp: Object.assign({
        title: '',
        text: '我是一段文本内容',

        backgroundColor: '',

        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
        lineHeight: 14,
        textAlign: 'left',
        textIndent: 28,
        overflow: 'hidden',
        opacity: 1,

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'value',
            remark: '文本值'
          }
        ],
        ds_resultObj: [
          {
            "value": "PageNow数据可视化开发平台，拖拽式设计，独创布局块概念，原生支持响应式网格布局，以获得更好的移动设备兼容性，集成百度Echarts以实现丰富的数据可视化图表。"
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
      init () {
        this.initDatasource(() => {

        }, (result) => {
          this.component.compConfigData.ds_resultObj = result.data;
        });
      }
    },
    computed: {}
  };

  export default _this
</script>

<style scoped>

</style>
