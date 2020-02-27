<!--抽屉组件底部栏-->

<template>
  <div class="drawer-footer">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'DrawerFooter',
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
  .drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
