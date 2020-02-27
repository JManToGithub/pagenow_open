<template>
  <div class="">
    <Table :columns="columns" :data="tableData"></Table>
  </div>
</template>

<script>
  export default {
    name: 'ProjectTableExpand',
    props: {
      projectId: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        columns: [
          {
            title: '页面名称',
            key: 'name'
          },
          {
            title: '路径',
            key: 'path'
          },
          {
            title: '关联组件',
            key: 'component'
          },
          {
            title: '状态',
            key: 'enabled',
            align: 'center',
            render: (h, params) => {
              if (params.row.publish == '1') {
                return h('span', {
                  style: {
                    color: '#19be6b'
                  }
                }, '已发布')
              } else if (params.row.publish == '0') {
                return h('span', {
                  style: {
                    color: '#ed4014'
                  }
                }, '未发布')
              }
            }
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
                    type: 'default',
                    icon: 'md-link'
                  },
                  on: {
                    click: () => {
                      this.linkPage(params.row)
                    }
                  }
                })
              ]);
            }
          }
        ],
        tableData: []
      }
    },
    mounted() {
      this.loadPages();
    },
    methods: {
      loadPages () {
        this.$PnApi.PageApi.getAllPageByProjectId(this.projectId).then(result=>{
          this.tableData = result.data;
        })
      },

      linkPage (page) {
        this.$PnUtil.openPageToBlank(page.path);
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
