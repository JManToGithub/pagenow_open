<template>
  <div class="">
    <Table ref="table" :size="'small'" :columns="columnsData" :data="tableData" :row-class-name="ttt"></Table>
  </div>
</template>

<script>
  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'ITableComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        headerStyle: {
          backgroundColor: '',
          color: ''
        },
        tableConfig: {
          columns: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'Sex',
              key: 'sex'
            }
          ]
        },
        customJsCode: ''
      }
    },
    data() {
      return {

        columnsData: [

        ],
        tableData: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    mounted() {
      let _this = this;

      this.setHeaderStyle();

      let newTableConfig = Object.assign({}, this.component.compConfigData.tableConfig);

      newTableConfig.columns.map(data=>{
        if (data.type) {
          this.columnsData.push({
            type: data.type,
            width: 60
          })
        }else {
          this.columnsData.push({
            title: data.title,
            key: data.key
          })
        }

      });

      //this.columnsData = newTableConfig.columns.slice(0);

      //console.log(this.$refs.table.$refs.header);

      eval(this.component.compConfigData.customJsCode)

    },
    methods: {
      ttt (row, index) {
        //console.log(row);
      },

      setHeaderStyle () {
        $(this.$refs.table.$refs.header).find('th').css({
          'background-color': this.component.compConfigData.headerStyle.backgroundColor,
          'color': this.component.compConfigData.headerStyle.color
        })
      }
    },
    computed: {},
    watch: {
      'component.compConfigData.headerStyle': {
        handler: 'setHeaderStyle',
        deep: true
      }
    }
  }
</script>

<style scoped>
  /*>>> .ivu-table td {
    background-color: #182328;
    color: #fff;
  }
  >>> .ivu-table-header th{

    font-weight: bold;
    border: none;
  }*/
</style>
