

<template>
  <div class="page-form-for-designer">
    <Form :label-width="105">
      <FormItem label="ID">
        <Input size="small" v-model="id" disabled/>
      </FormItem>

      <FormItem label="页面名称">
        <Input size="small" v-model="name"/>
      </FormItem>
      <FormItem label="页面路径">
        <Input size="small" v-model="path" disabled/>
      </FormItem>
      <FormItem label="备注">
        <Input size="small" v-model="remark"/>
      </FormItem>
      <FormItem label="创建日期">
        <Input size="small" v-model="create_date" disabled/>
      </FormItem>
      <FormItem label="关联组件">
        <Input size="small" v-model="component" disabled/>
      </FormItem>
      <FormItem label="独立主题">
        <i-switch v-model="ownEchartTheme" :true-value="'1'" :false-value="'0'">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="图表主题方案">
        <Select size="small" transfer v-model="echartThemeId">
          <Option v-for="item in echartThemes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="布局方案">
        <Select size="small" v-model="developCanvas" @on-change="developCanvasChangeHandle" disabled>
          <Option v-for="item in $PnDict.layoutSchemes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
    name: 'PageFormForDesigner',
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

      developCanvasChangeHandle (value) {
        this.$store.commit('designer/resetDesigner');

        if(value === 'AbsoluteLayoutCanvas') {
          this.$store.commit('designer/setLayoutConfigData',
            this.$PnDesigner.buildAbsoluteLayoutConfigData())
        }
      },

    },
    computed: {
      ...mapFields({
        id: 'pageMetadata.id',
        name: 'pageMetadata.name',
        path: 'pageMetadata.path',
        remark: 'pageMetadata.remark',
        create_date: 'pageMetadata.create_date',
        component: 'pageMetadata.component',
        developCanvas: 'pageMetadata.developCanvas',
        ownEchartTheme: 'pageMetadata.ownEchartTheme',
        echartThemeId: 'pageMetadata.echartThemeId'
      })
    },
    watch: {
      developCanvas: function (val) {
        if(val) {
          this.component = val.replace('Canvas', '');
        }
      }
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
