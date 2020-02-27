<template>
  <Modal
      v-model="visible"
      title="修改密码"
      width="450"
      :mask-closable="false"
      :z-index="999"
      @on-cancel="cancel">

    <Form ref="changePwdForm" :label-width="105" :model="formData" :rules="ruleValidate">
      <FormItem label="原密码" prop="originalPassword">
        <Input v-model="formData.originalPassword" type="password"/>
      </FormItem>
      <FormItem label="新密码" prop="password">
        <Input v-model="formData.password" type="password"/>
      </FormItem>
      <FormItem label="确认密码" prop="password2">
        <Input v-model="formData.password2" type="password"/>
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
    name: 'ChangePasswordModal',
    props: {
      show: Boolean
    },
    data() {
      return {
        visible: this.show,

        formData: {
          originalPassword: '',
          password: '',
          password2: '',
        },

        ruleValidate: {
          originalPassword: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
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
        this.$refs['changePwdForm'].validate((valid) => {
          if (valid) {
            this.$PnApi.UserApi.changePassword(this.formData).then(result => {
              if (result.data.success) {
                this.cancel();
                this.$Message.success('修改成功');
                this.$refs['changePwdForm'].resetFields();
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
