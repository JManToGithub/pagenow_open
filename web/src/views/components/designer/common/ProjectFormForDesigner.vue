<template>
  <div class="project-form-for-designer">
    <Form :label-width="105">
      <FormItem label="工程名称">
        <Input size="small" v-model="name" disabled/>
      </FormItem>
      <FormItem label="备注">
        <Input size="small" v-model="remark" disabled/>
      </FormItem>
      <FormItem label="图表主题方案">
        <Select size="small" transfer v-model="echartThemeId" @on-change="echartThemeIdChangeHandle">
          <Option v-for="item in echartThemes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>

      <FormItem label="创建日期">
        <Input size="small" v-model="create_date" disabled/>
      </FormItem>

    </Form>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'ProjectFormForDesigner',
    data() {
      return {
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
    methods: {
      echartThemeIdChangeHandle (value) {
        this.$PnApi.ProjectApi.updateProjectEchartThemeId(this.id, value).then(result=>{
          if(result.data.success) {
            this.$Message.success('成功切换工程图表主题，刷新页面即可生效')
          }else {
            this.$Message.error('更新失败')
          }
        })
      }
    },
    computed: {
      ...mapFields({
        id: 'projectInfo.id',
        name: 'projectInfo.name',
        remark: 'projectInfo.remark',
        echartThemeId: 'projectInfo.echartThemeId',
        create_date: 'projectInfo.create_date'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
