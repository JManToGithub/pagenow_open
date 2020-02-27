<template>
  <div class="func-comp-container" @click="funcCompContainerClick">
    <slot>
      <div class="default-container">
        <div class="quadrangle-item" style="left: 8px; top: 8px; border-left: 2px solid #f5f5f5; border-top: 2px solid #f5f5f5; "></div>
        <div class="quadrangle-item" style="right: 8px; top: 8px; border-right: 2px solid #f5f5f5; border-top: 2px solid #f5f5f5;"></div>
        <div class="quadrangle-item" style="right: 8px; bottom: 8px; border-right: 2px solid #f5f5f5; border-bottom: 2px solid #f5f5f5;"></div>
        <div class="quadrangle-item" style="left: 8px; bottom: 8px; border-left: 2px solid #f5f5f5; border-bottom: 2px solid #f5f5f5;"></div>
        <span class="default-text">{{defaultText}}</span>
      </div>
    </slot>
  </div>
</template>

<script>

  export default {
    name: 'FuncCompContainer',
    props: {
      location: {
        type: String,
        default: ''
      },
      defaultText: {
        type: String,
        default: '将功能组件拖入这里'
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      funcCompContainerClick () {
        if(this.$slots.default) {

          // 下面这一段代码是为了解决点击同一个布局块，会刷新功能组件表单的问题
          if (this.$store.state.designer.rightSidebarFuncCompConfigFormName != this.$slots.default[0].componentOptions.tag + 'Form') {
            this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', this.$slots.default[0].componentOptions.tag + 'Form');
          }
        }
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
  .func-comp-container {
    width: 100%;
    height: 100%;
    word-break: break-all;
    word-wrap: break-word;
  }

  .default-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .default-container .quadrangle-item {
    position: absolute;
    width: 20px;
    height: 20px;
    opacity:0.5;
  }

  .default-container .default-text {
    font-size: 1em;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity:0.5;
    color: #f5f5f5;
  }
</style>
