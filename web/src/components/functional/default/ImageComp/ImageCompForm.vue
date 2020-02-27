<template>
  <div class="">
    <Form :label-width="105">
      <FormItem label="操作">
        <Upload :action="uploadAction" :data="{pageId: $PnUtil.getUrlParam('page_id')}"
                name="files" :on-success="imageUploadSuccessHandle" :show-upload-list="true">
          <Button class="m-r-5px" size="small" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="相对路径">
        <i-input size="small" v-model="relativePath">
          <Button slot="append" icon="md-close" @click="relativePath = ''"></Button>
        </i-input>
        <Button size="small" @click="uploadImageRecordModalVisible = true">从本地缓存选择</Button>
      </FormItem>
      <FormItem label="图片宽度">
        <Input size="small" v-model="width"/>
      </FormItem>
      <FormItem label="图片高度">
        <Input size="small" v-model="height"/>
      </FormItem>
    </Form>

    <UploadImageRecord :show="uploadImageRecordModalVisible"
                       @cancel="uploadImageRecordModalVisible = false"
                       @ok="uploadImageRecordOkHandle"></UploadImageRecord>

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
    name: 'ImageCompForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {
        uploadImageRecordModalVisible: false,
        uploadAction: process.env.VUE_APP_BASEPATH + '/file/upload',
      }
    },
    mounted() {

    },
    methods: {

      imageUploadSuccessHandle (res) {
        if(res.success) {
          this.relativePath = res.payload.relativePath;
          this.$PnUtil.addImageToLocalStorage(res.payload.relativePath)
        }
      },

      uploadImageRecordOkHandle (relativePath) {
        this.relativePath = relativePath;
        this.uploadImageRecordModalVisible = !this.uploadImageRecordModalVisible
      }
    },
    computed: {
      ...mapFields({
        relativePath: 'component.compConfigData.relativePath',
        width: 'component.compConfigData.width',
        height: 'component.compConfigData.height',
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }

</style>
