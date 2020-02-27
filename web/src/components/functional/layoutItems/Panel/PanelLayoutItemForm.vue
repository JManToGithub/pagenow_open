<!--已弃用-->
<template>
  <div class="">

    <Tabs size="small">
      <TabPane label="通用配置" :style="{paddingTop: '10px'}">
        <component :is="buildBaseLayoutItemFormName"></component>
      </TabPane>
      <TabPane label="标题布局块配置" :style="{paddingTop: '10px'}">
        <Form :label-width="105">

          <FormItemPanel title="主体容器配置">

            <FormItem label="背景色">
              <ColorPicker size="small" v-model="bodyBackgroundColor" alpha recommend/>
            </FormItem>
            <FormItem label="内边距">
              <InputNumber size="small" :max="10000" :min="1" v-model="bodyPadding"></InputNumber> px
            </FormItem>

          </FormItemPanel>

          <FormItemPanel title="标题配置">

            <FormItem label="底部边框宽度">
              <InputNumber size="small" :max="10000" :min="0" v-model="headerBorderBottomWidth"></InputNumber> px
            </FormItem>
            <FormItem label="底部边框颜色">
              <ColorPicker size="small" v-model="headerBorderBottomColor" alpha recommend/>
            </FormItem>
            <FormItem label="文本">
              <Input size="small" v-model="headerTitle"/>
            </FormItem>
            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerTitleFontSize"></InputNumber> px
            </FormItem>
            <FormItem label="文本行高">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerLineHeight"></InputNumber> px
            </FormItem>

            <FormItem label="高度">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerHeight"></InputNumber> px
            </FormItem>
            <FormItem label="背景色">
              <ColorPicker size="small" v-model="headerBackgroundColor" alpha recommend/>
            </FormItem>

            <FormItem label="内边距-上">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerPaddingTop"></InputNumber> px
            </FormItem>
            <FormItem label="内边距-右">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerPaddingRight"></InputNumber> px
            </FormItem>
            <FormItem label="内边距-下">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerPaddingBottom"></InputNumber> px
            </FormItem>
            <FormItem label="内边距-左">
              <InputNumber size="small" :max="10000" :min="1" v-model="headerPaddingLeft"></InputNumber> px
            </FormItem>

          </FormItemPanel>

        </Form>
      </TabPane>
    </Tabs>

  </div>
</template>

<script>

  import AbsoluteLayoutItemForm from '../../../../views/components/designer/absolute/AbsoluteLayoutItemForm'

  import LayoutItemFormMixin from '@/mixin/LayoutItemFormMixin'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'PanelLayoutItemForm',
    components: {
      AbsoluteLayoutItemForm
    },
    mixins: [LayoutItemFormMixin],
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        headerTitle: 'layoutItemConfigData.headerTitle',
        headerTitleFontSize: 'layoutItemConfigData.headerTitleFontSize',
        headerLineHeight: 'layoutItemConfigData.headerLineHeight',

        headerHeight: 'layoutItemConfigData.headerHeight',
        headerBackgroundColor: 'layoutItemConfigData.headerBackgroundColor',
        headerPaddingTop: 'layoutItemConfigData.headerPaddingTop',
        headerPaddingRight: 'layoutItemConfigData.headerPaddingRight',
        headerPaddingBottom: 'layoutItemConfigData.headerPaddingBottom',
        headerPaddingLeft: 'layoutItemConfigData.headerPaddingLeft',
        headerBorderBottomWidth: 'layoutItemConfigData.headerBorderBottomWidth',
        headerBorderBottomColor: 'layoutItemConfigData.headerBorderBottomColor',

        bodyBackgroundColor: 'layoutItemConfigData.bodyBackgroundColor',
        bodyPadding: 'layoutItemConfigData.bodyPadding',
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
