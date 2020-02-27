<template>
  <div class="layout">
    <Layout :style="{height: '100%'}">
      <Header >
        <Menu :style="{float: 'left'}" mode="horizontal" theme="dark" active-name="1">
          <h2 class="color-white">PageNow数据可视化开发平台_开源基础版</h2>

        </Menu>
        <div style="float: right;">

          <Dropdown class="m-r-5px" placement="bottom-start" trigger="click" @on-click="userDropdownClickHandle">
            <Button type="primary">
              <Icon type="ios-contact" size="17"/> {{$PnUtil.getCurrentUser().username}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="changePwd">修改密码</DropdownItem>
              <DropdownItem name="logout">退出系统</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>

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
              <MenuItem v-permission name="CompinfoManage" to="/admin/compinfo_manage">组件信息库管理</MenuItem>
              <MenuItem name="EchartThemeManage" to="/admin/echart_theme_manage">图表主题管理</MenuItem>
              <MenuItem v-permission name="UserManage" to="/admin/user_manage">用户管理</MenuItem>
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

    <ChangePasswordModal :show="changePwdModalVisible"
                         @cancel="changePwdModalVisible = false"></ChangePasswordModal>

  </div>

</template>

<script>
  import Vue from 'vue'
  import ChangePasswordModal from "./components/admin/user/ChangePasswordModal";

  export default {
    name: 'Admin',
    components: {ChangePasswordModal},
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
      changeLanguage: function(key) {
        Vue.config.lang = key;
        this.currentLanguage = this.language[key];
        localStorage.setItem('language', key);
      },

      userDropdownClickHandle (name) {
        if (name == 'logout') {
          this.logout();
        }else if (name == 'changePwd') {
          this.changePwdModalVisible = !this.changePwdModalVisible
        }
      },

      logout: function () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认要退出系统吗？',
          onOk: () => {

            this.$PnApi.AuthApi.logout(localStorage.getItem('token')).then(result => {
              localStorage.removeItem('token');
              localStorage.removeItem('current_user');
              this.$router.push('/login')
            });

          }
        });
      }
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
