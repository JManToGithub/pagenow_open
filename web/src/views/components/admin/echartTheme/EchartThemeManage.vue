<template>
  <div class="echart-theme-manage">
    <Button type="primary" @click="openEchartThemeForm('add')">新建主题</Button>
    <div class="m-b-10px"></div>
    <Table ref="table" :columns="columns" :data="tableData"></Table>
    <Page class="m-t-5px float-right" :total="pageTotal" :current.sync="pageNum" :page-size="pageSize"
          show-elevator show-total @on-change="loadEchartThemes">
    </Page>

    <Drawer
        title="主题编辑"
        v-model="echartThemeFormDrawerVisible"
        width="650"
        :mask-closable="false">
      <EchartThemeForm ref="echartThemeForm"></EchartThemeForm>
      <DrawerFooter>
        <Button style="margin-right: 8px" @click="echartThemeFormDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitEchartThemeForm">提交</Button>
      </DrawerFooter>
    </Drawer>
  </div>
</template>

<script>
  import EchartThemeForm from './EchartThemeForm'
  import DrawerFooter from '../../../../components/common/DrawerFooter'

  import ManageMixin from '../../../../mixin/ManageMixin'

  export default {
    name: 'EchartThemeManage',
    mixins: [ManageMixin],
    components: {
      EchartThemeForm,
      DrawerFooter
    },
    data() {
      return {
        node_env: process.env.NODE_ENV,
        echartThemeFormDrawerVisible: false,
        columns: [
          {
            title: '主题名称',
            key: 'name'
          },
          {
            title: '备注',
            key: 'remark'
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
                    size: 'small',
                    type: 'primary',
                    icon: 'md-create'
                  },
                  'class': {
                    'm-r-5px': true
                  },
                  on: {
                    click: () => {
                      this.openEchartThemeForm('update', params.row)
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
                      this.deleteEchartTheme(params.row.id)
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
      this.loadEchartThemes();
    },
    methods: {

      loadEchartThemes () {
        this.$PnApi.EchartThemeApi.getEchartThemeByPage(this.pageNum, this.pageSize).then(result=>{
          this.tableData = result.data.list;
          this.pageTotal = result.data.total;
        })
      },

      openEchartThemeForm (type, data) {
        this.echartThemeFormDrawerVisible = !this.echartThemeFormDrawerVisible;
        if (type == 'add') {
          this.$refs.echartThemeForm.$refs.form.resetFields();
        }else if (type == 'update') {
          this.$refs.echartThemeForm.formData = this.$PnUtil.deleteTableRowUselessField(data)
        }
      },

      submitEchartThemeForm () {
        this.$refs.echartThemeForm.$refs.form.validate((valid) => {
          if (valid) {
            let type = this.$refs.echartThemeForm.formData.id ? 'update': 'add';
            this.$PnApi.EchartThemeApi.saveEchartTheme(this.$refs.echartThemeForm.formData, type).then(result => {
              if (result.data.success) {
                this.echartThemeFormDrawerVisible = !this.echartThemeFormDrawerVisible;
                this.$refs.echartThemeForm.$refs.form.resetFields();
                this.loadEchartThemes()
              }else {
                this.$Message.error(result.data.message);
              }
            });
          }
        });
      },

      deleteEchartTheme (id) {
        this.$PnApi.EchartThemeApi.deleteEchartTheme(id).then(result => {
          if(result.data.success) {
            this.loadEchartThemes();
            this.$Message.success('删除成功')
          }
        });
      }

    },
    computed: {}
  }
</script>

<style scoped>

</style>
