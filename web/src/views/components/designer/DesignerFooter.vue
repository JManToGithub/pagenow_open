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
    <div :style="{float: 'left'}">
      <Select size="small" v-model="canvasSize" prefix="md-tablet-landscape" style="width:150px"
              :disabled="!pageMetadata.id" placeholder="画布尺寸" @on-change="canvasSizeChange">
        <OptionGroup label="预设像素尺寸">
          <Option v-for="item in $PnDict.canvasSizes2" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
        <OptionGroup label="预设设备尺寸">
          <Option v-for="item in $PnDict.canvasSizes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </OptionGroup>
      </Select>
    </div>
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
        this.initCanvasSize();
      }
    },
    methods: {
      footerClickHandle () {
        this.$EventBus.$emit('footerClick')
      },

      initCanvasSize () {
        if (this.pageMetadata.id) {
          let width = this.pageMetadata.layout.layoutConfigData.width;
          let widthPixelUnit = this.pageMetadata.layout.layoutConfigData.widthPixelUnit;
          let height = this.pageMetadata.layout.layoutConfigData.height;
          let heightPixelUnit = this.pageMetadata.layout.layoutConfigData.heightPixelUnit;

          let flag = false;
          let value = '';
          let newCanvasSizes = this.$PnDict.canvasSizes.concat(this.$PnDict.canvasSizes2);

          newCanvasSizes.forEach(item => {
            let arr = item.value.split('*');
            if(parseInt(arr[0]) == width && parseInt(arr[1]) == height && arr[2] == widthPixelUnit && arr[3] == heightPixelUnit) {
              value = item.value;
              flag = true
            }
          });

          if(flag) {
            this.canvasSize = value
          }else {
            this.canvasSize = ''
          }
        }else {
          this.canvasSize = ''
        }
      },
      canvasSizeChange (value) {
        if (value) {
          let arr = value.split('*');
          let tmpPageMetadata = this.$PnUtil.deepClone(this.pageMetadata);
          tmpPageMetadata.layout.layoutConfigData.width = parseInt(arr[0]);
          tmpPageMetadata.layout.layoutConfigData.widthPixelUnit = arr[2];
          tmpPageMetadata.layout.layoutConfigData.height = parseInt(arr[1]);
          tmpPageMetadata.layout.layoutConfigData.heightPixelUnit = arr[3];
          this.$store.commit('designer/setPageMetadata', tmpPageMetadata);
        }
      }
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
