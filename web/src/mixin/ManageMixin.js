/**
 * 管理界面混入对象，内部定义了一些分页信息和通用表格的数据对象等...
 */
const ManageMixin = {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pageTotal: 100000,
      tableData: []
    }
  },
  created () {

  },
  computed: {

  }
};

export default ManageMixin
