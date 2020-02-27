<!--已弃用-->
<template>
  <div class="panel-layout-item-container"
       :style="{
         borderWidth: layoutItem.layoutItemConfigData.borderWidth + 'px',
         borderStyle: layoutItem.layoutItemConfigData.borderStyle,
         borderColor: layoutItem.layoutItemConfigData.borderColor,
         borderTopLeftRadius: layoutItem.layoutItemConfigData.borderTopLeftRadius + 'px',
         borderTopRightRadius: layoutItem.layoutItemConfigData.borderTopRightRadius + 'px',
         borderBottomLeftRadius: layoutItem.layoutItemConfigData.borderBottomLeftRadius + 'px',
         borderBottomRightRadius: layoutItem.layoutItemConfigData.borderBottomRightRadius + 'px',
       }">
    <div class="panel-layout-item-header"
         :style="{
           height: layoutItem.layoutItemConfigData.headerHeight + 'px',
           lineHeight: layoutItem.layoutItemConfigData.headerLineHeight + 'px',
           backgroundColor: layoutItem.layoutItemConfigData.headerBackgroundColor,
           paddingTop: layoutItem.layoutItemConfigData.headerPaddingTop + 'px',
           paddingRight: layoutItem.layoutItemConfigData.headerPaddingRight + 'px',
           paddingBottom: layoutItem.layoutItemConfigData.headerPaddingBottom + 'px',
           paddingLeft: layoutItem.layoutItemConfigData.headerPaddingLeft + 'px',
           borderBottomWidth: layoutItem.layoutItemConfigData.headerBorderBottomWidth + 'px',
           borderBottomColor: layoutItem.layoutItemConfigData.headerBorderBottomColor,
         }">
      <span :style="{
              fontSize: layoutItem.layoutItemConfigData.headerTitleFontSize + 'px'
            }">
        {{layoutItem.layoutItemConfigData.headerTitle}}
      </span>
    </div>
    <div class="panel-layout-item-body"
         :style="{
           height: 'calc(100% - ' + layoutItem.layoutItemConfigData.headerHeight + 'px' +')',
           backgroundColor: layoutItem.layoutItemConfigData.bodyBackgroundColor,
           padding: layoutItem.layoutItemConfigData.bodyPadding + 'px',
         }">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import LayoutItemMixin from '@/mixin/LayoutItemMixin';

  const _this = {
    name: 'PanelLayoutItem',
    mixins: [LayoutItemMixin],
    attr: {
      configDataTemp: {
        headerTitle: '容器标题',
        headerTitleFontSize: 14,
        headerLineHeight: 40,

        headerHeight: 40,
        headerBackgroundColor: '#FFF',
        headerPaddingTop: 0,
        headerPaddingRight: 10,
        headerPaddingBottom: 0,
        headerPaddingLeft: 10,
        headerBorderBottomWidth: 1,
        headerBorderBottomColor: '#CCC',

        bodyBackgroundColor: '#DDD',
        bodyPadding: 0
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  };

  export default _this
</script>

<style scoped>
  .panel-layout-item-container {
    width: 100%;
    height: 100%;
  }

  .panel-layout-item-container .panel-layout-item-header {
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom-style: solid;
  }

  .panel-layout-item-container .panel-layout-item-body {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
</style>
