<template>
  <div class="">
    <Button size="small" type="primary" @click="openCompinfoForm('add')">新建组件</Button>
    <Divider/>
    <Table :columns="columns" :data="tableData"></Table>
    <Page size="small" class="m-t-5px float-right" :total="pageTotal" :current.sync="pageNum" :page-size="pageSize"
          show-elevator show-total @on-change="loadCompinfos">
    </Page>

    <Drawer
        title="组件信息编辑"
        v-model="compinfoDrawerVisible"
        width="450"
        :mask-closable="false">
      <CompinfoForm ref="compinfoForm"></CompinfoForm>
      <DrawerFooter>
        <Button class="m-r-5px" @click="compinfoDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitForm">提交</Button>
      </DrawerFooter>
    </Drawer>

  </div>
</template>

<script>
  import CompinfoForm from './CompinfoForm'

  import ManageMixin from '../../../../mixin/ManageMixin'

  export default {
    name: 'CompinfoTypeTableExpand',
    mixins: [ManageMixin],
    components: {
      CompinfoForm
    },
    props: {
      compinfoTypeId: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        node_env: process.env.NODE_ENV,
        compinfoDrawerVisible: false,
        columns: [
          {
            title: '缩略图',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: this.thumbnailPath(params.row.thumbnail_uri)
                  },
                  style: {
                    width: '85px',
                    height: '50px',
                    marginTop: '5px',
                    backgroundColor: '#616161',
                    borderRadius: '4px',
                    padding: '5px'
                  },
                  on: {

                  }
                })
              ]);
            }
          },
          {
            title: '组件文件名',
            key: 'name'
          },
          {
            title: '别名',
            key: 'alias_name'
          },
          {
            title: '描述',
            key: 'remark'
          },
          {
            title: '状态',
            key: 'enabled',
            align: 'center',
            render: (h, params) => {
              if (params.row.enabled == '1') {
                return h('span', {
                  style: {
                    color: '#19be6b'
                  }
                }, '已激活')
              } else if (params.row.enabled == '0') {
                return h('span', {
                  style: {
                    color: '#ed4014'
                  }
                }, '未激活')
              }
            }
          },
          {
            title: '缩略图URI',
            width: 360,
            key: 'thumbnail_uri',
            align: 'center'
          },
          {
            title: '创建日期',
            key: 'create_date'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'primary',
                    icon: 'md-create'
                  },
                  'class': {
                    'm-r-5px': true
                  },
                  on: {
                    click: () => {
                      this.openCompinfoForm('update', params.row)
                    }
                  }
                }),
                h('Poptip', {
                  props: {
                    confirm: true,
                    transfer: true,
                    title: '您确定要删除此项吗？'
                  },
                  style: {

                  },
                  on: {
                    'on-ok': () => {
                      this.deleteCompinfo(params.row.id)
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      size: 'small',
                      type: 'error',
                      icon: 'md-trash'
                    }
                  },)
                ])
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this.loadCompinfos();
    },
    methods: {

      loadCompinfos () {
        this.$PnApi.CompinfoApi.getCompinfoByPage(this.compinfoTypeId, this.pageNum, this.pageSize).then(result=>{
          this.tableData = result.data.list;
          this.pageTotal = result.data.total;
        })
      },

      openCompinfoForm (type, data) {
        this.compinfoDrawerVisible = !this.compinfoDrawerVisible;
        this.$refs.compinfoForm.loadCompinfoTypes();
        if (type == 'add') {
          this.$refs.compinfoForm.$refs.form.resetFields();
          this.$refs.compinfoForm.formData.type_id = this.compinfoTypeId;
        }else if (type == 'update') {
          this.$PnApi.CompinfoApi.getCompinfoById(data.id).then(result=>{
            this.$refs.compinfoForm.formData = result.data
          });
        }
      },

      submitForm () {
        this.$refs.compinfoForm.$refs.form.validate((valid) => {
          if (valid) {
            let formData = Object.assign({}, this.$refs.compinfoForm.formData);
            let type = formData.id ? 'update': 'add';
            this.$PnApi.CompinfoApi.saveCompinfo(formData, type).then(result => {
              if (result.data.success) {
                this.compinfoDrawerVisible = !this.compinfoDrawerVisible;
                this.$refs.compinfoForm.$refs.form.resetFields();
                this.$Message.success('保存成功');
                this.loadCompinfos();
              }else {
                this.$Message.error(result.data.message)
              }
            })
          }
        });
      },

      deleteCompinfo (id) {
        this.$PnApi.CompinfoApi.deleteCompinfo(id).then(result => {
          if(result.data.success) {
            this.loadCompinfos();
            this.$Message.success('删除成功')
          }
        });
      },

      thumbnailPath (thumbnail_uri) {
        if (thumbnail_uri) {
          try {
            return require('../../../../components/functional/'+thumbnail_uri)
          }catch (e) {
            return ''
          }
        }else {
          return require('@/assets/image/thumbnail/thumbnail-default.png')
        }
      },

    },
    computed: {

    }
  }
</script>

<style scoped>
  .ivu-divider-horizontal {
    margin: 10px 0px;
  }
</style>
