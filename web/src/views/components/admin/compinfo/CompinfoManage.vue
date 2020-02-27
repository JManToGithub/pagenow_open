<!--组件库管理主界面-->

<template>
  <div class="compinfo-manage">
    <Button type="primary" @click="openCompinfoTypeForm('add')">新建类别</Button>&nbsp;
    <Button type="primary" @click="incrementalUpdateFormDrawerVisible = !incrementalUpdateFormDrawerVisible">增量更新组件配置</Button>
    <div class="m-b-10px"></div>
    <Table :columns="columns" :data="tableData"></Table>
    <Page class="m-t-5px float-right" :total="pageTotal" :current.sync="pageNum" :page-size="pageSize"
          show-elevator show-total @on-change="loadCompinfoTypes">
    </Page>

    <Drawer
        title="组件类别信息编辑"
        v-model="compinfoTypeDrawerVisible"
        width="450"
        :mask-closable="false">
      <CompinfoTypeForm ref="compinfoTypeForm"></CompinfoTypeForm>
      <DrawerFooter>
        <Button class="m-r-5px" @click="compinfoTypeDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitCompinfoTypeForm">提交</Button>
      </DrawerFooter>
    </Drawer>

    <Drawer
        title="增量更新组件配置"
        v-model="incrementalUpdateFormDrawerVisible"
        width="450"
        :mask-closable="false">
      <IncrementalUpdateForm ref="incrementalUpdateForm"></IncrementalUpdateForm>
      <DrawerFooter>
        <Button class="m-r-5px" @click="incrementalUpdateFormDrawerVisible = false">关闭</Button>
        <Button class="m-r-5px" @click="resetForm('incrementalUpdateForm')">重置</Button>
        <Button type="primary" :loading="btnLoading" @click="submitIncrementalUpdateForm">提交</Button>
      </DrawerFooter>
    </Drawer>

  </div>
</template>

