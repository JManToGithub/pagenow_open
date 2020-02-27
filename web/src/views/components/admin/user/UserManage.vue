<template>
  <div class="user-manage">

    <Table ref="table" :columns="columns" :data="tableData"></Table>
    <Page class="m-t-5px float-right" :total="pageTotal" :current.sync="pageNum" :page-size="pageSize"
          show-elevator show-total @on-change="loadUsers">
    </Page>

  </div>
</template>

<script>

  import ManageMixin from '../../../../mixin/ManageMixin'

  export default {
    name: 'UserManage',
    mixins: [ManageMixin],
    data() {
      return {
        columns: [
          {
            title: '账号',
            key: 'username'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: 'QQ',
            key: 'qq'
          },
          {
            title: '职业',
            key: 'profession'
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
                      this.deleteUser(params.row.id)
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
      this.loadUsers();
    },
    methods: {

      loadUsers () {
        this.$PnApi.UserApi.getUserByPage(this.pageNum, this.pageSize).then(result=>{
          this.tableData = result.data.list;
          this.pageTotal = result.data.total;
        })
      },

      deleteUser (id) {
        this.$PnApi.UserApi.deleteUser(id).then(result => {
          if (result.data.success) {
            this.loadUsers();
            this.$Message.success('删除成功')
          }
        })
      }

    },
    computed: {}
  }
</script>

<style scoped>

</style>
