<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="主要配置" :style="{paddingTop: '10px'}">

        <Collapse value="1">
          <Panel name="1">
            网格
            <div slot="content">
              <Form :label-width="100">

                <FormItem label="左边距">
                  <Input size="small" v-model="grid.left"/>
                </FormItem>
                <FormItem label="上边距">
                  <Input size="small" v-model="grid.top"/>
                </FormItem>
                <FormItem label="右边距">
                  <Input size="small" v-model="grid.left"/>
                </FormItem>
                <FormItem label="下边距">
                  <Input size="small" v-model="grid.bottom"/>
                </FormItem>

              </Form>
            </div>
          </Panel>
          <Panel name="2">
            标题配置
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="是否显示">
                  <i-switch v-model="title.show">
                    <span slot="open"></span>
                    <span slot="close"></span>
                  </i-switch>
                </FormItem>
                <FormItem label="文本">
                  <Input size="small" v-model="title.text"/>
                </FormItem>
              </Form>
            </div>
          </Panel>

          <Panel name="3">
            x轴配置
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="显示">
                  <i-switch v-model="xAxis.show">
                    <span slot="open"></span>
                    <span slot="close"></span>
                  </i-switch>
                </FormItem>
                <FormItem label="文本颜色">
                  <ColorPicker size="small" v-model="xAxis.axisLabel.color" alpha recommend/>
                </FormItem>
                <FormItem label="辅助线">
                  <i-switch v-model="xAxis.axisLine.show">
                    <span slot="open"></span>
                    <span slot="close"></span>
                  </i-switch>
                </FormItem>
                <FormItem label="辅助线颜色">
                  <ColorPicker size="small" v-model="xAxis.axisLine.lineStyle.color" alpha recommend/>
                </FormItem>
              </Form>
            </div>
          </Panel>
          <Panel name="4">
            y轴配置
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="显示">
                  <i-switch v-model="yAxis.show">
                    <span slot="open"></span>
                    <span slot="close"></span>
                  </i-switch>
                </FormItem>
              </Form>
            </div>
          </Panel>
          <Panel name="5">
            数据系列
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="系列颜色">
                  <ColorPicker size="small" v-model="color" alpha recommend/>
                </FormItem>
              </Form>
            </div>
          </Panel>
        </Collapse>
      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="BaseBarChart"></DatasourceState>
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
    name: 'BaseBarChartForm',
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

        color: 'component.compConfigData.chartOption.color',
        title: 'component.compConfigData.chartOption.title',
        grid: 'component.compConfigData.chartOption.grid',
        xAxis: 'component.compConfigData.chartOption.xAxis',
        yAxis: 'component.compConfigData.chartOption.yAxis',

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
