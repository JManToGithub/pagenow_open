<template>
  <div class="">

    <Form :label-width="105">

      <FormItem label="表头背景色">
        <ColorPicker size="small" v-model="headerBackgroundColor" alpha recommend/>
      </FormItem>
      <FormItem label="表头字体颜色">
        <ColorPicker size="small" v-model="headerColor" alpha recommend/>
      </FormItem>
      <FormItem label="">
        <Button size="small" type="primary" @click="customJsCodeModalVisible = !customJsCodeModalVisible">自定义代码</Button>
      </FormItem>


    </Form>

    <Modal
        v-model="customJsCodeModalVisible"
        draggable
        scrollable
        title="自定义代码编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <CodeEditor v-model="customJsCode"></CodeEditor>
      <div slot="footer">
        <Button type="default" @click="customJsCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'ITableCompForm',
    data() {
      return {
        customJsCodeModalVisible: false
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        headerBackgroundColor: 'component.compConfigData.headerStyle.backgroundColor',
        headerColor: 'component.compConfigData.headerStyle.color',
        customJsCode: 'component.compConfigData.customJsCode',
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
