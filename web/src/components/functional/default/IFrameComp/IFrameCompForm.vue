<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">

        <Form :label-width="105">
          <FormItem label="ID">
            <Input size="small" v-model="id" placeholder="对应iframe的id属性"/>
          </FormItem>
          <FormItem label="名称">
            <Input size="small" v-model="name" placeholder="对应iframe的name属性"/>
          </FormItem>

          <FormItem label="链接地址">
            <Input size="small" v-model="srcPathData" placeholder="" @on-blur="updateSrcPath"/>
          </FormItem>

          <FormItem label="宽度">
            <InputNumber class="m-r-5px" size="small" :max="10000" :min="0" :step="1" v-model="width"></InputNumber>
            <Select transfer size="small" v-model="widthPixelUnit" :style="{width: '60px'}">
              <Option v-for="item in $PnDict.pixelUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="高度">
            <InputNumber class="m-r-5px" size="small" :max="10000" :min="0" :step="1" v-model="height"></InputNumber>
            <Select transfer size="small" v-model="heightPixelUnit" :style="{width: '60px'}">
              <Option v-for="item in $PnDict.pixelUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="滚动条">
            <Select transfer size="small" v-model="scrolling">
              <Option v-for="item in $PnDict.iframeScrollings" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

        </Form>

      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="IFrameComp"></DatasourceState>
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
    name: 'IFrameCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {
        srcPathData: ''
      }
    },
    mounted() {
      if (this.srcPath) {
        this.srcPathData = this.srcPath
      }
    },
    methods: {
      updateSrcPath () {
        this.updateField('component.compConfigData.srcPath', this.srcPathData)
      }
    },
    computed: {
      ...mapFields({

        id: 'component.compConfigData.id',
        srcPath: 'component.compConfigData.srcPath',

        width: 'component.compConfigData.width',
        widthPixelUnit: 'component.compConfigData.widthPixelUnit',
        height: 'component.compConfigData.height',
        heightPixelUnit: 'component.compConfigData.heightPixelUnit',
        frameborder: 'component.compConfigData.frameborder',
        name: 'component.compConfigData.name',
        scrolling: 'component.compConfigData.scrolling',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
