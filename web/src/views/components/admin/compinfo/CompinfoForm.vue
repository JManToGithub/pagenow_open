<template>
  <div class="">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="id" prop="id" hidden>
        <Input v-model="formData.id"/>
      </FormItem>
      <FormItem label="类别" prop="type_id">
        <Select transfer v-model="formData.type_id" clearable>
          <Option v-for="item in compinfoTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="组件文件名" prop="name">
        <Input v-model="formData.name" placeholder="请输入组件名称"/>
      </FormItem>
      <FormItem label="组件别名" prop="alias_name">
        <Input v-model="formData.alias_name" placeholder="请输入组件别名"/>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="formData.remark" />
      </FormItem>
      <FormItem label="激活" prop="enabled">
        <i-switch v-model="formData.enabled" true-value="1" false-value="0">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="缩略图URI" prop="thumbnail_uri">
        <Input v-model="formData.thumbnail_uri"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'CompinfoForm',
    props: {
      labelWidth: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        compinfoTypes: [],
        formData: {
          id: '',
          type_id: '',
          name: '',
          alias_name: '',
          remark: '',
          enabled: '0',
          thumbnail_uri: ''
        },
        ruleValidate: {
          type_id: [
            { required: true, message: '类别不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '组件名称不能为空', trigger: 'blur' }
          ],
          alias_name: [
            { required: true, message: '组件别名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {
      loadCompinfoTypes () {
        this.$PnApi.CompinfoApi.getCompinfoTypeByPage(1, 100000).then(result => {
          this.compinfoTypes = result.data.list
        })
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
