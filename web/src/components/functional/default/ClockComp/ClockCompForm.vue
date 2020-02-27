<template>
  <div class="">
    <Form :label-width="105">
      <FormItem label="字体大小">
        <InputNumber size="small" :max="10000" :min="1" v-model="fontSize"></InputNumber> px
      </FormItem>
      <FormItem label="字体颜色">
        <ColorPicker size="small" v-model="color" alpha recommend/>
      </FormItem>
      <FormItem label="显示星期">
        <i-switch v-model="showWeek">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
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
    name: 'ClockCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({

        fontSize: 'component.compConfigData.fontSize',
        color: 'component.compConfigData.color',
        showWeek: 'component.compConfigData.showWeek',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
