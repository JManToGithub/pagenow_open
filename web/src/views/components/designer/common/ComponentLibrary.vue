<template>
  <div :style="cssObj">
    <!--<Alert closable show-icon type="info" :style="{margin: '10px'}">
      操作提示：请先拖拽布局块至画布，之后单机需要操作的布局块，即可拖拽组件至激活的布局块中。
    </Alert>-->

    <Collapse simple :value="allComponentIds" :style="cssObj">
      <Panel name="default_panel">
        布局块
        <div slot="content">
          <Row :gutter="5">
            <i-col span="12">
              <div title="" class="comp-card" :data-component="'DefaultLayoutItem'">
                <img src="../../../../assets/image/thumbnail/DefaultLayoutItem.png"
                     style="width: 100%; height: 100%;" :onerror="defaultImg"/>
                <p>默认布局块</p>
              </div>
            </i-col>
          </Row>
        </div>
      </Panel>
      <Panel :name="lib.id" v-for="lib in componentLibrary" :key="lib.id">
        {{lib.name}}
        <div slot="content">
          <Row :gutter="5">
            <i-col span="8" v-for="compinfo in lib.compinfos" :key="compinfo.id">
              <Tooltip :disabled="!compinfo.remark" :transfer="true" :content="compinfo.remark" placement="top-start" :max-width="200">
                <div class="comp-card" :data-component="compinfo.name" >
                  <img :src="thumbnailPath(compinfo)"
                       style="width: 100%; height: 100%;" :onerror="defaultImg"/>
                  <p>{{compinfo.alias_name}}</p>
                </div>
                <!--<div class="api" slot="content">
                  <span>{{compinfo.remark}}</span>
                </div>-->
              </Tooltip>
            </i-col>

          </Row>
        </div>
      </Panel>

    </Collapse>
  </div>

</template>

<script>
  export default {
    name: 'ComponentLibrary',
    props: {
      cssObj: {
        type: Object
      }
    },
    data() {
      return {
        componentLibrary: [],
        allComponentIds: ['default_panel']
      }
    },
    mounted() {
      this.loadComponentLibrary().then(result => {
        this.registerComponentLibraryDrag()
      })
    },
    methods: {
      /**
       * 加载组件库数据
       */
      async loadComponentLibrary () {
        return await this.$PnApi.CompinfoApi.buildComponentLibrary().then(result=>{
          this.componentLibrary = result.data;
        })
      },
      registerComponentLibraryDrag () {
        if($('.comp-card').draggable()) {
          $('.comp-card').draggable('destroy');
        }
        $('.comp-card').draggable({
          zIndex: 999,
          revert: "invalid",
          helper: 'clone',
          containment: 'body',
          appendTo: 'body',
          scope: 'compCardScope'
        });
      },
      thumbnailPath (compinfo) {
        if (compinfo.thumbnail_uri) {
          try {
            return require('../../../../components/functional/'+compinfo.thumbnail_uri)
          }catch (e) {
            return ''
          }
        }else {
          return ''
        }
      },
    },
    computed: {
      defaultImg () {
        return 'this.src="'+require('@/assets/image/thumbnail/thumbnail-default.png')+'";this.onerror=null'
      }
    }
  }
</script>

<style scoped>

  .comp-card {
    width: 85px;
    height: 50px;
    background-color: #616161;
    border-radius: 4px;
    padding: 5px;
    cursor: move;
    word-break:break-all;
    margin-bottom: 5px;
    z-index: 999;
  }

  .comp-card img {
    border-radius: 4px;
  }
</style>
