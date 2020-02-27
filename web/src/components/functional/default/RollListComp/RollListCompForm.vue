<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">
        <Form :label-width="105">
          <FormItem label="滚动速度">
            <Slider v-model="step" :max="5" :min="0.1" :step="0.1"></Slider>
          </FormItem>
          <FormItem label="滚动阈值">
            <InputNumber size="small" :max="100" :min="0" :step="1" v-model="limitMoveNum"></InputNumber> 条
            <br/><span class="color-red">当记录数达到多少条时启动滚动</span>
          </FormItem>
          <FormItem label="鼠标滑入暂停">
            <i-switch v-model="hoverStop">
              <span slot="open"></span>
              <span slot="close"></span>
            </i-switch>
          </FormItem>
          <FormItem label="滚动方向">
            <Select size="small" v-model="direction">
              <Option v-for="item in directions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItemPanel title="滚动项样式">
            <FormItem label="高度">
              <InputNumber size="small" :max="100" :min="0" :step="1" v-model="itemHeight"></InputNumber> px
            </FormItem>
            <FormItem label="行高">
              <InputNumber size="small" :max="100" :min="0" :step="1" v-model="itemLineHeight"></InputNumber> px
            </FormItem>
            <FormItem label="字体颜色">
              <ColorPicker size="small" v-model="itemColor" alpha recommend/>
            </FormItem>
            <FormItem label="内边距">
              <Input size="small" v-model="itemPadding"/>
            </FormItem>
            <FormItem label="奇数行背景色">
              <ColorPicker size="small" v-model="itemOddRowBackgroundColor" alpha recommend/>
            </FormItem>
            <FormItem label="偶数行背景色">
              <ColorPicker size="small" v-model="itemEvenRowBackgroundColor" alpha recommend/>
            </FormItem>

          </FormItemPanel>

        </Form>
      </TabPane>

      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="RollListComp"></DatasourceState>
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
    name: 'RollListCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {
        directions: [
          {
            label: '往上',
            value: 1
          },
          {
            label: '往下',
            value: 0
          },
        ]
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({

        step: 'component.compConfigData.step',
        limitMoveNum: 'component.compConfigData.limitMoveNum',
        hoverStop: 'component.compConfigData.hoverStop',
        direction: 'component.compConfigData.direction',

        itemHeight: 'component.compConfigData.itemHeight',
        itemColor: 'component.compConfigData.itemColor',
        itemLineHeight: 'component.compConfigData.itemLineHeight',
        itemPadding: 'component.compConfigData.itemPadding',
        itemOddRowBackgroundColor: 'component.compConfigData.itemOddRowBackgroundColor',
        itemEvenRowBackgroundColor: 'component.compConfigData.itemEvenRowBackgroundColor',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
