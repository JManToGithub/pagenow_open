<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">

        <Form :label-width="105">

          <FormItemPanel title="全局样式">
            <FormItem label="左边距">
              <InputNumber size="small" :min="1" :step="1" v-model="marginLeft"></InputNumber>
            </FormItem>
            <FormItem label="右边距">
              <InputNumber size="small" :min="1" :step="1" v-model="marginRight"></InputNumber>
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="进度条配置">
            <FormItem label="总值">
              <InputNumber size="small" :min="1" :step="1" v-model="totalSteps"></InputNumber>
            </FormItem>
            <FormItem label="起始颜色">
              <ColorPicker size="small" v-model="startColor" alpha recommend/>
            </FormItem>
            <FormItem label="结束颜色">
              <ColorPicker size="small" v-model="stopColor" alpha recommend/>
            </FormItem>
            <FormItem label="背景色">
              <ColorPicker size="small" v-model="innerStrokeColor" alpha recommend/>
            </FormItem>
            <FormItem label="宽度">
              <Slider :max="100" :min="1" v-model="stokeWidth" show-input></Slider>
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="提示文本">
            <FormItem label="显示">
              <i-switch v-model="showLabel">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>
            <FormItem label="位置">
              <Select transfer size="small" v-model="labelPosition" clearable>
                <Option v-for="item in labelPositions" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="前缀">
              <Input size="small" v-model="prefixText"/>
            </FormItem>
            <FormItem label="后缀">
              <Input size="small" v-model="suffixText"/>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="textColor" alpha recommend/>
            </FormItem>
          </FormItemPanel>


        </Form>

      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="ProgressBarComp"></DatasourceState>
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
    name: 'ProgressBarCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {
        labelPositions: [
          {
            label: '上',
            value: 'top'
          },
          {
            label: '右',
            value: 'right'
          },
          {
            label: '下',
            value: 'bottom'
          },
        ]
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({

        marginLeft: 'component.compConfigData.chartOption.marginLeft',
        marginRight: 'component.compConfigData.chartOption.marginRight',

        totalSteps: 'component.compConfigData.chartOption.totalSteps',
        stokeWidth: 'component.compConfigData.chartOption.stokeWidth',
        startColor: 'component.compConfigData.chartOption.startColor',
        stopColor: 'component.compConfigData.chartOption.stopColor',
        innerStrokeColor: 'component.compConfigData.chartOption.innerStrokeColor',

        showLabel: 'component.compConfigData.chartOption.showLabel',
        prefixText: 'component.compConfigData.chartOption.prefixText',
        suffixText: 'component.compConfigData.chartOption.suffixText',
        textColor: 'component.compConfigData.chartOption.textColor',
        labelPosition: 'component.compConfigData.chartOption.labelPosition',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
