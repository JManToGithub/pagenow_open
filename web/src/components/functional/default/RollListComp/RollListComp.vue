<!--滚动列表-->

<template>
  <div class="roll-list-comp" v-resize="resizeHandle">

    <vue-seamless-scroll ref="seamlessWarp" :class-option="classOption" :data="component.compConfigData.ds_resultObj" class="seamless-warp">
      <ul>
        <li v-for="(item, index) in component.compConfigData.ds_resultObj" :key="index"
            :style="{
              height: component.compConfigData.itemHeight + 'px',
              color: component.compConfigData.itemColor,
              lineHeight: component.compConfigData.itemLineHeight + 'px',
              padding: component.compConfigData.itemPadding,
              backgroundColor: index%2==0 ? component.compConfigData.itemEvenRowBackgroundColor : component.compConfigData.itemOddRowBackgroundColor
            }">
          <span v-text="item.value"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>

</template>

<script>

  import Vue from 'vue'
  import scroll from 'vue-seamless-scroll'
  Vue.use(scroll);

  import FuncCompMixin from '@/mixin/FuncCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  const _this = {
    name: 'RollListComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.1',
      configDataTemp: Object.assign({

        step: 0.5,
        limitMoveNum: 6,
        hoverStop: false,
        direction: 1, // 方向：0往下，1往上

        itemHeight: 40,
        itemColor: '#fff',
        itemLineHeight: 40,
        itemPadding: '0px 10px 0px 10px',
        itemOddRowBackgroundColor: '#003A51',
        itemEvenRowBackgroundColor: '#092633',


      }, PnDesigner.buildFuncCompDatasourceField({
        ds_resultObjTemplate: [
          {
            field: 'value',
            remark: '文本值'
          }
        ],
        ds_resultObj: [
          {
            "value": "滚动列表第一行数据"
          },
          {
            "value": "滚动列表第二行数据"
          },
          {
            "value": "滚动列表第三行数据"
          },
          {
            "value": "滚动列表第四行数据"
          },
          {
            "value": "滚动列表第五行数据"
          },
          {
            "value": "滚动列表第六行数据"
          },
          {
            "value": "滚动列表第七行数据"
          },
          {
            "value": "滚动列表第八行数据"
          }
        ],
      }))
    },
    data() {
      return {

      }
    },
    mounted() {
      this.init();

    },
    methods: {
      resizeHandle () {
        $(this.$refs.seamlessWarp.$el).find('div').css('width', '100%')
      },

      init () {

        this.initDatasource(() => {

        }, (result) => {
          this.component.compConfigData.ds_resultObj = result.data;
        })
      },
    },
    computed: {
      classOption () {
        return {
          step: this.component.compConfigData.step,
          limitMoveNum: this.component.compConfigData.limitMoveNum,
          hoverStop: this.component.compConfigData.hoverStop,
          direction: this.component.compConfigData.direction,
        }
      }
    }
  };

  export default _this
</script>

<style scoped>
  .roll-list-comp {
    width: 100%;
    height: 100%;
  }

  .seamless-warp {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

</style>
