<template>
  <div class="">
    <h1>{{component.compConfigData.title}}</h1>
    <span v-html="component.compConfigData.ds_resultObj[0].value"></span>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'Template', // 此名称必须填写，且必须与组件文件名相同
    mixins: [FuncCompMixin],
    attr: {
      version: '1.0',
      configDataTemp: Object.assign({

        title: '',

      }, PnDesigner.buildFuncCompDatasourceField({ // 如果组件需要配置数据源，则需要调用此函数构建数据源字段对象
        ds_resultObjTemplate: [
          {
            field: 'value',
            remark: '内容'
          }
        ],
        ds_resultObj: [
          {
            "value": "我是组件内容"
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
      init () { // 组价初始化函数，函数名必须使用init，不可更改
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
