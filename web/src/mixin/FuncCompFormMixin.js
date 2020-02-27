
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'designer/getLayoutItem',
  mutationType: 'designer/updateLayoutItem',
});

const FuncCompFormMixin = {
  data() {
    return {
      cacheId: '',

    }
  },
  created () {

  },
  mounted () {
    this.cacheId = this.id;

  },
  methods: {

    /**
     * 更新字段
     * @param fieldPath 字段全路径
     * @param val
     */
    updateField (fieldPath, val) {
      // 重要：增加这个if判断是为了解决当布局中存在两个相同组件时（例如按钮组件），
      // 如果在编辑某字段的时候，点的不是当前编辑的目标组件使其失活（on-blur），而是点击另外一个相同类型组件，就会造成编辑内容互相冲突覆盖的问题
      if (this.cacheId == this.id) {
        this.$store.commit('designer/updateLayoutItem', {
          path: fieldPath,
          value: val
        });
      }
    },

  },
  computed: {
    ...mapFields({
      id: 'component.id',

    })
  }
};

export default FuncCompFormMixin