<script>
  import axios from 'axios'

  import CompinfoTypeForm from './CompinfoTypeForm'
  import IncrementalUpdateForm from './IncrementalUpdateForm'

  import CompinfoTypeTableExpand from './CompinfoTypeTableExpand'

  import ManageMixin from '../../../../mixin/ManageMixin'

  export default {
    name: 'CompinfoManage',
    mixins: [ManageMixin],
    components: {
      CompinfoTypeForm,
      IncrementalUpdateForm,
    },
    data() {
      return {
        node_env: process.env.NODE_ENV,
        compinfoTypeDrawerVisible: false,
        columns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(CompinfoTypeTableExpand, {
                props: {
                  compinfoTypeId: params.row.id
                }
              })
            }
          },
          {
            title: '组件类别',
            key: 'name'
          },
          {
            title: '描述',
            key: 'remark'
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
                      this.openCompinfoTypeForm('update', params.row)
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
                      this.deleteCompinfoType(params.row.id)
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
        ],

        incrementalUpdateFormDrawerVisible: false,
        btnLoading: false,
      }
    },
    mounted() {
      this.loadCompinfoTypes();
    },
    methods: {
      loadCompinfoTypes () {
        this.$PnApi.CompinfoApi.getCompinfoTypeByPage(this.pageNum, this.pageSize).then(result=>{
          this.tableData = result.data.list;
          this.pageTotal = result.data.total;
        })
      },

      openCompinfoTypeForm (type, data) {
        this.compinfoTypeDrawerVisible = !this.compinfoTypeDrawerVisible;
        if (type == 'add') {
          this.$refs.compinfoTypeForm.$refs.form.resetFields();
        }else if (type == 'update') {
          this.$refs.compinfoTypeForm.formData = this.$PnUtil.deleteTableRowUselessField(data)
        }
      },

      submitCompinfoTypeForm () {
        this.$refs.compinfoTypeForm.$refs.form.validate((valid) => {
          if (valid) {
            let type = this.$refs.compinfoTypeForm.formData.id ? 'update': 'add';
            this.$PnApi.CompinfoApi.saveCompinfoType(this.$refs.compinfoTypeForm.formData, type).then(result => {
              if (result.data.success) {
                this.compinfoTypeDrawerVisible = !this.compinfoTypeDrawerVisible;
                this.$refs.compinfoTypeForm.$refs.form.resetFields();
                this.$Message.success('保存成功');
                this.loadCompinfoTypes();
              }else {
                this.$Message.error(result.data.message)
              }
            })
          }
        });
      },

      deleteCompinfoType (id) {
        this.$PnApi.CompinfoApi.deleteCompinfoType(id).then(result => {
          if(result.data.success) {
            this.loadCompinfoTypes();
            this.$Message.success('删除成功')
          }
        });
      },

      submitIncrementalUpdateForm () {
        this.$refs.incrementalUpdateForm.$refs.form.validate((valid)=>{
          if(valid) {

            this.btnLoading = true;
            let posts = [];

            this.$PnApi.PageApi.getAllPage().then(result=>{
              let pages = result.data;
              pages.forEach(page=>{
                let layout = JSON.parse(page.layout);
                layout.layoutItems.forEach(layoutItem=>{

                  // 所有功能组件
                  if (this.$refs.incrementalUpdateForm.formData.compName == 'allFuncComp') {
                    let arr = this.$refs.incrementalUpdateForm.formData.fieldName.split('.');
                    let code = 'layoutItem.component.compConfigData';
                    for (let i=0; i < arr.length; i++) {
                      code += "['"+arr[i]+"']"
                    }

                    if (this.$refs.incrementalUpdateForm.formData.fieldType == 'String') {
                      code += " = '"+this.$refs.incrementalUpdateForm.formData.fieldValue+"'";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Boolean') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Number') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Object') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    }

                    try{
                      eval(code);
                    }catch (e) {
                      console.error(e)
                    }
                  }

                  // 更新的是布局块组件
                  if (layoutItem.name == this.$refs.incrementalUpdateForm.formData.compName) {
                    let arr = this.$refs.incrementalUpdateForm.formData.fieldName.split('.');
                    let code = 'layoutItem.layoutItemConfigData';
                    for (let i=0; i < arr.length; i++) {
                      code += "['"+arr[i]+"']"
                    }

                    if (this.$refs.incrementalUpdateForm.formData.fieldType == 'String') {
                      code += " = '"+this.$refs.incrementalUpdateForm.formData.fieldValue+"'";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Boolean') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Number') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Object') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    }

                    try{
                      eval(code);
                    }catch (e) {
                      console.error(e)
                    }

                  }

                  // 更新的是指定的功能组件
                  if (layoutItem.component.name == this.$refs.incrementalUpdateForm.formData.compName) {

                    let arr = this.$refs.incrementalUpdateForm.formData.fieldName.split('.');
                    let code = 'layoutItem.component.compConfigData';
                    for (let i=0; i < arr.length; i++) {
                      code += "['"+arr[i]+"']"
                    }

                    if (this.$refs.incrementalUpdateForm.formData.fieldType == 'String') {
                      code += " = '"+this.$refs.incrementalUpdateForm.formData.fieldValue+"'";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Boolean') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Number') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    } else if (this.$refs.incrementalUpdateForm.formData.fieldType == 'Object') {
                      code += " = "+this.$refs.incrementalUpdateForm.formData.fieldValue+"";
                    }

                    try{
                      eval(code);
                    }catch (e) {
                      console.error(e)
                    }

                  }
                });

                page.layout = JSON.stringify(layout);
                posts.push(this.$PnApi.PageApi.updatePage(page));

              });

              axios.all(posts).then(axios.spread((acct, perms) => {
                this.btnLoading = false;
                this.$Message.success('更新成功');
                this.$refs.incrementalUpdateForm.$refs.form.resetFields();
              }))

            })

          }
        })
      },

      resetForm (formName) {
        this.$refs[formName].$refs.form.resetFields()
      }

    },
    computed: {}
  }
</script>

<style scoped>
  >>> td.ivu-table-expanded-cell {
    padding: 10px 20px 10px 20px;
  }
</style>
