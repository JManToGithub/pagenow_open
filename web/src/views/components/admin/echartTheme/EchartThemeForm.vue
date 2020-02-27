<template>
  <div class="">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="id" prop="id" hidden>
        <Input v-model="formData.id"/>
      </FormItem>
      <FormItem label="主题名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入主题名称"/>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="formData.remark" />
      </FormItem>
      <FormItem label="主题JSON" prop="jsonText">
        <CodeEditor v-model="formData.jsonText" mode="json"></CodeEditor>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import CodeEditor from '../../../../components/common/CodeEditor'

  export default {
    name: 'EchartThemeForm',
    components: {
      CodeEditor
    },
    props: {
      labelWidth: {
        type: Number,
        default: 80
      }
    },
    data() {
      return {
        formData: {
          id: '',
          name: '',
          remark: '',
          jsonText: '',
          create_date: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '主题名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
