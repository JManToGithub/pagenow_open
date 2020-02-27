<!--发布版绝对布局-->

<template>
  <div class="absolute-layout"
       :style="{
         width: layout.layoutConfigData.width + layout.layoutConfigData.widthPixelUnit,
         height: layout.layoutConfigData.height + layout.layoutConfigData.heightPixelUnit,
         backgroundColor: layout.layoutConfigData.backgroundColor,

         backgroundImage: layout.layoutConfigData.imageRelativePath ? 'url('+canvasBackgroundImageSrc+')': '',
         backgroundRepeat: layout.layoutConfigData.imageRelativePath ? layout.layoutConfigData.imageRepeat: '',
         backgroundSize: layout.layoutConfigData.imageRelativePath ? layout.layoutConfigData.imageSize: ''
       }">

    <div
        v-for="layoutItem in layout.layoutItems"
        :key="layoutItem.id">
      <div class="absolute-layout-item"
           :id="layoutItem.id"
           :data-id="layoutItem.id"
           :style="{
             width: layoutItem.layoutItemConfigData.width + 'px',
             height: layoutItem.layoutItemConfigData.height + 'px',
             left: layoutItem.layoutItemConfigData.left + 'px',
             top: layoutItem.layoutItemConfigData.top + 'px',
             zIndex: layoutItem.layoutItemConfigData.zIndex,
             display: layoutItem.layoutItemConfigData.display,

           }">
        <component :is="layoutItem.name" :layoutItem="layoutItem">
          <FuncCompContainerRelease>
            <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
          </FuncCompContainerRelease>
        </component>

      </div>
    </div>

  </div>
</template>

<script>
  import AbsoluteLayoutGlobalMixin from '@/mixin/AbsoluteLayoutGlobalMixin';
  import FuncCompContainerRelease from '../designer/common/FuncCompContainerRelease'

  import md5 from 'js-md5';

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'release/getField',
    mutationType: 'release/updateField',
  });

  export default {
    name: 'AbsoluteLayout',
    mixins: [AbsoluteLayoutGlobalMixin],
    components: {
      FuncCompContainerRelease
    },
    data() {
      return {
        layout: {
          layoutConfigData: {

          },
          layoutItems: []
        },
        password: ''
      }
    },
    created() {
      // 检查当前URL中是否有预览标识，如果有，则总浏览器本地存储中读取页面源数据信息进行预览
      if(this.$route.query.preview) {
        let previewProjectInfo = JSON.parse(localStorage.getItem('previewProjectInfo'));
        let previewPageMetadata = JSON.parse(localStorage.getItem('previewPageMetadata'));
        this.layout = previewPageMetadata.layout;
        this.$store.commit('release/setProjectInfo', previewProjectInfo);
        this.$store.commit('release/setPageMetadata', previewPageMetadata);
      }else {

        this.$PnApi.ReleaseApi.getReleaseData(this.$route.meta.id).then(result => {
          if (result.data.success) {
            let releaseData = result.data.payload;
            let dbPage = releaseData.pageMetadata;
            if (dbPage.encrypt == '1') {
              if (sessionStorage.getItem('pagePwd') && sessionStorage.getItem('pagePwd') == dbPage.password) {
                dbPage.layout = JSON.parse(dbPage.layout);
                this.layout = dbPage.layout;
                this.$store.commit('release/setPageMetadata', dbPage);
                this.$store.commit('release/setProjectInfo', releaseData.projectInfo);
              }else {
                this.$Modal.confirm({
                  render: (h) => {
                    return h('Input', {
                      props: {
                        type: 'password',
                        value: this.password,
                        autofocus: true,
                        placeholder: '请输入访问密码'
                      },
                      on: {
                        input: (val) => {
                          this.password = val;
                        }
                      }
                    })
                  },
                  onOk: () => {
                    if (md5(this.password) == dbPage.password) {
                      dbPage.layout = JSON.parse(dbPage.layout);
                      this.layout = dbPage.layout;
                      this.$store.commit('release/setPageMetadata', dbPage);
                      this.$store.commit('release/setProjectInfo', releaseData.projectInfo);

                      sessionStorage.setItem('pagePwd', dbPage.password);
                    }else {
                      this.$Message.error('密码错误，无法访问页面！');
                    }
                  }
                })
              }
            }else if (dbPage.encrypt == '0') {
              dbPage.layout = JSON.parse(dbPage.layout);
              this.layout = dbPage.layout;
              this.$store.commit('release/setPageMetadata', dbPage);
              this.$store.commit('release/setProjectInfo', releaseData.projectInfo);
            }

          }else {
            alert(result.data.message)
          }
        })
      }
    },
    mounted() {

    },
    methods: {


    },
    computed: {

    }
  }
</script>

<style scoped>
  .absolute-layout {
    position: relative;
  }

  .absolute-layout-item {
    position: absolute;
  }
</style>
