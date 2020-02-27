<!--设计器数据源配置表单-->

<template>
  <div class="">
    <Form :label-width="105">
      <FormItem class="m-b-5px" label="数据源类型">
        <Select v-model="ds_type" >
          <Option v-for="item in $PnDict.dsTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>

      <FormItemPanel title="数据结果集应为一个数组，数组元素应该包含如下字段">
        <Table size="small" :columns="tableColumns" :data="tableData"></Table>
      </FormItemPanel>
      <!--
      <strong>数据结果集应为一个数组，数组元素应该包含如下字段</strong>
      -->

      <FormItemPanel v-show="ds_type == 'static'" title="静态数据结果集编辑">
        <Button class="m-b-5px" size="small" type="primary" :style="{float: 'right'}" @click="resetDefaultResultObj">恢复默认数据</Button>
        <div class="clearfix"></div>
        <CodeEditor v-model="resultObjData" model="json" :on-blur="updateResultObj"></CodeEditor>
      </FormItemPanel>

      <FormItemPanel v-show="ds_type == 'api'">

        <Timeline pending>
          <TimelineItem>
            <p class="time-line-item-label">接口地址</p>
            <Input v-model="apiPathData" type="textarea" :rows="4" placeholder="例：http://api?param=:param" @on-blur="updateApiPath"/>
            <Checkbox class="m-t-5px m-b-5px" v-model="ds_useHttpServerProxy">服务器代理请求（因跨域无法请求时使用）</Checkbox>

            <!--URL联动参数配置-->
            <Alert class="m-t-5px" v-show="linkageUrlParamsFormData.items.length == 0" type="info" show-icon>
              当前未配置相关URL联动参数，配置联动参数可动态将当前URL的参数信息合并至接口地址中。
            </Alert>
            <Form class="m-t-5px" :model="linkageUrlParamsFormData" :label-width="60" style="width: 300px">

              <FormItem
                  v-for="(item, index) in linkageUrlParamsFormData.items"
                  :key="item.id"
                  :label="'联动参数'"
              >
                <i-col span="18">
                  <Input size="small" type="text" v-model="item.field" @on-blur="updateLinkageUrlParams" placeholder="必填，请输入联动参数名"/>
                </i-col>
                <i-col span="4" offset="1">
                  <Button size="small" type="error" @click="handleRemove(index)"><Icon type="md-trash"></Icon></Button>
                </i-col>
              </FormItem>
              <FormItem>
                <Row>
                  <i-col span="12">
                    <Button size="small" type="dashed" long @click="handleAdd" icon="md-add">添加联动参数</Button>
                  </i-col>
                </Row>
              </FormItem>
            </Form>
            <!--URL联动参数配置 end-->
          </TimelineItem>
          <TimelineItem :color="invokeError?'red':'green'">
            <p class="time-line-item-label">
              响应结果集(只读)
              <Tooltip content="刷新" placement="top">
                <a href="javascript:;" @click="invokeApiPath"><Icon type="md-refresh" size="15"/></a>
              </Tooltip>
            </p>
            <CodeEditor v-model="resultObjData" mode="json" :readOnly="true"></CodeEditor>
          </TimelineItem>

        </Timeline>
      </FormItemPanel>

    </Form>

  </div>
</template>

