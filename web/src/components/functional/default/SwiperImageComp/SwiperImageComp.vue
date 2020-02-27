<!--轮播图片-->

<template>
  <div class="swiper-image-comp w-h-full">
    <div v-if="shade" class="shade"></div>
    <swiper ref="swiperImage" class="w-h-full" :options="swiperOption">
      <swiper-slide :class="'slide-'+index" v-for="(image, index) in component.compConfigData.ds_resultObj" :key="index">
        <img :src="image.src" class="w-h-full" :onerror="defaultImg"/>
        <div v-show="image.description" class="description"
             :style="{
               backgroundColor: component.compConfigData.descBackgroundColor,
               fontSize: component.compConfigData.descFontSize + 'px',
               color: component.compConfigData.descColor,
               padding: component.compConfigData.descPadding + 'px',
               textAlign: component.compConfigData.descTextAlign,
             }">{{image.description}}</div>
      </swiper-slide>
      <!--<swiper-slide class="slide-2">
        <img src="http://localhost:8090/static/file/10601859.jpg" class="w-h-full"/>
      </swiper-slide>
      <swiper-slide class="slide-3">
        <img src="http://localhost:8090/static/file/42554420.jpg" class="w-h-full"/>
      </swiper-slide>-->
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  /* eslint-disable vue/no-unused-components */

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'SwiperImageComp',
    mixins: [FuncCompMixin],
    components: {
      swiper,
      swiperSlide
    },
    attr: {
      version: '1.2',
      configDataTemp: Object.assign({

        autoplay: false, // 自动轮播
        autoplayDelay: 3000, // 自动轮播时间间隔

        descBackgroundColor: 'rgba(0,0,0,0.3)',
        descFontSize: 14,
        descColor: '#fff',
        descPadding: 10,
        descTextAlign: 'left',

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'src',
            remark: '图片路径'
          },
          {
            field: 'description',
            remark: '图片描述'
          },
        ],
        ds_resultObj: [
          {
            src: '',
            description: '默认图片'
          },
        ],
      }), PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {

      }
    },
    mounted() {

      this.init()

    },
    methods: {
      init () {
        this.initDatasource(() => {
          setTimeout(()=>{
            this.swiperImage.update();
          }, 250);

        }, (result) => {
          this.component.compConfigData.images = result.data;
          setTimeout(()=>{
            this.swiperImage.update();
          }, 250);

        })
      },
    },
    computed: {
      swiperOption () {
        let option = {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        };
        if (this.component.compConfigData.autoplay) {
          option.autoplay = {
            delay: this.component.compConfigData.autoplayDelay,
          }
        }
        return option
      },
      swiperImage () {
        return this.$refs.swiperImage.swiper
      }
    }
  };

  export default _this
</script>

<style scoped>
  .swiper-image-comp {
    position: relative;
  }
  .description {
    position: absolute;
    z-index: 3;
    left: 0px;
    top: 0px;
    width: 100%;
    height: auto;
  }
</style>
