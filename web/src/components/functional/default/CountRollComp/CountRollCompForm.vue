<template>
  <div class="">

    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">

        <Form :label-width="105">

          <FormItemPanel title="标题">
            <FormItem label="是否显示">
              <i-switch v-model="title.show">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>
            <FormItem label="显示位置">
              <Select transfer size="small" v-model="title.location">
                <Option v-for="item in locations" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" v-model="title.fontSize"></InputNumber> px
            </FormItem>
            <FormItem label="字体宽度">
              <Select transfer size="small" v-model="title.fontWeight">
                <Option v-for="item in $PnDict.fontWeights" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="title.color" alpha recommend/>
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="前缀">
            <FormItem label="是否显示">
              <i-switch v-model="prefix.show">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>

            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" v-model="prefix.fontSize"></InputNumber> px
            </FormItem>
            <FormItem label="字体宽度">
              <Select transfer size="small" v-model="prefix.fontWeight">
                <Option v-for="item in $PnDict.fontWeights" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="prefix.color" alpha recommend/>
            </FormItem>
            <FormItem label="文本">
              <Input size="small" v-model="prefix.text"/>
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="后缀">
            <FormItem label="是否显示">
              <i-switch v-model="suffix.show">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>

            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" v-model="suffix.fontSize"></InputNumber> px
            </FormItem>
            <FormItem label="字体宽度">
              <Select transfer size="small" v-model="suffix.fontWeight">
                <Option v-for="item in $PnDict.fontWeights" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="suffix.color" alpha recommend/>
            </FormItem>
            <FormItem label="文本">
              <Input size="small" v-model="suffix.text"/>
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="数字">
            <FormItem label="起始值">
              <InputNumber size="small" :max="10000" :min="0" v-model="count.startValue"></InputNumber>
            </FormItem>
            <FormItem label="自动播放">
              <i-switch v-model="count.autoPlay">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>
            <FormItem label="动画时长">
              <InputNumber size="small" :max="10000" :min="1000" :step="1000" v-model="count.duration"></InputNumber> 毫秒
            </FormItem>
            <FormItem label="小数位数">
              <InputNumber size="small" :max="3" :min="0" :step="1" v-model="count.decimals"></InputNumber> 位小数
            </FormItem>
            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" v-model="count.fontSize"></InputNumber> px
            </FormItem>
            <FormItem label="字体宽度">
              <Select transfer size="small" v-model="count.fontWeight">
                <Option v-for="item in $PnDict.fontWeights" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="count.color" alpha recommend/>
            </FormItem>
          </FormItemPanel>

        </Form>

      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="CountRollComp"></DatasourceState>
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
    name: 'CountRollCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {
        locations: [
          {
            label: '显示在数字上边',
            value: 'top'
          },
          {
            label: '显示在数字下边',
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

        title: 'component.compConfigData.title',
        prefix: 'component.compConfigData.prefix',
        suffix: 'component.compConfigData.suffix',
        count: 'component.compConfigData.count',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
