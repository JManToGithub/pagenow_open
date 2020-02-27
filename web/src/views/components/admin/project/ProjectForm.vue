<template>
  <div class="project-form">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="id" prop="id" hidden>
        <Input v-model="formData.id"/>
      </FormItem>
      <FormItem label="工程名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入工程名称"/>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="formData.remark" />
      </FormItem>
      <FormItem label="图表主题" prop="echartThemeId">
        <Select transfer v-model="formData.echartThemeId">
          <Option v-for="item in echartThemes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'ProjectForm',
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
          echartThemeId: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '工程名称不能为空', trigger: 'blur' }
          ]
        },
        echartThemes: []
      }
    },
    mounted() {
      this.$PnApi.EchartThemeApi.getAllEchartTheme().then(result=>{
        result.data.forEach(item=>{
          this.echartThemes.push({
            label: item.name,
            value: item.id
          })
        })
      })
    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
