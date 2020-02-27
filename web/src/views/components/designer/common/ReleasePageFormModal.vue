<template>
  <Modal
      v-model="visible"
      title="发布页面"
      :mask-closable="false"
      :z-index="999"
      @on-cancel="cancel">
    <Form :label-width="105" :model="formData">
      <FormItem label="pageId" prop="pageId" hidden>
        <Input v-model="formData.pageId"/>
      </FormItem>
      <FormItem label="发布状态" prop="publish">
        <i-switch v-model="formData.publish" :true-value="'1'" :false-value="'0'" @on-change="publishChangeHandle">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="基础访问地址">
        <i-input v-model="publishUrl" placeholder="开启发布之后可获取页面的基础访问地址" disabled>
          <Button title="复制" slot="append" v-clipboard="publishUrlClipOptions"><Icon type="md-copy" /></Button>
        </i-input>
      </FormItem>
      <FormItemPanel title="限制访问">
        <FormItem label="是否加密" prop="encrypt">
          <i-switch v-model="formData.encrypt" :true-value="'1'" :false-value="'0'">
            <span slot="open"></span>
            <span slot="close"></span>
          </i-switch>
        </FormItem>
        <FormItem label="访问密码" prop="password">
          <Input v-model="formData.password" type="password" password style="width: 180px;"/>
          <Tooltip transfer content="默认访问密码为123" placement="top">
            <Button class="m-l-5px" type="default" @click="resetPassword">恢复默认密码</Button>
          </Tooltip>
        </FormItem>
      </FormItemPanel>

    </Form>
    <div slot="footer">
      <Button type="default" @click="cancel">关闭</Button>
      <Button type="primary" @click="submitForm">保存</Button>
    </div>
  </Modal>
</template>

<script>

  export default {
    name: 'ReleasePageForm',
    props: {
      show: Boolean
    },
    data() {
      return {
        visible: this.show,
        publishUrl: '',
        pageMetadata: null,
        formData: {
          pageId: '',
          publish: '',
          encrypt: '',
          password: ''
        }
      }
    },
    mounted() {

    },
    methods: {
      initialize (pageId) {
        this.$PnApi.PageApi.getPageById(pageId).then(result => {
          this.pageMetadata = result.data;
          this.formData.pageId = this.pageMetadata.id;
          this.formData.publish = this.pageMetadata.publish;
          this.formData.encrypt = this.pageMetadata.encrypt;
          this.formData.password = this.pageMetadata.password;
          if (this.formData.publish == '1') {
            this.publishUrl = window.location.host + '/pagenow' + this.pageMetadata.path
          }else {
            this.publishUrl = ''
          }
        })
      },

      submitForm () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认保存修改的状态吗？',
          onOk: () => {
            if (this.formData.encrypt == '1' && this.formData.password == '') {
              this.$Message.warning('请输入访问密码！')
            }else {
              this.$PnApi.PageApi.releasePage(this.formData.pageId, this.formData.publish, this.formData.encrypt, this.formData.password).then(result => {
                if (result.data.success) {
                  this.$store.commit('designer/setPagePublishAndEncrypt', {
                    publish: this.formData.publish,
                    encrypt: this.formData.encrypt
                  });
                  this.cancel();
                  this.$Message.success('保存成功')
                }else {
                  this.$Message.error('保存失败')
                }
              })
            }

          }
        });
      },

      cancel () {
        this.visible = false;
        this.$emit('cancel', this.visible);
      },

      resetPassword () {
        this.formData.password = '123'
      },

      publishChangeHandle (val) {
        if (val == '1') {
          this.publishUrl = window.location.host + '/pagenow' + this.pageMetadata.path
        }else if (val == '0') {
          this.publishUrl = ''
        }
      }
    },
    computed: {
      publishUrlClipOptions () {
        return {
          value: this.publishUrl,
          success: () => {
            this.$Message.success('复制成功')
          },
          error: () => {
            this.$Message.error('复制失败')
          }
        }
      },
    },
    watch: {
      show (val) {
        this.visible = val
      }
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
