<!--数字滚动器-->

<template>
  <div class="count-roll-comp">
    <div v-if="component.compConfigData.title.location == 'top'"
         v-show="component.compConfigData.title.show"
         class="title-top"
         :style="{
           fontSize: component.compConfigData.title.fontSize + 'px',
           fontWeight: component.compConfigData.title.fontWeight,
           color: component.compConfigData.title.color,
         }">
      {{component.compConfigData.ds_resultObj[0].title}}
    </div>
    <div class="content">
      <!--前缀-->
      <span v-show="component.compConfigData.prefix.show"
            class="prefix"
            :style="{
              fontSize: component.compConfigData.prefix.fontSize + 'px',
              fontWeight: component.compConfigData.prefix.fontWeight,
              color: component.compConfigData.prefix.color,
            }">
        {{component.compConfigData.prefix.text}}
      </span>
      <!--数字-->
      <count-to :start-val="component.compConfigData.count.startValue"
                :end-val="runCustomFilter(component.compConfigData.ds_resultObj)[0].value"
                :duration="component.compConfigData.count.duration"
                :decimals="component.compConfigData.count.decimals"
                :autoplay="component.compConfigData.count.autoPlay"
                :style="{
                  fontSize: component.compConfigData.count.fontSize + 'px',
                  fontWeight: component.compConfigData.count.fontWeight,
                  color: component.compConfigData.count.color,
                }"></count-to>
      <!--后缀-->
      <span v-show="component.compConfigData.suffix.show"
            class="suffix"
            :style="{
              fontSize: component.compConfigData.suffix.fontSize + 'px',
              fontWeight: component.compConfigData.suffix.fontWeight,
              color: component.compConfigData.suffix.color,
            }">
        {{component.compConfigData.suffix.text}}
      </span>
    </div>
    <div v-if="component.compConfigData.title.location == 'bottom'"
         v-show="component.compConfigData.title.show"
         class="title-bottom"
         :style="{
           fontSize: component.compConfigData.title.fontSize,
           fontWeight: component.compConfigData.title.fontWeight,
           color: component.compConfigData.title.color,
         }">
      {{component.compConfigData.ds_resultObj[0].title}}
    </div>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'CountRollComp',
    components: { countTo },
    mixins: [FuncCompMixin],
    attr: {
      version: '1.1',
      configDataTemp: Object.assign({

        title: {
          show: true,
          fontSize: 17,
          fontWeight: 'bold',
          color: '#fff',
          location: 'top'
        },

        prefix: {
          show: true,
          fontSize: 45,
          fontWeight: 'bold',
          color: '#fff',
          text: '￥'
        },

        suffix: {
          show: true,
          fontSize: 15,
          fontWeight: 'bold',
          color: '#fff',
          text: 'rmb'
        },

        count: {
          startValue: 0,
          autoPlay: true,
          duration: 3000,
          decimals: 0,

          fontSize: 45,
          fontWeight: 'bold',
          color: '#2db7f5',
        },

      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'title',
            remark: '标题'
          },
          {
            field: 'value',
            remark: '值'
          }
        ],
        ds_resultObj: [
          {
            "title": '标题文本...',
            "value": 10000
          }
        ],
      }), PnDesigner.buildFuncCompGlobalField())
    },
    data() {
      return {

      }
    },
    mounted() {
      this.init();

    },
    methods: {
      init () {
        this.initDatasource(() => {

        }, (result) => {
          this.component.compConfigData.ds_resultObj = result.data;
        })
      },
    },
    computed: {}
  };

  export default _this
</script>

<style scoped>
  .count-roll-comp {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0px 10px 0px 10px;
  }

  .title-top {
    margin-bottom: -10px;
  }
  .title-bottom {
    margin-top: -10px;
  }

  .content {

  }
  .content .prefix {
    margin-left: -10px;
    margin-right: -10px;
  }
  .content .suffix {

  }
</style>
