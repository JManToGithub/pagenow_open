<!--增量更新组件配置信息-->

<template>
  <div class="">
    <Form ref="form" :model="formData" :label-width="100" :rules="ruleValidate">
      <FormItem label="组件名称" prop="compName">
        <Select v-model="formData.compName" filterable>
          <Option v-for="item in funcCompNameObjs" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="更新字段名" prop="fieldName">
        <Input v-model="formData.fieldName"/>
      </FormItem>
      <FormItem label="字段类型" prop="fieldType">
        <Select v-model="formData.fieldType">
          <Option v-for="item in fieldTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="值"  prop="fieldValue">
        <Input v-if="formData.fieldType == 'String'" v-model="formData.fieldValue"/>
        <i-switch v-if="formData.fieldType == 'Boolean'" v-model="formData.fieldValue">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
        <InputNumber v-if="formData.fieldType == 'Number'"  :max="100000" :min="-100000" :step="1" v-model="formData.fieldValue"></InputNumber>
        <CodeEditor v-if="formData.fieldType == 'Object'" v-model="formData.fieldValue" mode="json"></CodeEditor>
      </FormItem>

    </Form>
  </div>
</template>

<script>
  export default {
    name: 'IncrementalUpdateForm',
    data() {
      return {
        loading: false,
        fieldTypes: [
          {
            label: '字符串',
            value: 'String'
          },
          {
            label: '布尔值',
            value: 'Boolean'
          },
          {
            label: '整数',
            value: 'Number'
          },
          {
            label: '对象',
            value: 'Object'
          }
        ],
        formData: {
          compName: '',
          fieldName: '',
          fieldType: 'String',
          fieldValue: ''
        },
        ruleValidate: {
          compName: [
            { required: true, message: '组件名称不能为空', trigger: 'blur' }
          ],
          fieldName: [
            { required: true, message: '更新字段名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      funcCompNameObjs () {
        let arr = [{
          label: '所有功能组件',
          value: 'allFuncComp'
        }];
        let funcCompNames = this.$PnUtil.getAllFuncCompName();
        funcCompNames.forEach(item => {
          arr.push({
            label: item,
            value: item
          })
        });
        return arr
      }
    },
    watch: {
      'formData.fieldType': {
        handler: function (val) {
          if (val == 'String') {
            this.formData.fieldValue = ''
          } else if (val == 'Boolean') {
            this.formData.fieldValue = false
          } else if (val == 'Number') {
            this.formData.fieldValue = 1
          } else if (val == 'Object') {
            this.formData.fieldValue = '{\n\n}'
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
