<!--默认布局块-->
<template>
  <div class="default-layout-item-container"
       :style="Object.assign({
         borderWidth: layoutItem.layoutItemConfigData.borderWidth + 'px',
         borderStyle: layoutItem.layoutItemConfigData.borderStyle,
         borderColor: layoutItem.layoutItemConfigData.borderColor,
         borderTopLeftRadius: layoutItem.layoutItemConfigData.borderTopLeftRadius + 'px',
         borderTopRightRadius: layoutItem.layoutItemConfigData.borderTopRightRadius + 'px',
         borderBottomLeftRadius: layoutItem.layoutItemConfigData.borderBottomLeftRadius + 'px',
         borderBottomRightRadius: layoutItem.layoutItemConfigData.borderBottomRightRadius + 'px',
         backgroundColor: layoutItem.layoutItemConfigData.backgroundColor,
         padding: layoutItem.layoutItemConfigData.padding + 'px',
         boxShadow: boxShadow,
       }, styleObject)">
    <slot></slot>
  </div>
</template>

<script>

  import LayoutItemMixin from '@/mixin/LayoutItemMixin';

  const _this = {
    name: 'DefaultLayoutItem',
    mixins: [LayoutItemMixin],
    attr: {
      configDataTemp: {

      }
    },

    data() {
      return {

      }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed: {
      styleObject() {
        let obj = {};
        if (this.layoutItem.layoutItemConfigData.backgroundColorHover) {
          obj['--background-color-hover'] = this.layoutItem.layoutItemConfigData.backgroundColorHover
        }else {
          obj['--background-color-hover'] = this.layoutItem.layoutItemConfigData.backgroundColor
        }
        return obj
      },
      boxShadow() {
        let style = this.layoutItem.layoutItemConfigData.boxShadowLeft + 'px' + ' ' +
          this.layoutItem.layoutItemConfigData.boxShadowTop + 'px' + ' ' +
          this.layoutItem.layoutItemConfigData.boxShadowRadius + 'px' + ' ' +
          this.layoutItem.layoutItemConfigData.boxShadowColor;

        if (this.layoutItem.layoutItemConfigData.boxShadowInset) {
          style = 'inset ' + style
        }
        return style
      }
    },
    watch: {

    }
  };

  export default _this
</script>

<style lang="less" scoped>
  .default-layout-item-container {
    width: 100%;
    height: 100%;
  }
  .default-layout-item-container:hover {
    background-color: var(--background-color-hover) !important;
  }
</style>
