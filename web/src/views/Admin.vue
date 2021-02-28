<template>
  <div class="layout">
    <Layout :style="{height: '100%'}">
      <Header >
        <Menu :style="{float: 'left'}" mode="horizontal" theme="dark" active-name="1">
          <h2 class="color-white">PageNow数据可视化开发平台_开源基础版</h2>

        </Menu>

      </Header>

      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="menuActiveName" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-cog" size="28"/>
                管理
              </template>
              <MenuItem name="ProjectManage" to="/admin/project_manage">我的工程</MenuItem>
              <MenuItem name="CompinfoManage" to="/admin/compinfo_manage">组件信息库管理</MenuItem>
              <MenuItem name="EchartThemeManage" to="/admin/echart_theme_manage">图表主题管理</MenuItem>
            </Submenu>

          </Menu>
        </Sider>
        <Layout :style="{padding: '0 15px 15px', marginTop: '15px'}">
          <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>

  </div>

</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'Admin',

    data() {
      return {
        currentLanguage: "",
        language: {
          "zh-CN": "简体中文",
          "en-US": "英文"
        },

        menuActiveName: '',
        changePwdModalVisible: false,
      }
    },
    mounted() {
      this.currentLanguage = this.language[Vue.config.lang];

      this.menuActiveName = this.$route.name;
    },
    methods: {

    },
    computed: {}
  }
</script>

<style scoped>
  .layout{
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: auto;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
