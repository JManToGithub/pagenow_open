<!--设计器主控件-->

<template>
  <div class="designer-main">
    <Layout>
      <!--顶部栏，固定布局-->
      <DesignerHeader></DesignerHeader>

      <Layout :style="{paddingTop: '48px'}">

        <!--组件库模态窗，收起左侧边栏时弹出-->
        <Modal title="组件库"
               draggable
               footer-hide
               width="300"
               :z-index="999"
               v-model="leftSidebarCollapsed"
               @on-cancel="collapsedLeftSidebar">
          <p slot="header">
            <span>组件库</span>
          </p>
          <div style="margin: -16px;">
            <ComponentLibrary :cssObj="{borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'}"></ComponentLibrary>
          </div>

        </Modal>

        <!--左侧边栏-->
        <Sider ref="leftSidebar"
               :width="300"
               hide-trigger
               collapsible
               collapsed-width="1"
               v-model="leftSidebarCollapsed"
               :style="{
                 backgroundColor: '#FFF',
                 borderRight: '1px solid #999',
                 position: 'fixed',
                 height: 'calc(100% - 48px)',
                 left: 0,
                 overflow: 'auto',
                 zIndex: 2
               }" @click.stop.native="leftSidebarClickHandle">
          <div title="收展左侧边栏" class="left-sidebar-collapse-btn" :class="{active: leftSidebarCollapsed}" @click.stop="collapsedLeftSidebar">
            <Icon :type="leftSidebarCollapsed ? 'md-arrow-dropright': 'md-arrow-dropleft'" />
          </div>

          <Tabs size="small" value="project_tab">
            <TabPane label="工程信息" name="project_tab" :style="{padding: '10px 10px 0px 10px'}">
              <div>
                <Button size="small" type="primary" style="margin-right: 5px;"
                        @click="createPageDrawerVisible = !createPageDrawerVisible" icon="md-add">新建页面</Button>

                <Drawer
                    title="新建页面"
                    v-model="createPageDrawerVisible"
                    width="450"
                    :mask-closable="false">
                  <PageForm ref="pageForm"></PageForm>
                  <DrawerFooter>
                    <Button style="margin-right: 8px" @click="createPageDrawerVisible = false">关闭</Button>
                    <Button type="primary" @click="submitPageForm">保存</Button>
                  </DrawerFooter>
                </Drawer>
              </div>
              <Divider/>
              <Tree :data="pageTreeData" @on-select-change="pageTreeSelectChangeHandle"></Tree>
            </TabPane>
            <TabPane label="组件库" name="comp_tab"
                     :style="{
                           paddingTop: '-15px',
                           width: '100%',
                           height: '100%',
                           position: 'relative',
                           marginTop: '-1px'
                         }">
              <ComponentLibrary ></ComponentLibrary>
            </TabPane>
          </Tabs>

        </Sider>

        <!--中间内容区-->
        <Content
            :style="{
              marginRight: contentMarginRight,
              marginLeft: contentMarginLeft,
              height: 'calc(100% - 48px)',
              padding: '0px',
              backgroundColor: '#B0B0B0'
            }">
          <div :style="{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                backgroundColor: '#DDDDDD',
               }">
            <h1 class="none-message" v-if="!pageMetadata.developCanvas" style="text-align: center; opacity: 0.7; margin-top: 100px;">请从工程信息树中，选择一个页面进行编辑。</h1>
            <component ref="targetComp" :is="pageMetadata.developCanvas"></component>
          </div>
        </Content>


        <!--右侧边栏，固定布局-->
        <Sider ref="rightSidebar"
               :width="330"
               hide-trigger
               collapsible
               collapsed-width="1"
               v-model="rightSidebarCollapsed"
               :style="{
                 backgroundColor: '#FFF',
                 borderLeft: '1px solid #999',
                 position: 'fixed',
                 height: 'calc(100% - 48px)',
                 right: 0,
                 overflow: 'auto',
                 zIndex: 4
               }" @click.stop.native="rightSidebarClickHandle">
          <div title="收展右侧边栏" class="right-sidebar-collapse-btn" :class="{active: rightSidebarCollapsed}" @click.stop="collapsedRightSidebar">
            <Icon :type="rightSidebarCollapsed ? 'md-arrow-dropleft': 'md-arrow-dropright'" />
          </div>

          <Tabs size="small" v-model="rightTabActived">
            <TabPane label="主要配置" name="setting_tab" :style="{padding: '0px', marginTop: '-1px'}">
              <Collapse simple v-model="rightTabCollapseActived">
                <Panel name="layoutItem_config">
                  <span style="font-weight: bold;">[ 布局块配置 ]</span>
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarLayoutItemConfigFormName"></component>
                  </p>
                </Panel>
                <Panel name="comp_config">
                  <span style="font-weight: bold;">
                    [ 功能组件配置 ]
                    <Tag style="position: absolute; right: 5px; top: 6px;" v-if="currentCompVersion" color="default">v{{currentCompVersion}}</Tag>
                  </span>
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarFuncCompConfigFormName"></component>
                  </p>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane label="其他配置" name="other_setting_tab" :style="{padding: '0px', marginTop: '-1px'}">
              <Collapse simple value="canvas_config">
                <Panel name="project_config">
                  <span style="font-weight: bold;">[ 工程配置 ]</span>
                  <p slot="content">
                    <component :is="'ProjectFormForDesigner'"></component>
                  </p>
                </Panel>
                <Panel name="page_config">
                  <span style="font-weight: bold;">[ 页面配置 ]</span>
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarPageConfigFormName"></component>
                  </p>
                </Panel>
                <Panel name="canvas_config">
                  <span style="font-weight: bold;">[ 画布配置 ]</span>
                  <p slot="content">
                    <component :is="canvasConfigCompName"></component>
                  </p>
                </Panel>
              </Collapse>
            </TabPane>
            <!--<TabPane v-show="structureTreeTabPaneVisible" :label="structureTreeTabPaneLabel" name="structure_tree_tab" :style="{padding: '0px'}">
              <StructureTreeTable></StructureTreeTable>
            </TabPane>-->
          </Tabs>

        </Sider>


        <DesignerFooter ref="designerFooter"></DesignerFooter>
      </Layout>
    </Layout>


  </div>
