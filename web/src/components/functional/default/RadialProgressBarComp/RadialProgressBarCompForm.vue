<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">

        <Alert type="info" show-icon>
          圆环直径由布局块宽度决定
        </Alert>
        <Form :label-width="105">

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
            <FormItem label="动画速度">
              <InputNumber size="small" :max="20000" :min="100" :step="100" v-model="animateSpeed"></InputNumber> 毫秒
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="提示文本">
            <FormItem label="显示">
              <i-switch v-model="showSuffixText">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>
            <FormItem label="后缀">
              <Input size="small" v-model="suffixText"/>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="textColor" alpha recommend/>
            </FormItem>
            <FormItem label="字体大小">
              <InputNumber size="small" :max="100" :min="1" v-model="textFontSize"></InputNumber> px
            </FormItem>
          </FormItemPanel>


        </Form>

      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="RadialProgressBarComp"></DatasourceState>
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
    name: 'RadialProgressBarCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({

        totalSteps: 'component.compConfigData.totalSteps',
        animateSpeed: 'component.compConfigData.animateSpeed',
        diameter: 'component.compConfigData.diameter',
        stokeWidth: 'component.compConfigData.stokeWidth',
        startColor: 'component.compConfigData.startColor',
        stopColor: 'component.compConfigData.stopColor',
        innerStrokeColor: 'component.compConfigData.innerStrokeColor',

        showSuffixText: 'component.compConfigData.showSuffixText',
        suffixText: 'component.compConfigData.suffixText',
        textColor: 'component.compConfigData.textColor',
        textFontSize: 'component.compConfigData.textFontSize',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
