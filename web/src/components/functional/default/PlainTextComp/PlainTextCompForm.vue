<template>
  <div class="">

    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">

        <Form :label-width="105">

          <FormItem label="组件ID">
            <Input size="small" v-model="id" disabled/>
          </FormItem>
          <FormItem label="容器背景色">
            <ColorPicker size="small" v-model="backgroundColor" alpha recommend/>
          </FormItem>


          <FormItem label="字体颜色">
            <ColorPicker size="small" v-model="color" alpha recommend/>
          </FormItem>
          <FormItem label="字体大小">
            <InputNumber size="small" :max="1000" :min="1" v-model="fontSize"></InputNumber> px
          </FormItem>

          <FormItem label="字体粗细">
            <Select transfer size="small" v-model="fontWeight">
              <Option v-for="item in $PnDict.fontWeights" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="行高">
            <InputNumber size="small" :max="1000" :min="1" v-model="lineHeight"></InputNumber> px
          </FormItem>
          <FormItem label="对齐方式">
            <Select transfer size="small" v-model="textAlign">
              <Option v-for="item in $PnDict.textAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="首行缩进">
            <InputNumber size="small" :max="1000" :min="1" v-model="textIndent"></InputNumber> px
          </FormItem>
          <FormItem label="滚动条">
            <Select transfer size="small" v-model="overflow">
              <Option v-for="item in $PnDict.overflows" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="透明度">
            <InputNumber size="small" :max="1" :min="0.1" :step="0.1" v-model="opacity"></InputNumber>
          </FormItem>

          <FormItem label="悬浮文本">
            <Input size="small" v-model="title"/>
          </FormItem>

        </Form>

      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="PlainTextComp"></DatasourceState>
      </TabPane>
    </Tabs>


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
    name: 'PlainTextCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      ...mapFields({

        text: 'component.compConfigData.text',
        title: 'component.compConfigData.title',

        backgroundColor: 'component.compConfigData.backgroundColor',

        fontSize: 'component.compConfigData.fontSize',
        color: 'component.compConfigData.color',
        fontWeight: 'component.compConfigData.fontWeight',
        lineHeight: 'component.compConfigData.lineHeight',
        textAlign: 'component.compConfigData.textAlign',
        textIndent: 'component.compConfigData.textIndent',
        overflow: 'component.compConfigData.overflow',
        opacity: 'component.compConfigData.opacity',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
