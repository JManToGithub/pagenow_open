<!--本地图片缓存列表窗口-->

<template>
  <Modal
      v-model="visible"
      draggable
      scrollable
      title="本地图片缓存"
      width="1024"
      :mask="true"
      :z-index="999"
      @on-cancel="cancel"
      @on-visible-change="visibleChangeHandle">
    <div class="upload-image-record">
      <Alert v-if="images.length == 0" type="warning" show-icon>无本地缓存图片数据</Alert>
      <div v-if="images.length > 0" style="margin-bottom: 10px;">
        <Button size="small" type="error" @click="clearUploadImageRecord"><Icon type="md-trash" /> 清空本地图片缓存</Button>
      </div>
      <Row :gutter="10">
        <i-col span="4" v-for="(image, index) in images" :key="index">
          <div class="img-card"
               @click="imgCardClickHandle(image)">
            <img :src="imageSrc(image)" />
          </div>
          <div style="margin-bottom: 10px;"></div>
        </i-col>
      </Row>
    </div>
    <div slot="footer">
      <Button type="default" @click="cancel">关闭</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'UploadImageRecord',
    props: {
      show: Boolean
    },
    data() {
      return {
        visible: this.show,
        images: []
      }
    },
    mounted() {

      this.$EventBus.$on('uploadImageRecordChange', () => {
        this.initImages()
      })
    },
    methods: {
      initImages () {
        if (localStorage.getItem('uploadImageRecord')) {
          this.images = JSON.parse(localStorage.getItem('uploadImageRecord'))
        }
      },

      imageSrc (image) {
        return process.env.VUE_APP_BASEPATH + image.relativePath
      },
      imgCardClickHandle (image) {
        this.$emit('ok', image.relativePath);
      },
      clearUploadImageRecord () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认清空本地图片缓存吗？',
          onOk: () => {
            localStorage.setItem('uploadImageRecord', '[]');
            this.initImages()
          }
        });
      },

      cancel () {
        this.visible = false;
        this.$emit('cancel', this.visible)
      },
      visibleChangeHandle (val) {
        if (val == true) {
          this.initImages();
        }
      }
    },
    computed: {

    },
    watch: {
      show (val) {
        this.visible = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .upload-image-record {
    height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    margin: -16px;
  }
  .img-card {
    width: 100%;
    height: auto;
    background-color: #fafafa;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    padding: 8px 8px 3px 8px;
    &.active {
      border-color: #039be5;
      box-shadow: 0 0 10px #000;
    }
    &:hover {
      box-shadow: 0 0 10px #000;
    }
    img {
      width: 100%;
      height: 60px;
    }
  }
</style>
