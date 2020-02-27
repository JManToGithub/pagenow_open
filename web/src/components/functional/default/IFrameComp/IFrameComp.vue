<template>
  <div class="frame-comp">
    <div v-if="shade" class="shade"></div>
    <iframe :id="component.compConfigData.id"
            :src="component.compConfigData.srcPath ? component.compConfigData.srcPath : component.compConfigData.ds_resultObj[0].src"
            :width="component.compConfigData.width + component.compConfigData.widthPixelUnit"
            :height="component.compConfigData.height + component.compConfigData.heightPixelUnit"
            :frameborder="component.compConfigData.frameborder"
            :name="component.compConfigData.name"
            :scrolling="component.compConfigData.scrolling">
    </iframe>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'IFrameComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.2',
      configDataTemp: Object.assign({

        id: '',
        srcPath: '',

        width: 100,
        widthPixelUnit: '%',
        height: 100,
        heightPixelUnit: '%',
        frameborder: 0,
        name: '',
        scrolling: 'auto',

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'src',
            remark: '链接地址'
          }
        ],
        ds_resultObj: [
          {
            "src": ""
          }
        ],
      }), PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {

      }
    },
    mounted() {

      this.init()

    },
    methods: {
      init () {
        this.initDatasource(() => {

        }, (result) => {
          this.component.compConfigData.ds_resultObj = result.data;
        })
      },
    },
    computed: {

    }
  };

  export default _this
</script>

<style scoped>
  .frame-comp {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
