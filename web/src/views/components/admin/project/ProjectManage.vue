<!--工程管理主界面-->

<template>
  <div class="project-manage">

    <Button type="primary" @click="openProjectForm('add')">新建工程</Button>
    <div class="m-b-10px"></div>
    <Table ref="table" :columns="columns" :data="tableData"></Table>
    <Page class="m-t-5px float-right" :total="pageTotal" :current.sync="pageNum" :page-size="pageSize"
          show-elevator show-total @on-change="loadProjects">
    </Page>

    <Drawer
        title="工程信息编辑"
        v-model="projectDrawerVisible"
        width="450"
        :mask-closable="false">
      <ProjectForm ref="projectForm"></ProjectForm>
      <DrawerFooter>
        <Button style="margin-right: 8px" @click="projectDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitForm">提交</Button>
      </DrawerFooter>
    </Drawer>

  </div>
</template>

<script>
  import ProjectForm from './ProjectForm'
  import ProjectTableExpand from './ProjectTableExpand'

  import ManageMixin from '../../../../mixin/ManageMixin'

  export default {
    name: 'ProjectManage',
    mixins: [ManageMixin],
    components: {
      ProjectForm
    },
    data() {
      return {

        projectDrawerVisible: false,

        columns: [
          /*{
            type: 'selection',
            width: 60,
            align: 'center'
          },*/
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(ProjectTableExpand, {
                props: {
                  projectId: params.row.id
                }
              })
            }
          },
          {
            title: '工程名称',
            key: 'name'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '图表主题',
            key: 'echartThemeName'
          },
          {
            title: '创建者',
            key: 'username'
          },
          {
            title: '创建时间',
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
                    type: 'success',
                    size: 'small',
                    icon: 'md-build'
                  },
                  'class': {
                    'm-r-5px': true
                  },
                  on: {
                    click: () => {
                      this.openProject(params.row)
                    }
                  }
                }),
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
                      this.openProjectForm('update', params.row)
                    }
                  }
                }),
                h('Poptip', {
                  props: {
                    confirm: true,
                    transfer: true,
                    title: '此操作会删除关联此项目的所有页面，确认执行吗？'
                  },
                  style: {

                  },
                  on: {
                    'on-ok': () => {
                      this.deleteProject(params.row.id)
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
      this.loadProjects()
    },
    methods: {

      loadProjects () {
        this.$PnApi.ProjectApi.getProjectByPage(this.pageNum, this.pageSize).then(result => {
          this.tableData = result.data.list;
          this.pageTotal = result.data.total;
        })
      },

      openProjectForm (type, data) {
        this.projectDrawerVisible = !this.projectDrawerVisible;
        if (type == 'add') {
          this.$refs.projectForm.$refs.form.resetFields();
        }else if (type == 'update') {
          this.$refs.projectForm.formData = this.$PnUtil.deleteTableRowUselessField(data)
        }
      },

      submitForm () {
        this.$refs.projectForm.$refs.form.validate((valid) => {
          if (valid) {
            let type = this.$refs.projectForm.formData.id ? 'update': 'add';
            delete this.$refs.projectForm.formData.echartThemeName;
            this.$PnApi.ProjectApi.saveProject(this.$refs.projectForm.formData, type).then(result => {
              if (result.data.success) {
                this.projectDrawerVisible = !this.projectDrawerVisible;
                this.$refs.projectForm.$refs.form.resetFields();
                this.loadProjects()
              }else {
                this.$Message.error(result.data.message)
              }
            })
          }
        });
      },

      deleteProject (id) {
        this.$PnApi.ProjectApi.deleteProject(id).then(result => {
          if(result.data.success) {
            this.loadProjects();
            this.$Message.success('删除成功')
          }

        });
      },

      openProject (project) {
        this.$PnUtil.openPageToBlank('/designer', {project_id: project.id});
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
