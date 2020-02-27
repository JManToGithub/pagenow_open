<template>
  <div class="">
    <Tabs size="small">
      <TabPane label="主要配置" :style="{paddingTop: '10px'}">

        <Collapse value="1">

          <Panel name="1">
            标题配置
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="是否显示">
                  <i-switch v-model="chartOption.title.show">
                    <span slot="open"></span>
                    <span slot="close"></span>
                  </i-switch>
                </FormItem>
                <FormItem label="主标题文本">
                  <Input size="small" v-model="chartOption.title.text"/>
                </FormItem>
                <FormItem label="颜色">
                  <ColorPicker size="small" v-model="chartOption.title.textStyle.color" alpha recommend/>
                </FormItem>
                <FormItem label="子标题文本">
                  <Input size="small" v-model="chartOption.title.subtext"/>
                </FormItem>
                <FormItem label="对齐方式">
                  <Select :transfer="true" size="small" v-model="chartOption.title.x">
                    <Option v-for="item in $PnChartDict.textAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Form>
            </div>
          </Panel>
          <Panel name="2">
            图例配置
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="是否显示">
                  <i-switch v-model="chartOption.legend.show">
                    <span slot="open"></span>
                    <span slot="close"></span>
                  </i-switch>
                </FormItem>
                <FormItem label="布局朝向">
                  <Select :transfer="true" size="small" v-model="chartOption.legend.orient">
                    <Option v-for="item in $PnChartDict.orients" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="水平位置">
                  <Select :transfer="true" size="small" v-model="chartOption.legend.left">
                    <Option v-for="item in $PnChartDict.textAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="垂直位置">
                  <Select :transfer="true" size="small" v-model="chartOption.legend.top">
                    <Option v-for="item in $PnChartDict.verticalAligns" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="文本颜色">
                  <ColorPicker size="small" v-model="chartOption.legend.textStyle.color" alpha recommend/>
                </FormItem>
              </Form>
            </div>
          </Panel>
          <Panel name="3">
            提示框
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="格式化">
                  <Input size="small" v-model="chartOption.tooltip.formatter" placeholder=""/>
                </FormItem>
              </Form>
            </div>
          </Panel>
          <Panel name="4">
            标签
            <div slot="content">
              <Form :label-width="100">

                <FormItemPanel title="默认状态">
                  <FormItem label="是否显示">
                    <i-switch v-model="chartOption.series.label.normal.show">
                      <span slot="open"></span>
                      <span slot="close"></span>
                    </i-switch>
                  </FormItem>
                  <FormItem label="标签的位置">
                    <Select :transfer="true" size="small" v-model="chartOption.series.label.normal.position" placement="bottom-end">
                      <Option v-for="item in $PnChartDict.labelPositions" :value="item.value" :label="item.label" :key="item.value">
                        <span>{{ item.label }}</span>
                        <p style="color: #808695;">{{item.remark}}</p>
                      </Option>
                    </Select>
                  </FormItem>
                </FormItemPanel>

                <FormItemPanel title="强调状态">
                  <FormItem label="是否显示">
                    <i-switch v-model="chartOption.series.label.emphasis.show">
                      <span slot="open"></span>
                      <span slot="close"></span>
                    </i-switch>
                  </FormItem>
                </FormItemPanel>

              </Form>
            </div>
          </Panel>
          <Panel name="5">
            标签引导线
            <div slot="content">
              <Form :label-width="100">

                <FormItemPanel title="默认状态">
                  <FormItem label="是否显示">
                    <i-switch v-model="chartOption.series.labelLine.normal.show">
                      <span slot="open"></span>
                      <span slot="close"></span>
                    </i-switch>
                  </FormItem>
                </FormItemPanel>

                <FormItemPanel title="强调状态">
                  <FormItem label="是否显示">
                    <i-switch v-model="chartOption.series.labelLine.emphasis.show">
                      <span slot="open"></span>
                      <span slot="close"></span>
                    </i-switch>
                  </FormItem>
                </FormItemPanel>

              </Form>
            </div>
          </Panel>
          <Panel name="6">
            系列配置
            <div slot="content">
              <Form :label-width="100">
                <FormItem label="南丁格尔图">
                  <Select :transfer="true" size="small" v-model="chartOption.series.roseType" placement="bottom-end">
                    <Option v-for="item in $PnChartDict.pieRoseTypes" :value="item.value" :label="item.label" :key="item.value">
                      <span>{{ item.label }}</span>
                      <p style="color: #808695;">{{item.remark}}</p>
                    </Option>
                  </Select>
                </FormItem>
                <FormItemPanel title="饼图的半径">
                  <Alert type="info">可以将内半径设大显示成圆环图</Alert>
                  <FormItem label="内半径">
                    <Input size="small" v-model="chartOption.series.radius[0]" placeholder=""/>
                  </FormItem>
                  <FormItem label="外半径">
                    <Input size="small" v-model="chartOption.series.radius[1]" placeholder=""/>
                  </FormItem>
                </FormItemPanel>
                <FormItemPanel title="饼图中心坐标">
                  <FormItem label="横坐标">
                    <Input size="small" v-model="chartOption.series.center[0]" placeholder=""/>
                  </FormItem>
                  <FormItem label="纵坐标">
                    <Input size="small" v-model="chartOption.series.center[1]" placeholder=""/>
                  </FormItem>
                </FormItemPanel>
              </Form>
            </div>
          </Panel>


        </Collapse>
      </TabPane>
      <TabPane label="数据源" :style="{paddingTop: '10px'}">
        <DatasourceState targetComp="BasePieChart"></DatasourceState>
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
    name: 'BasePieChartForm',
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

        chartOption: 'component.compConfigData.chartOption'

      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
