<template>
  <div class="">
    <component :is="buildBaseLayoutItemFormName"></component>
  </div>
</template>

<script>

  import LayoutItemFormMixin from '../../../../mixin/LayoutItemFormMixin'

  import AbsoluteLayoutItemForm from '../../../../views/components/designer/absolute/AbsoluteLayoutItemForm'

  export default {
    name: 'DefaultLayoutItemForm',
    mixins: [LayoutItemFormMixin],
    components: {
      AbsoluteLayoutItemForm
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      buildBaseLayoutItemFormName () {
        let pageMetadata = this.$store.state.designer.pageMetadata;
        if (pageMetadata.developCanvas == 'AbsoluteLayoutCanvas') {
          return 'AbsoluteLayoutItemForm'
        }
        return ''
      },
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
