<!--布局块数据编辑表单-->

<template>
  <div class="">

    <Collapse value="1">
      <Panel name="1">
        基本配置
        <div slot="content" >

          <Form :label-width="105">
            <FormItem label="ID">
              <i-input size="small" v-model="id" disabled>
                <Button title="复制" slot="append" v-clipboard="idClipOptions"><Icon type="md-copy" /></Button>
              </i-input>
            </FormItem>

            <FormItem label="布局块名称">
              <Input size="small" v-model="layoutItemAliasName" placeholder="定义此布局块的备注名称"/>
            </FormItem>

            <FormItem label="允许拖拽">
              <i-switch v-model="draggableEnabled">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>

            <FormItem label="宽度">
              <InputNumber size="small" :max="50000" :min="1" v-model="width"></InputNumber> px
            </FormItem>
            <FormItem label="高度">
              <InputNumber size="small" :max="50000" :min="1" v-model="height"></InputNumber> px
            </FormItem>
            <FormItem label="左偏移">
              <InputNumber size="small" :max="50000" :min="-50000" :step="1" v-model="left"></InputNumber> px
            </FormItem>
            <FormItem label="上偏移">
              <InputNumber size="small" :max="50000" :min="-50000" :step="1" v-model="top"></InputNumber> px
            </FormItem>

            <FormItem label="层级">
              <InputNumber size="small" :max="1000" :min="1" v-model="zIndex"></InputNumber>
            </FormItem>

            <FormItem label="是否显示">
              <Select transfer size="small" v-model="display">
                <Option v-for="item in $PnDict.display" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>

        </div>
      </Panel>
      <Panel name="2">
        样式配置
        <div slot="content">

          <Form :label-width="105">

            <FormItem label="背景颜色">
              <ColorPicker size="small" v-model="backgroundColor" alpha recommend/>
            </FormItem>

            <FormItem label="内边距">
              <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="padding"></InputNumber> px
            </FormItem>

            <FormItem label="鼠标滑入背景色">
              <ColorPicker size="small" v-model="backgroundColorHover" alpha recommend/>
            </FormItem>

            <FormItemPanel title="边框">
              <FormItem label="边框宽度">
                <InputNumber size="small" :max="10000" :min="0" :step="1" v-model="borderWidth"></InputNumber> px
              </FormItem>
              <FormItem label="边框类型">
                <Select size="small" v-model="borderStyle">
                  <Option v-for="item in $PnDict.borderStyles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="边框颜色">
                <ColorPicker size="small" v-model="borderColor" alpha recommend/>
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

            <FormItemPanel title="阴影">
              <FormItem label="内阴影">
                <i-switch v-model="boxShadowInset">
                  <span slot="open"></span>
                  <span slot="close"></span>
                </i-switch>
              </FormItem>
              <FormItem label="水平位移">
                <InputNumber size="small" :max="100" :min="-100" :step="1" v-model="boxShadowLeft"></InputNumber> px
              </FormItem>
              <FormItem label="垂直位移">
                <InputNumber size="small" :max="100" :min="-100" :step="1" v-model="boxShadowTop"></InputNumber> px
              </FormItem>
              <FormItem label="模糊半径">
                <InputNumber size="small" :max="100" :min="0" :step="1" v-model="boxShadowRadius"></InputNumber> px
              </FormItem>
              <FormItem label="阴影颜色">
                <ColorPicker size="small" v-model="boxShadowColor" alpha recommend/>
              </FormItem>
            </FormItemPanel>

          </Form>

        </div>
      </Panel>
    </Collapse>

  </div>
</template>

<script>

  import LayoutItemFormMixin from '../../../../mixin/LayoutItemFormMixin'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'AbsoluteLayoutItemForm',
    mixins: [LayoutItemFormMixin],
    data() {
      return {
        recordLocation: {
          flag: false,
          left: 0,
          top: 0
        },

      }
    },
    mounted() {

    },
    methods: {



    },
    computed: {
      ...mapFields({
        id: 'id',
        layoutItemName: 'name',
        layoutItemAliasName: 'aliasName',
        layoutItemConfigData: 'layoutItemConfigData',

        draggableEnabled: 'layoutItemConfigData.draggableEnabled',
        resizableEnabled: 'layoutItemConfigData.resizableEnabled',
        width: 'layoutItemConfigData.width',
        height: 'layoutItemConfigData.height',
        left: 'layoutItemConfigData.left',
        top: 'layoutItemConfigData.top',

        backgroundColor: 'layoutItemConfigData.backgroundColor',
        padding: 'layoutItemConfigData.padding',

        backgroundColorHover: 'layoutItemConfigData.backgroundColorHover',

        borderWidth: 'layoutItemConfigData.borderWidth',
        borderStyle: 'layoutItemConfigData.borderStyle',
        borderColor: 'layoutItemConfigData.borderColor',

        borderTopLeftRadius: 'layoutItemConfigData.borderTopLeftRadius',
        borderTopRightRadius: 'layoutItemConfigData.borderTopRightRadius',
        borderBottomLeftRadius: 'layoutItemConfigData.borderBottomLeftRadius',
        borderBottomRightRadius: 'layoutItemConfigData.borderBottomRightRadius',

        boxShadowInset: 'layoutItemConfigData.boxShadowInset',
        boxShadowLeft: 'layoutItemConfigData.boxShadowLeft',
        boxShadowTop: 'layoutItemConfigData.boxShadowTop',
        boxShadowRadius: 'layoutItemConfigData.boxShadowRadius',
        boxShadowColor: 'layoutItemConfigData.boxShadowColor',

        zIndex: 'layoutItemConfigData.zIndex',

        display: 'layoutItemConfigData.display',


        component: 'component',
        componentId: 'component.id',
        componentName: 'component.name',
        componentConfigData: 'component.compConfigData'
      }),
      idClipOptions () {
        return {
          value: this.id,
          success: () => {
            this.$Message.success('复制成功')
          },
          error: () => {
            this.$Message.error('复制失败')
          }
        }
      }
    },
    watch: {

    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
