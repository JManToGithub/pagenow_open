<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="基础配置" :style="{paddingTop: '10px'}">
        <Form :label-width="105">

          <FormItemPanel title="动画">
            <Alert class="m-l-10px" type="info" show-icon>保存并重载即可看到效果</Alert>
            <FormItem label="自动轮播">
              <i-switch v-model="autoplay">
                <span slot="open"></span>
                <span slot="close"></span>
              </i-switch>
            </FormItem>
            <FormItem label="轮播时间间隔">
              <InputNumber size="small" :max="10000" :min="1000" :step="1000" v-model="autoplayDelay"></InputNumber> 毫秒
            </FormItem>
          </FormItemPanel>

          <FormItemPanel title="描述配置">
            <FormItem label="背景色">
              <ColorPicker size="small" v-model="descBackgroundColor" alpha/>
            </FormItem>
            <FormItem label="字体大小">
              <InputNumber size="small" :max="10000" :min="1" v-model="descFontSize"></InputNumber> px
            </FormItem>
            <FormItem label="字体颜色">
              <ColorPicker size="small" v-model="descColor" alpha/>
            </FormItem>
            <FormItem label="内边距">
              <InputNumber size="small" :max="10000" :min="1" v-model="descPadding"></InputNumber> px
            </FormItem>
            <FormItem label="对齐方式">
              <Select size="small" v-model="descTextAlign">
                <Option v-for="item in $PnDict.textAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </FormItemPanel>

        </Form>
      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">

        <Upload :action="uploadAction" :data="{pageId: $PnUtil.getUrlParam('page_id')}"
                name="files" :on-success="imageUploadSuccessHandle" :show-upload-list="true">
          <Button size="small" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>

        <Button size="small" @click="uploadImageRecordModalVisible = true">从本地缓存选择</Button>

        <DatasourceState targetComp="SwiperImageComp"></DatasourceState>
      </TabPane>
    </Tabs>

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
    name: 'SwiperImageCompForm',
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
          let tmpResultObjData = this.$PnUtil.deepClone(this.ds_resultObj);
          tmpResultObjData.push({
            src: process.env.VUE_APP_BASEPATH + '/' + res.payload.relativePath,
            description: ''
          });
          this.$store.commit('designer/updateLayoutItem', {
            path: 'component.compConfigData.ds_resultObj',
            value: tmpResultObjData
          });
          this.$PnUtil.addImageToLocalStorage(res.payload.relativePath)
        }
      },
      uploadImageRecordOkHandle (relativePath) {
        let tmpResultObjData = this.$PnUtil.deepClone(this.ds_resultObj);
        tmpResultObjData.push({
          src: process.env.VUE_APP_BASEPATH + '/' + relativePath,
          description: ''
        });
        this.$store.commit('designer/updateLayoutItem', {
          path: 'component.compConfigData.ds_resultObj',
          value: tmpResultObjData
        });
      }
    },
    computed: {
      ...mapFields({

        autoplay: 'component.compConfigData.autoplay',
        autoplayDelay: 'component.compConfigData.autoplayDelay',
        effects: 'component.compConfigData.effects',

        descBackgroundColor: 'component.compConfigData.descBackgroundColor',
        descFontSize: 'component.compConfigData.descFontSize',
        descColor: 'component.compConfigData.descColor',
        descPadding: 'component.compConfigData.descPadding',
        descTextAlign: 'component.compConfigData.descTextAlign',

        ds_resultObj: 'component.compConfigData.ds_resultObj',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
