<template>
  <div class="image-comp">
    <img :src="imageSrc" :style="{
      width: component.compConfigData.width,
      height: component.compConfigData.height
    }" :onerror="defaultImg"/>

  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'ImageComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.2',
      configDataTemp: Object.assign({
        relativePath: '',
        width: '100%',
        height: '100%',

      }, PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      imageSrc () {
        // return process.env.VUE_APP_BASEPATH + '/' + this.component.compConfigData.relativePath + '?v=' + this.$PnUtil.getTimestamp()
        return process.env.VUE_APP_BASEPATH + this.component.compConfigData.relativePath
      }
    },
    watch: {

    }
  };

  export default _this
</script>

<style scoped>
  .image-comp {
    width: 100%;
    height: 100%;
  }
</style>
