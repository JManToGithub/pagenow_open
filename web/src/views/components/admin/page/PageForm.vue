<template>
  <div class="page-form">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="页面名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入页面名称"/>
      </FormItem>
      <FormItem label="路径" prop="path">
        <i-input v-model="formData.path" placeholder="页面路径默认自动生成">
          <Button slot="append" @click="createPath">自动生成</Button>
        </i-input>
      </FormItem>
      <!--<FormItem label="关联组件">
        <Input v-model="formData.component" placeholder=""/>
      </FormItem>-->
      <FormItem label="布局方案" prop="developCanvas">
        <Select v-model="formData.developCanvas" @on-change="developCanvasChangeHandle">
          <Option v-for="item in $PnDict.layoutSchemes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formData.remark" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'PageForm',
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
          project_id: '',
          name: '',
          path: '',
          component: '',
          developCanvas: '',
          remark: '',
          ownEchartTheme: false,
          echartThemeId: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '页面名称不能为空', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '路径不能为空', trigger: 'blur' }
          ],
          developCanvas: [
            { required: true, message: '布局方案不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {
      createPath () {
        this.formData.path = '/' + this.$PnUtil.getTimestamp()
      },
      developCanvasChangeHandle (val) {
        if(val) {
          this.formData.component = val.replace('Canvas', '');
        }
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
