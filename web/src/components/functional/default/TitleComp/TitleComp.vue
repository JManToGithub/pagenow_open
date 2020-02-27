<template>
  <div class="title-comp w-h-full">
    <p class="w-h-full" :style="{
      color: component.compConfigData.color,
      fontSize: component.compConfigData.fontSize + 'px',
      fontWeight: component.compConfigData.fontWeight,
      textAlign: component.compConfigData.textAlign,
      writingMode: component.compConfigData.writingMode,
    }">
      {{component.compConfigData.text}}
    </p>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'TitleComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.0',
      configDataTemp: Object.assign({

        text: '我是标题组件',

        color: '#fff',
        fontSize: 28,
        fontWeight: 'normal',
        textAlign: 'center',
        writingMode: 'horizontal-tb'

      }, PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {}
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

    }
  };

  export default _this
</script>

<style lang="less" scoped>
  .title-comp {

  }
</style>
