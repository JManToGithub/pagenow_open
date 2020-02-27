<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import InitDbRoutes from './mixin/InitDbRoutes'
  import InitGlobalConfigData from './mixin/InitGlobalConfigData'

  export default {
    mixins: [InitDbRoutes, InitGlobalConfigData],
    data() {
      return {

      }
    },
    created() {},
    beforeMount() {},
    mounted() {},
    methods: {},
  }

</script>

<style lang="less">
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