<script>

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'DatasourceSettingForm',
    components: {

    },
    props: {
      targetComp: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

        invokeError: false,

        tableColumns: [
          {
            type: 'index',
            width: 30,
            align: 'center'
          },
          {
            title: '字段',
            key: 'field'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],

        resultObjData: '',
        resultObjDataFromFilter: '',
        apiPathData: '',

        linkageUrlParamsFormData: {
          items: [

          ]
        },

      }
    },
    mounted() {

      this.resultObjData = JSON.stringify(this.ds_resultObj, null, 2);

      if (this.ds_type == 'api') {
        this.apiPathData = this.ds_apiPath
      }

      this.linkageUrlParamsFormData.items = this.$PnUtil.deepClone(this.ds_linkageUrlParams);

    },
    methods: {

      resetDefaultResultObj () {
        if (this.targetComp) {
          let compConfigData = this.$PnUtil.getCompConfigData(this.targetComp);
          this.resultObjData = JSON.stringify(compConfigData.ds_resultObj, null, 2);
          this.updateResultObj()
        }else {
          this.$Message.error('找不到目标组件')
        }
      },


      updateResultObj () {
        this.$store.commit('designer/updateLayoutItem', {
          path: 'component.compConfigData.ds_resultObj',
          value: JSON.parse(this.resultObjData)
        });
      },

      updateApiPath () {
        this.$store.commit('designer/updateLayoutItem', {
          path: 'component.compConfigData.ds_apiPath',
          value: this.apiPathData
        });
        this.invokeApiPath()
      },

      invokeApiPath () {
        let successHandler = (data) => {
          this.resultObjData = JSON.stringify(data, null, 2);
          this.$store.commit('designer/updateLayoutItem', {
            path: 'component.compConfigData.ds_resultObj',
            value: data
          });
          this.invokeError = false;
        };
        let errorHandler = (error) => {
          this.invokeError = true;
          this.resultObjData = JSON.stringify(error, null, 2)
        };
        // 判断是否使用服务器代理调用
        if (this.ds_useHttpServerProxy) {
          this.$PnApi.HttpProxyApi.httpGet(this.$PnUtil.buildApiPath(this.apiPathData, this.ds_linkageUrlParams)).then(result => {
            successHandler(result.data)
          }).catch(error => {
            errorHandler(error)
          })
        }else {
          this.$PnApi.getData(this.$PnUtil.buildApiPath(this.apiPathData, this.ds_linkageUrlParams)).then(result=>{
            successHandler(result.data)
          }).catch(error=>{
            errorHandler(error)
          })
        }
      },

      /*****************URL联动参数配置相关操作****************/

      handleAdd () {
        this.linkageUrlParamsFormData.items.push({
          id: this.$PnUtil.uuid(),
          field: ''
        });
      },

      handleRemove (index) {
        if(this.linkageUrlParamsFormData.items.length > 1) {
          this.linkageUrlParamsFormData.items.splice(index, 1);
        }else {
          this.linkageUrlParamsFormData.items = []
        }
        this.updateLinkageUrlParams()
      },

      updateLinkageUrlParams () {
        let showErrorMsg = false;
        this.linkageUrlParamsFormData.items.forEach(item=>{
          if(!item.field) {
            showErrorMsg = true
          }
        });
        if (showErrorMsg) {
          this.$Message.warning({
            content: '联动参数数据存在空值项，请检查！',
            duration: 10
          })
        }else {
          this.$store.commit('designer/updateLayoutItem', {
            path: 'component.compConfigData.ds_linkageUrlParams',
            value: this.$PnUtil.deepClone(this.linkageUrlParamsFormData.items)
          });
        }
      },

      /*****************URL联动参数配置相关操作 end****************/



    },
    computed: {
      ...mapFields({

        text: 'component.compConfigData.text',

        ds_type: 'component.compConfigData.ds_type',
        ds_apiPath: 'component.compConfigData.ds_apiPath',

        ds_resultObjTemplate: 'component.compConfigData.ds_resultObjTemplate',
        ds_resultObj: 'component.compConfigData.ds_resultObj',

        ds_linkageUrlParams: 'component.compConfigData.ds_linkageUrlParams',

        ds_useHttpServerProxy: 'component.compConfigData.ds_useHttpServerProxy',

      }),

      tableData () {
        let arr = [];
        this.ds_resultObjTemplate.forEach(item=>{
          arr.push({
            field: item.field,
            remark: item.remark
          })
        });
        return arr;
      }
    },
    watch: {
      'ds_type': {
        handler: function () {
          if (this.ds_type == 'static') {
            this.resultObjData = JSON.stringify(this.ds_resultObj, null, 2)
          }
        }
      },
      'ds_resultObj': {
        handler: function () {
          this.resultObjData = JSON.stringify(this.ds_resultObj, null, 2)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  >>> .ivu-timeline-item-tail {
    border-left: 1px solid #bdbdbd !important;
  }

  .ivu-form-item {
    margin-bottom: 5px;
  }

  .time-line-item-label {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>