</template>

<script>
  import DesignerHeader from './DesignerHeader'
  import DesignerFooter from './DesignerFooter'
  import ComponentLibrary from './common/ComponentLibrary'
  import PageForm from '../admin/page/PageForm'
  import AbsoluteLayoutConfigDataForm from './absolute/AbsoluteLayoutConfigDataForm'
  import UploadImageRecord from '../../../components/common/UploadImageRecord'
  import AbsoluteLayoutCanvas from './absolute/AbsoluteLayoutCanvas'
  import ProjectFormForDesigner from './common/ProjectFormForDesigner'
  import PageFormForDesigner from './common/PageFormForDesigner'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'DesignerMain',
    components: {
      DesignerHeader,
      DesignerFooter,
      ComponentLibrary,
      PageForm,
      AbsoluteLayoutConfigDataForm,
      UploadImageRecord,
      AbsoluteLayoutCanvas,
      ProjectFormForDesigner,
      PageFormForDesigner
    },
    data() {
      return {
        leftSidebarCollapsed: false,
        rightSidebarCollapsed: false,
        contentMarginLeft: '300px',
        contentMarginRight: '330px',

        leftSidebarSplit: 0.5,

        createPageDrawerVisible: false,

        pageTreeData: [], // 左侧边栏页面信息树
        currentSelectPageId: '', // 当前选中页面的ID

        rightTabActived: 'setting_tab',
        rightTabCollapseActived: ['layoutItem_config', 'comp_config'],

        currentCompVersion: '', // 当前配置组件的版本号
      }
    },
    /**
     * 初始化加载顺序：
     * 1、先根据当前设计器路径的URL参数project_id获取工程信息
     * 2、判断工程是否设置了全局的图表主题，如果设置了，那么加载对应的主题JSON数据存储在vuex中
     * 3、初始化左侧边栏的工程页面树
     * 4、加载组件库数据
     */
    mounted() {

      this.loadProjectInfo().then(()=>{
        this.initEchartThemeJsonText();
        this.initPageTreeData();
      });

      this.initAllCompinfoToStorage();

      if (this.$route.query['page_id']) {
        this.openPageToDesigner(this.$route.query['page_id']);
      }

    },
    methods: {

      collapsedLeftSidebar () {
        this.$refs.leftSidebar.toggleCollapse();
        if(this.leftSidebarCollapsed) {
          this.contentMarginLeft = '0px';
          this.$refs.designerFooter.$el.style.paddingLeft = '10px'
        }else {
          this.contentMarginLeft = '300px';
          this.$refs.designerFooter.$el.style.paddingLeft = '310px'
        }
        this.$EventBus.$emit('leftSidebarClick')
      },

      collapsedRightSidebar () {
        this.$refs.rightSidebar.toggleCollapse();
        if(this.rightSidebarCollapsed) {
          this.contentMarginRight = '0px';
          this.$refs.designerFooter.$el.style.paddingRight = '10px'
        }else {
          this.contentMarginRight = '330px';
          this.$refs.designerFooter.$el.style.paddingRight = '340px'
        }
        this.$EventBus.$emit('rightSidebarClick')
      },

      closeStructureTreeModal () {
        this.structureTreeTabPaneVisible = true;
        this.structureTreeModalVisible = false
      },

      leftSidebarClickHandle () {
        this.$EventBus.$emit('leftSidebarClick')
      },

      rightSidebarClickHandle () {
        this.$EventBus.$emit('rightSidebarClick')
      },

      /**
       * 加载工程信息并存入vuex
       */
      async loadProjectInfo () {
        return await this.$PnApi.ProjectApi.getProjectById(this.$route.query.project_id).then(result=>{
          this.$store.commit('designer/setProjectInfo', result.data);
        })
      },

      /**
       * 初始化加载所有组件的缩略图信息保存至本地存储，目的是为了在设计器结构树中，获取对应组件的缩略图
       */
      initAllCompinfoToStorage () {
        this.$PnApi.CompinfoApi.getAllCompinfo().then(result => {
          let obj = {};
          result.data.forEach(item => {
            obj[item.name] = {
              alias_name: item.alias_name,
              thumbnail_uri: item.thumbnail_uri
            }
          });
          localStorage.setItem('allCompinfoObj', JSON.stringify(obj))
        })
      },

      /**
       * 初始化工程信息中的主题JSON数据并存储vuex
       */
      initEchartThemeJsonText () {
        let tmpProjectInfo = Object.assign({}, this.projectInfo);
        if(tmpProjectInfo.echartThemeId) {
          this.$PnApi.EchartThemeApi.getEchartThemeById(tmpProjectInfo.echartThemeId).then(result=>{
            let tmpEchartTheme = result.data;
            tmpProjectInfo.echartThemeJsonText = tmpEchartTheme.jsonText;
            this.$store.commit('designer/setProjectInfo', tmpProjectInfo);
          });
        }
      },

      /**
       * 初始化页面信息树数据
       */
      initPageTreeData () {

        this.pageTreeData = [
          {
            key: this.projectInfo.id,
            title: this.projectInfo.name,
            expand: true,
            disabled: true,
            children: []
          }
        ];

        this.$PnApi.PageApi.getPagesByProjectId(this.projectInfo.id).then(result => {
          let pages = result.data;
          if(pages.length > 0) {
            pages.forEach(item => {
              let page = {
                key: item.id,
                title: item.name,
                render: (h, {root, node, data}) => {
                  return h('span', [
                    h('Icon', {
                      props: {
                        type: 'md-browsers'
                      }
                    }),
                    h('span', {
                      style: {
                        marginRight: '3px',
                        color: this.pageMetadata.id == item.id ? '#2b85e4 ': '',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.openPageToDesigner(data.key)
                        }
                      }
                    }, '--('+data.title+')--'),

                    // h('a', {
                    //   attrs: {title: '打开'},
                    //   on: {
                    //     click: () => {
                    //       this.openPageToDesigner(data.key)
                    //     }
                    //   }
                    // }, [
                    //   h('Icon', {
                    //     props: {
                    //       type: 'md-build',
                    //     }
                    //   })
                    // ]),
                    // h('a', {
                    //   attrs: {title: '拷贝'},
                    //   on: {
                    //     click: () => {
                    //       this.copyPage(data.key)
                    //     }
                    //   }
                    // }, [
                    //   h('Icon', {
                    //     props: {
                    //       type: 'md-copy'
                    //     }
                    //   })
                    // ]),
                    h('a', {
                      attrs: {title: '删除'},
                      style: {
                        color: '#ed4014'
                      },
                      on: {
                        click: () => {
                          this.deletePage(data.key)
                        }
                      }
                    }, [
                      h('Icon', {
                        props: {
                          type: 'md-trash'
                        }
                      })
                    ])
                  ])
                }
              };
              this.pageTreeData[0].children.push(page)
            });
          }
        })

      },

      submitPageForm () {
        this.$refs.pageForm.$refs.form.validate((valid) => {
          if (valid) {
            let pageFormData = this.$refs.pageForm.formData;
            pageFormData.project_id = this.$route.query.project_id; // 赋值工程ID

            let layout = {
              id: this.$PnUtil.uuid(),
              layoutConfigData: {},
              layoutItems: []
            };
            if (pageFormData.developCanvas === 'AbsoluteLayoutCanvas') {
              layout.layoutConfigData = this.$PnDesigner.buildAbsoluteLayoutConfigData()
            }

            pageFormData.layout = JSON.stringify(layout);

            this.$PnApi.PageApi.savePage(pageFormData).then((result)=>{
              if(result.data.success) {
                //this.$Message.success('保存成功');
                this.$refs.pageForm.$refs.form.resetFields();
                this.createPageDrawerVisible = false;
                this.initPageTreeData();
              }else {
                this.$Message.error(result.data.message)
              }
            });
          }
        });
      },

      pageTreeSelectChangeHandle (selectPages) {
        if(selectPages.length > 0) {
          this.currentSelectPageId = selectPages[0].key
        }else {
          this.currentSelectPageId = ''
        }
      },

      /**
       * 打开页面并编辑，在这里将会初始化vuex中的pageMetadata数据
       */
      openPageToDesigner (pageId) {
        let handler = (pageId) => {
          this.$store.commit('designer/setRightSidebarPageConfigFormName', 'PageFormForDesigner');
          this.$store.commit('designer/resetDesigner');
          this.$store.dispatch('designer/loadPage', pageId);

          this.currentSelectPageId = pageId;

          // 将页面ID添加至URL参数中
          this.$PnUtil.addUrlParams('page_id', pageId);
        };
        if (this.pageMetadata.id) {
          this.$Modal.confirm({
            title: '提醒',
            content: '系统不会保存您所做的改动，请确认是否已保存。',
            onOk: () => {
              handler(pageId)
            }
          });
        }else {
          handler(pageId)
        }
      },

      deletePage(pageId) {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除此页面吗？',
          onOk: () => {
            this.$PnApi.PageApi.deletePage(pageId).then(result=>{
              if(result.data.success) {
                this.initPageTreeData();
                this.$store.commit('designer/setPageMetadata', this.$PnDesigner.buildInitPageMetadata());
                this.$store.commit('designer/setRightSidebarPageConfigFormName', '');
                this.$PnUtil.deleteUrlParams('page_id');
              }
            })
          }
        });

      },



    },
    computed: {
      ...mapFields({
        projectInfo: 'projectInfo',
        pageMetadata: 'pageMetadata',
        currentSelectLayoutItemId: 'currentSelectLayoutItemId',
        rightSidebarFuncCompConfigFormName: 'rightSidebarFuncCompConfigFormName'
      }),
      // 根据developCanvas返回不同的画布配置表单
      canvasConfigCompName () {
        if(this.$store.state.designer.pageMetadata.developCanvas === 'AbsoluteLayoutCanvas') {
          return 'AbsoluteLayoutConfigDataForm'
        }
        return ''
      }
    },
    watch: {

      'rightSidebarFuncCompConfigFormName': {
        handler: function (val) {
          if (val) {
            val = val.replace('Form', '');
            this.currentCompVersion = this.$PnUtil.getCompVersion(val)
          }else {
            this.currentCompVersion = ''
          }
        }
      }
    }
  }
