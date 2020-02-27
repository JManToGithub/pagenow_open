<template>
  <Header
      :style="{
            position: 'fixed',
            width: '100%',
            height: '48px',
            backgroundColor: '#424242',
            lineHeight: '48px',
            padding: '0 20px',
            zIndex: 66
          }" @click.stop.native="headerClickHandle">

    <h2 class="header-title" v-if="pageMetadata.id"><Icon type="md-browsers" style="display: inline-block; margin-top: -3px;"/> - {{pageMetadata.name}} </h2>

    <Tooltip transfer :content="'保存'" placement="bottom">
      <Button class="m-r-5px" size="small" type="primary"
            :disabled="!pageMetadata.id"
            @click="saveCurrentEditPage"><Icon custom="iconfont iconsave-fill"/></Button>
    </Tooltip>

    <Divider type="vertical"></Divider>

    <Tooltip transfer :content="'清空画布'" placement="bottom">
      <Button class="m-r-5px" size="small" type="primary"
            :disabled="!pageMetadata.id"
            @click="clearCanvas"><Icon custom="iconfont iconqingkong" size="13"/></Button>
    </Tooltip>

    <Tooltip transfer :content="'清空本地存储'" placement="bottom">
      <Button class="m-r-5px" size="small" type="primary"
            @click="clearLocalStorage"><Icon custom="iconfont iconqingkonghuancun"/></Button>
    </Tooltip>

    <Divider type="vertical"></Divider>


    <Tooltip transfer :content="'预览'" placement="bottom">
      <Button size="small" class="m-r-5px" type="primary"
            :disabled="!$store.state.designer.pageMetadata.id"
            @click="previewPage"><Icon custom="iconfont icondesktop"/></Button>
    </Tooltip>

    <Tooltip transfer :content="'发布'" placement="bottom">
      <Button size="small" type="primary"
              :disabled="!$store.state.designer.pageMetadata.id"
              @click="openReleasePageFormModal"><Icon custom="iconfont icon-send"/></Button>
    </Tooltip>

    <ReleasePageFormModal ref="releasePageFormModal"
                          :show="releasePageFormModalVisible"
                          @cancel="releasePageFormModalVisible = false"></ReleasePageFormModal>


  </Header>
</template>

<script>
  import ReleasePageFormModal from './common/ReleasePageFormModal';


  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'DesignerHeader',
    components: {
      ReleasePageFormModal
    },
    data() {
      return {
        releasePageFormModalVisible: false,
      }
    },
    mounted() {

    },
    methods: {

      headerClickHandle () {
        this.$EventBus.$emit('headerClick')
      },

      /**
       * 保存当前编辑页面
       */
      saveCurrentEditPage () {
        let page = Object.assign({}, this.pageMetadata);
        console.log(page);
        page.layout = JSON.stringify(page.layout);
        delete page.echartThemeJsonText;
        this.$PnApi.PageApi.updatePage(page).then(result => {
          if(result.data.success) {
            this.$Message.success('保存成功')
          }
        })
      },

      /**
       * 清空画布
       */
      clearCanvas () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认清空画布内容吗？',
          onOk: () => {
            this.$store.commit('designer/resetDesigner')
          }
        });
      },

      /**
       * 清空本地存储
       */
      clearLocalStorage () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认要清空本地存储吗？',
          onOk: () => {
            localStorage.clear();
            this.$Message.success('成功清空本地存储数据，建议重新刷新页面')
          }
        });
      },

      previewPage () {
        //console.log(this.pageMetadata);
        // 将当前工程信息和当前打开页面的源数据存入本地存储
        localStorage.setItem('previewProjectInfo', JSON.stringify(this.projectInfo));
        localStorage.setItem('previewPageMetadata', JSON.stringify(this.pageMetadata));
        this.$PnUtil.openPageToBlank(this.pageMetadata.path, {preview: 'true'})
      },

      openReleasePageFormModal () {
        this.releasePageFormModalVisible = !this.releasePageFormModalVisible;
        this.$refs['releasePageFormModal'].initialize(this.pageMetadata.id)
      }

    },
    computed: {
      ...mapFields({
        projectInfo: 'projectInfo',
        pageMetadata: 'pageMetadata'
      }),
    }
  }
</script>

<style scoped>
  .header-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fafafa;
  }
</style>
