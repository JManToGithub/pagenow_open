<template>
  <div class="">
    <Form :label-width="105">

      <FormItem label="标题">
        <Input size="small" v-model="title"/>
      </FormItem>

    </Form>
  </div>
</template>

<script>

  import FuncCompFormMixin from '@/mixin/FuncCompFormMixin'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'TemplateForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({

        title: 'component.compConfigData.title',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
