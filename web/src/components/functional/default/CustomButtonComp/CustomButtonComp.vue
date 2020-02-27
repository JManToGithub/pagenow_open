<!--自定义按钮组件-->

<template>
  <div class="w-h-full">
    <div v-if="shade" class="shade"></div>
    <div class="custom-button-comp w-h-full"
         :style="Object.assign({
           backgroundColor: component.compConfigData.backgroundColor,
           borderWidth: component.compConfigData.borderWidth + 'px',
           borderColor: component.compConfigData.borderColor,
           borderStyle: component.compConfigData.borderStyle,

           borderTopLeftRadius: component.compConfigData.borderTopLeftRadius + 'px',
           borderTopRightRadius: component.compConfigData.borderTopRightRadius + 'px',
           borderBottomLeftRadius: component.compConfigData.borderBottomLeftRadius + 'px',
           borderBottomRightRadius: component.compConfigData.borderBottomRightRadius + 'px',

           textAlign: component.compConfigData.textAlign,
           lineHeight: component.compConfigData.lineHeight + 'px',

         }, styleObject)"
         @click="clickHandle">

    <span class="text"
          :style="{
            fontSize: component.compConfigData.fontSize + 'px',
            color: component.compConfigData.color,

          }">{{component.compConfigData.text}}</span>

    </div>
  </div>
</template>

<script>
  import FuncCompMixin from '@/mixin/FuncCompMixin'

  const _this = {
    name: 'CustomButtonComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.2',
      configDataTemp: {

        backgroundColor: '',

        borderWidth: 0,
        borderColor: '#fff',
        borderStyle: 'solid',

        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        text: '按钮文本',
        fontSize: 18,
        color: '#fff',
        textAlign: 'left',
        lineHeight: 18,

        backgroundColorHover: '',
        textColorHover: '',
        textShadowHover: '',

        useLink: false,
        link: '',
        linkTarget: '_blank',

        clickHandleScript: ''

      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      clickHandle () {
        if (this.component.compConfigData.useLink) {
          if (this.component.compConfigData.linkTarget == '_blank') {
            window.open(this.component.compConfigData.link + '')
          }else if (this.component.compConfigData.linkTarget == '_self') {
            window.location.href = '' + this.component.compConfigData.link
          }
        }else {
          eval(this.component.compConfigData.clickHandleScript)
        }
      }
    },
    computed: {
      styleObject() {
        let obj = {};
        if (this.component.compConfigData.backgroundColorHover) {
          obj['--background-color-hover'] = this.component.compConfigData.backgroundColorHover
        }else {
          obj['--background-color-hover'] = this.component.compConfigData.backgroundColor
        }

        if (this.component.compConfigData.textColorHover) {
          obj['--text-color-hover'] = this.component.compConfigData.textColorHover
        }else {
          obj['--text-color-hover'] = this.component.compConfigData.color
        }

        if (this.component.compConfigData.textShadowHover) {
          obj['--text-shadow-hover'] = this.component.compConfigData.textShadowHover
        }

        return obj
      }
    }
  };

  export default _this
</script>

<style lang="less" scoped>
  .custom-button-comp {
    border-radius: 5px;
    cursor: pointer;
    padding: 0px;
    .text {
      width: 100%;
      height: 100%;
    }
    &:hover {
      background-color: var(--background-color-hover) !important;
      .text {
        color: var(--text-color-hover) !important;
        text-shadow: var(--text-shadow-hover) !important;
      }
    }
    &:active {

    }
  }

</style>
