<template>
  <div class="form-item-panel" :style="Object.assign({marginTop: title ? '' : '10px'}, cssObj)">
    <Divider v-if="title" orientation="left">{{title}}</Divider>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'FormItemPanel',
    props: {
      title: {
        type: String
      },
      cssObj: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>
  .ivu-divider {
    position: absolute;
    margin: 0px 0px !important;
    top: -25px;
    left: 0px;
  }
  .ivu-divider >>> .ivu-divider-inner-text {
    font-size: 13px;
    color: #515a6e;
  }
  .form-item-panel {
    position: relative;
    padding: 10px 10px 10px 10px;
    background-color: #EEEEEE;
    border: 1px solid #CCCCCC;
    margin: 25px 0px 10px 0px;
    border-radius: 4px;
  }

</style>
