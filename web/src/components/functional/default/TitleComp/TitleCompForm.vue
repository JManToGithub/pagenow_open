<template>
  <div class="">

    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">

        <Form :label-width="105">
          <FormItem label="标题文本">
            <Input size="small" v-model="text"/>
          </FormItem>

          <FormItemPanel title="文本样式">
            <FormItem label="颜色">
              <ColorPicker size="small" v-model="color" alpha recommend/>
            </FormItem>
            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" :step="1" v-model="fontSize"></InputNumber> px
            </FormItem>
            <FormItem label="字体粗细">
              <Select size="small" v-model="fontWeight" >
                <Option v-for="item in $PnDict.fontWeights" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="对齐方式">
              <Select size="small" v-model="textAlign" >
                <Option v-for="item in $PnDict.textAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="文字排列方式">
              <Select size="small" v-model="writingMode" >
                <Option v-for="item in $PnDict.writingModes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </FormItemPanel>

        </Form>

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
    name: 'TitleCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({

        text: 'component.compConfigData.text',
        color: 'component.compConfigData.color',
        fontSize: 'component.compConfigData.fontSize',
        fontWeight: 'component.compConfigData.fontWeight',
        textAlign: 'component.compConfigData.textAlign',
        writingMode: 'component.compConfigData.writingMode',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
