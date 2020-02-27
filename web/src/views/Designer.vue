<template>
  <div class="designer-container">
    <DesignerMain/>
  </div>
</template>

<script>
  import DesignerMain from './components/designer/DesignerMain'

  export default {
    name: 'Designer',
    components: {
      DesignerMain
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

  .designer-container {
    width: 100%;
    height: 100%;
  }

</style>