</script>

<style scoped>

  >>> .ivu-tabs-bar {
    margin-bottom: 0px;
  }

  >>> .ivu-split-pane {
    overflow: auto;
  }

  .left-sidebar-collapse-btn {
    position: fixed;
    width: 10px;
    height: 80px;
    background-color: #CCCCCC;
    border-top: 1px solid rgb(153, 153, 153);
    border-left: 1px solid rgb(153, 153, 153);
    border-right: 1px solid rgb(153, 153, 153);
    border-bottom: 1px solid rgb(153, 153, 153);
    left: 290px;
    top: 50%;
    margin-top: -40px;
    cursor: pointer;
    z-index: 998;
  }

  .left-sidebar-collapse-btn i {
    font-size: 17px;
    margin-left: -5px;
    top: 50%;
    position: absolute;
    margin-top: -8px;
    color: #2d8cf0;
  }

  .left-sidebar-collapse-btn:hover {
    background-color: #BBBBBB;
  }

  .left-sidebar-collapse-btn.active {
    left: 0px;
  }

  .right-sidebar-collapse-btn {
    position: fixed;
    width: 10px;
    height: 80px;
    background-color: #CCCCCC;
    border-top: 1px solid rgb(153, 153, 153);
    border-left: 1px solid rgb(153, 153, 153);
    border-right: 1px solid rgb(153, 153, 153);
    border-bottom: 1px solid rgb(153, 153, 153);
    right: 320px;
    top: 50%;
    margin-top: -40px;
    cursor: pointer;
    z-index: 998;
  }

  .right-sidebar-collapse-btn i {
    font-size: 17px;
    margin-left: -4px;
    top: 50%;
    position: absolute;
    margin-top: -8px;
    color: #2d8cf0;
  }

  .right-sidebar-collapse-btn:hover {
    background-color: #BBBBBB;
  }

  .right-sidebar-collapse-btn.active {
    right: 0px;
  }

  .ivu-divider-horizontal {
    margin: 10px 0px;
  }

  .designer-main {
    height: 100%;
  }

  .designer-main .ivu-layout {
    height: 100%;
  }

  .none-message {
    font-size: 2em;
    font-weight: bold;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity:0.5;
  }

</style>
