<template>
  <Footer
      :style="{
        width: '100%',
        height: '48px',
        backgroundColor: '#424242',
        lineHeight: '48px',
        color: '#FFF',
        position: 'fixed',
        bottom: '0px',
        zIndex: '1',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '310px',
        paddingRight: '340px'
      }" @click.stop.native="footerClickHandle">

    <div :style="{float: 'right'}">

    </div>



  </Footer>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'DesignerFooter',

    data() {
      return {
        canvasSize: '',
        customCanvasSize: []
      }
    },
    mounted() {
      if(this.pageMetadata.id) {
      }
    },
    methods: {
      footerClickHandle () {
        this.$EventBus.$emit('footerClick')
      },


    },
    computed: {
      ...mapFields({
        pageMetadata: 'pageMetadata',
        layout: 'pageMetadata.layout'
      })
    },
    watch: {
      'pageMetadata.id': {
        handler: 'initCanvasSize'
      },
      'pageMetadata.layout.layoutConfigData.width': {
        handler: 'initCanvasSize'
      },
      'pageMetadata.layout.layoutConfigData.height': {
        handler: 'initCanvasSize'
      }
    }
  }
</script>

<style scoped>
  >>> .ivu-select-prefix {
    margin-top: 1px;
  }
</style>
