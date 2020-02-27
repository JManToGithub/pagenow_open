<template>
  <div class="datasource-state">
    <Button size="small" type="primary" :style="{position: 'absolute', top: '10px', right: '10px', zIndex: 2}"
            @click="datasourceSettingFormDrawerVisible = !datasourceSettingFormDrawerVisible">数据源配置</Button>
    <FormItemPanel>

      <Timeline pending>
        <TimelineItem>
          <p>数据源类型：<Tag color="blue">{{ds_type}}</Tag></p>
        </TimelineItem>

        <TimelineItem v-show="ds_type == 'api'">
          <p>接口地址 <Tag color="cyan" v-show="ds_useHttpServerProxy">服务器代理调用</Tag></p>
          <Alert class="m-t-5px m-b-5px" :type="ds_apiPath ? 'info': 'warning'" :style="{padding: '10px 10px 10px 10px'}">
            <p>{{ds_apiPath ? ds_apiPath : '未配置接口地址，默认使用上一次结果集数据'}}</p>
          </Alert>
          <Tag color="green" v-for="item in ds_linkageUrlParams" :key="item.id">{{item.field}}</Tag>
        </TimelineItem>

        <TimelineItem :color="errorAlertVisible?'red':'green'">
          <p>返回结果（只读）</p>
          <Alert v-show="errorAlertVisible" class="m-t-5px m-b-5px" type="error">
            <p>{{errorMsg}}</p>
          </Alert>
          <div class="m-b-5px"></div>
          <CodeEditor v-model="resultObjData" :readOnly="true"></CodeEditor>
        </TimelineItem>
      </Timeline>

    </FormItemPanel>


    <Drawer
        title="数据源配置"
        v-model="datasourceSettingFormDrawerVisible"
        width="530"
        :mask-closable="true">
      <DatasourceSettingForm :targetComp="targetComp"></DatasourceSettingForm>
    </Drawer>

  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: '',
    props: {
      targetComp: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        datasourceSettingFormDrawerVisible: false,
        resultObjData: '',

        errorAlertVisible: false,
        errorMsg: '',
      }
    },
    mounted() {
      this.resultObjData = JSON.stringify(this.ds_resultObj, null, 2);

      this.invokeApiPath();
    },
    methods: {
      invokeApiPath () {
        if(this.ds_type == 'api' && this.ds_apiPath) {
          if (this.ds_useHttpServerProxy) {
            this.$PnApi.HttpProxyApi.httpGet(this.$PnUtil.buildApiPath(this.ds_apiPath, this.ds_linkageUrlParams)).then(result=>{
              this.errorAlertVisible = false
            }).catch(error=>{
              this.errorAlertVisible = true;
              this.errorMsg = JSON.stringify(error, null, 2)
            })
          }else {
            this.$PnApi.getData(this.$PnUtil.buildApiPath(this.ds_apiPath, this.ds_linkageUrlParams)).then(result=>{
              this.errorAlertVisible = false
            }).catch(error=>{
              this.errorAlertVisible = true;
              this.errorMsg = JSON.stringify(error, null, 2)
            })
          }
        }
      },
    },
    computed: {
      ...mapFields({

        ds_type: 'component.compConfigData.ds_type',
        ds_apiPath: 'component.compConfigData.ds_apiPath',

        ds_resultObj: 'component.compConfigData.ds_resultObj',

        ds_linkageUrlParams: 'component.compConfigData.ds_linkageUrlParams',

        ds_useHttpServerProxy: 'component.compConfigData.ds_useHttpServerProxy',

      }),
    },
    watch: {
      'ds_apiPath': {
        handler: function () {
          this.invokeApiPath()
        }
      },
      'ds_resultObj': {
        handler: function () {
          this.resultObjData = JSON.stringify(this.ds_resultObj, null, 2);
        }
      },
    }
  }
</script>

<style scoped>

  .datasource-state {
    position: relative;
  }

  >>> .ivu-timeline-item-tail {
    border-left: 1px solid #bdbdbd !important;
  }
  >>> .ivu-timeline-item {
    padding: 0 0 0 0 !important;
  }
  >>> .ivu-timeline-item-content {
    min-height: inherit !important;
  }
</style>
