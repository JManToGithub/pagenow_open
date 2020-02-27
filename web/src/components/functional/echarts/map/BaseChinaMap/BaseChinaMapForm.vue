<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="主要配置" :style="{paddingTop: '10px'}">

      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">

      </TabPane>
    </Tabs>
  </div>
</template>

<script>

  import FuncCompFormMixin from '@/mixin/FuncCompFormMixin'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'BaseChinaMapForm',
    mixins: [FuncCompFormMixin],
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      ...mapFields({




      })
    }
  }
</script>

<style scoped>

</style>
