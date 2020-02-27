<template>
  <Modal
      v-model="visible"
      title="新用户注册"
      width="450"
      :mask-closable="false"
      :z-index="999"
      @on-cancel="cancel">

    <Form ref="registerUserForm" :label-width="105" :model="formData" :rules="ruleValidate">
      <FormItem label="账号" prop="username">
        <Input v-model="formData.username"/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formData.password" type="password"/>
      </FormItem>
      <FormItem label="确认密码" prop="password2">
        <Input v-model="formData.password2" type="password"/>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="formData.email"/>
      </FormItem>
      <FormItem label="QQ" prop="qq">
        <Input v-model="formData.qq"/>
      </FormItem>
      <FormItem label="职业" prop="profession">
        <Input v-model="formData.profession"/>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="default" @click="cancel">关闭</Button>
      <Button type="primary" @click="submitForm">提交</Button>
    </div>
  </Modal>
</template>

<script>

  export default {
    name: 'RegisterUserFormModal',
    props: {
      show: Boolean
    },
    data() {
      return {
        visible: this.show,

        formData: {
          username: '',
          password: '',
          password2: '',
          email: '',
          qq: '',
          profession: ''
        },

        ruleValidate: {
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 3, max: 16, message: '密码长度3-16个字符', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { type: 'string', min: 3, max: 16, message: '密码长度3-16个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {

      submitForm () {
        this.$refs['registerUserForm'].validate((valid) => {
          if (valid) {
            this.$PnApi.UserApi.registerNewUser(this.formData).then(result => {
              if (result.data.success) {
                this.cancel();
                this.$Message.success('注册成功');
                this.$refs['registerUserForm'].resetFields();
              }else {
                this.$Message.error(result.data.message)
              }
            })
          }
        })
      },

      cancel () {
        this.visible = false;
        this.$emit('cancel', this.visible);
      },

    },
    computed: {

    },
    watch: {
      show (val) {
        this.visible = val
      }
    }
  }
</script>

<style scoped>

</style>
