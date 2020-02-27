<template>
  <div class="">

    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">
        <Form :label-width="105">

          <FormItem label="背景色">
            <ColorPicker size="small" v-model="backgroundColor" alpha recommend/>
          </FormItem>
          <FormItem label="文本">
            <Input size="small" v-model="text" />
          </FormItem>
          <FormItem label="字体颜色">
            <ColorPicker size="small" v-model="color" alpha recommend/>
          </FormItem>
          <FormItem label="字体大小">
            <InputNumber size="small" :max="10000" :min="1" v-model="fontSize"></InputNumber> px
          </FormItem>
          <FormItem label="行高">
            <InputNumber size="small" :max="10000" :min="1" v-model="lineHeight"></InputNumber> px
          </FormItem>
          <FormItem label="对齐方式">
            <Select transfer size="small" v-model="textAlign">
              <Option v-for="item in $PnDict.textAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItemPanel title="边框">
            <FormItem label="边框颜色">
              <ColorPicker size="small" v-model="borderColor" alpha recommend/>
            </FormItem>
            <FormItem label="边框宽度">
              <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="borderWidth"></InputNumber> px
            </FormItem>
            <FormItem label="边框类型">
              <Select size="small" v-model="borderStyle">
                <Option v-for="item in $PnDict.borderStyles" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="圆角-上左">
              <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="borderTopLeftRadius"></InputNumber> px
            </FormItem>
            <FormItem label="圆角-上右">
              <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="borderTopRightRadius"></InputNumber> px
            </FormItem>
            <FormItem label="圆角-下右">
              <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="borderBottomLeftRadius"></InputNumber> px
            </FormItem>
            <FormItem label="圆角-下左">
              <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="borderBottomRightRadius"></InputNumber> px
            </FormItem>
          </FormItemPanel>

        </Form>

      </TabPane>
      <TabPane label="交互" :style="{paddingTop: '10px'}">
        <Form :label-width="105">
          <FormItemPanel title="页面跳转">
            <Alert style="padding-right: 10px !important;" type="info" show-icon>开启URL跳转将覆盖鼠标单击事件功能</Alert>
            <FormItem label="开启URL跳转">
              <i-switch v-model="useLink">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>
            <FormItem label="跳转地址">
              <Input size="small" v-model="link" />
            </FormItem>
            <FormItem label="跳转方式">
              <Select transfer size="small" v-model="linkTarget">
                <Option v-for="item in $PnDict.targets" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </FormItemPanel>
          <FormItemPanel title="鼠标滑入滑出交互">
            <FormItem label="背景色">
              <ColorPicker size="small" v-model="backgroundColorHover" alpha recommend/>
            </FormItem>
            <FormItem label="文本色">
              <ColorPicker size="small" v-model="textColorHover" alpha recommend/>
            </FormItem>
            <FormItem label="文本阴影样式">
              <Input size="small" v-model="textShadowHover" placeholder="示例：0px 0px 5px #000"/>
            </FormItem>
          </FormItemPanel>
        </Form>
        <FormItemPanel title="鼠标单击事件">
          <CodeEditor v-model="clickHandleScriptData"
                    :on-blur="updateClickHandleScript"></CodeEditor>
        </FormItemPanel>
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
    name: 'CustomButtonCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {
        clickHandleScriptData: ''
      }
    },
    mounted() {
      this.clickHandleScriptData = this.clickHandleScript
    },
    methods: {

      updateClickHandleScript () {
        this.updateField('component.compConfigData.clickHandleScript', this.clickHandleScriptData)
      }

    },
    computed: {
      ...mapFields({

        backgroundColor: 'component.compConfigData.backgroundColor',

        borderWidth: 'component.compConfigData.borderWidth',
        borderColor: 'component.compConfigData.borderColor',
        borderStyle: 'component.compConfigData.borderStyle',

        borderTopLeftRadius: 'component.compConfigData.borderTopLeftRadius',
        borderTopRightRadius: 'component.compConfigData.borderTopRightRadius',
        borderBottomLeftRadius: 'component.compConfigData.borderBottomLeftRadius',
        borderBottomRightRadius: 'component.compConfigData.borderBottomRightRadius',

        text: 'component.compConfigData.text',
        fontSize: 'component.compConfigData.fontSize',
        color: 'component.compConfigData.color',
        textAlign: 'component.compConfigData.textAlign',
        lineHeight: 'component.compConfigData.lineHeight',

        backgroundColorHover: 'component.compConfigData.backgroundColorHover',
        textColorHover: 'component.compConfigData.textColorHover',
        textShadowHover: 'component.compConfigData.textShadowHover',

        useLink: 'component.compConfigData.useLink',
        link: 'component.compConfigData.link',
        linkTarget: 'component.compConfigData.linkTarget',

        clickHandleScript: 'component.compConfigData.clickHandleScript',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
