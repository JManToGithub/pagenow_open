<!--绝对布局画布配置表单-->
<template>
  <div class="absolute-layout-data-form">
    <Form :label-width="105">
      <FormItem label="背景色">
        <ColorPicker size="small" v-model="backgroundColor" alpha recommend/>
      </FormItem>
      <!--<FormItem label="同步页面背景色">
        <i-switch v-model="syncSetPageBgColor">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>-->
      <FormItem label="画布宽度">
        <InputNumber class="m-r-5px" size="small" :max="10000" :min="0" :step="1" v-model="width"></InputNumber>
        <Select size="small" v-model="widthPixelUnit" :style="{width: '60px'}">
          <Option v-for="item in $PnDict.pixelUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="画布高度">
        <InputNumber class="m-r-5px" size="small" :max="10000" :min="0" :step="1" v-model="height"></InputNumber>
        <Select size="small" v-model="heightPixelUnit" :style="{width: '60px'}">
          <Option v-for="item in $PnDict.pixelUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>

      <FormItemPanel title="背景图片">
        <Alert show-icon type="info" :style="{marginLeft: '10px'}" closable>设置背景图片将不再显示网格</Alert>
        <FormItem label="操作">
          <Upload :action="uploadAction" :data="{pageId: $PnUtil.getUrlParam('page_id')}"
                  name="files" :on-success="imageUploadSuccessHandle" :show-upload-list="true">
            <Button size="small" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
        <FormItem label="相对路径">
          <i-input size="small" v-model="imageRelativePath">
            <Button slot="append" icon="md-close" @click="imageRelativePath = ''"></Button>
          </i-input>
          <Button size="small" @click="uploadImageRecordModalVisible = true">从本地缓存选择</Button>
        </FormItem>
        <FormItem label="背景重复">
          <Select :transfer="true" size="small" v-model="imageRepeat">
            <Option v-for="item in $PnDict.backgroundRepeats" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="背景图尺寸">
          <Input size="small" v-model="imageSize" placeholder="参考CSS的background-size"/>
        </FormItem>
      </FormItemPanel>

    </Form>

    <UploadImageRecord :show="uploadImageRecordModalVisible"
                       @cancel="uploadImageRecordModalVisible = false"
                       @ok="uploadImageRecordOkHandle"></UploadImageRecord>
  </div>
</template>

<script>

  import UploadImageRecord from '../../../../components/common/UploadImageRecord'
  import FormItemPanel from '../../../../components/common/FormItemPanel'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'AbsoluteLayoutConfigDataForm',
    components: {
      UploadImageRecord,
      FormItemPanel
    },
    data() {
      return {
        uploadImageRecordModalVisible: false,
        uploadAction: process.env.VUE_APP_BASEPATH + '/file/upload'
      }
    },
    created () {

    },
    mounted() {

    },
    methods: {

      imageUploadSuccessHandle (res) {
        if(res.success) {
          this.imageRelativePath = res.payload.relativePath;
          this.$PnUtil.addImageToLocalStorage(res.payload.relativePath)
        }
      },

      uploadImageRecordOkHandle (relativePath) {
        this.imageRelativePath = relativePath
      }
    },
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        widthPixelUnit: 'pageMetadata.layout.layoutConfigData.widthPixelUnit',
        height: 'pageMetadata.layout.layoutConfigData.height',
        heightPixelUnit: 'pageMetadata.layout.layoutConfigData.heightPixelUnit',

        backgroundColor: 'pageMetadata.layout.layoutConfigData.backgroundColor',

        imageRelativePath: 'pageMetadata.layout.layoutConfigData.imageRelativePath',
        imageRepeat: 'pageMetadata.layout.layoutConfigData.imageRepeat',
        imageSize: 'pageMetadata.layout.layoutConfigData.imageSize',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
