
import PnApi from '../api/PnApi';

import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'designer/getField',
  mutationType: 'designer/updateField',
});

const CanvasDesignerMixin = {
  data() {
    return {

    }
  },
  created () {


  },
  methods: {

    /**
     * 注册键盘ctrl + s组合键监听
     */
    registerKeyCtrlAndS () {
      let _this = this;

      $(document).unbind('keydown');

      $(document).bind("keydown", function(e) {

        let keyCode = event.keyCode || event.which || event.charCode;
        let ctrlKey = event.ctrlKey || event.metaKey;

        // ctrl + s 全选组合键
        if(ctrlKey && keyCode == 83) {
          event.preventDefault();
          let page = Object.assign({}, _this.pageMetadata);
          page.layout = JSON.stringify(page.layout);
          delete page.echartThemeJsonText;
          PnApi.PageApi.updatePage(page).then(result => {
            if(result.data.success) {
              _this.$Message.success('保存成功')
            }
          })
        }

      });
    },

  },
  computed: {
    ...mapFields({
      pageMetadata: 'pageMetadata'
    })
  }
};

export default CanvasDesignerMixin
