<template>
  <div class="login">
    <div class="from-wrap">
      <h2>欢迎使用PageNow数据可视化平台</h2>
      <Form ref="loginForm" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="账号" prop="username">
          <Input type="text" v-model="formData.username" placeholder="请输入账号"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="formData.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem class="form-footer">
          <Button type="primary" class="m-r-5px" @click="handleSubmit()">登录</Button>
          <Button type="primary" @click="registerUserFormModalVisible = !registerUserFormModalVisible">注册</Button>
        </FormItem>
      </Form>
    </div>

    <RegisterUserFormModal :show="registerUserFormModalVisible"
                           @cancel="registerUserFormModalVisible = false"></RegisterUserFormModal>

  </div>
</template>

<script>

  import { JSEncrypt } from 'jsencrypt'
  import RegisterUserFormModal from "./components/admin/user/RegisterUserFormModal";

  export default {
    name: 'Login',
    components: {RegisterUserFormModal},
    data() {
      return {
        registerUserFormModalVisible: false,
        formData: {
          username:'',
          password:''
        },

        ruleValidate: {
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 3, max: 16, message: '密码长度3-16个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {
      handleSubmit () {

        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            let encrypt = new JSEncrypt();

            this.$PnApi.AuthApi.getPublicKey().then(result => {
              let md5 = result.data.md5;
              let publicKey = result.data.publicKey;

              encrypt.setPublicKey(publicKey);
              let encryptedUsername = encrypt.encrypt(this.formData.username);
              let encryptedPassword = encrypt.encrypt(this.formData.password);

              let credentials = {
                "username": encryptedUsername,
                "password": encryptedPassword,
                "md5": md5
              };

              this.$PnApi.AuthApi.login(credentials).then(result => {
                localStorage.setItem('token', result.data.token.access_token);
                localStorage.setItem('current_user', JSON.stringify(result.data));

                this.$router.push('/');
              }).catch(error => {
                this.$Message.error(error.message)
              });

            });

          }
        })
      },
      handleReset () {
        this.$refs['loginForm'].resetFields();
      },

    },
    computed: {}
  }
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: relative;
  }
  .login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
  }
  .login h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .login FormItem {
    margin-bottom: 15px;
  }
  .login .form-footer {
    text-align: right;
  }
  .ivu-form-item-required .ivu-form-item-label:before {
    display: none;
  }

  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
</style>
