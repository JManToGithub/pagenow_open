<template xmlns:v-contextmenu="http://www.w3.org/1999/xhtml">
  <div id="AbsoluteLayoutContainer" style="width: 100%; height: 100%; overflow: auto; padding-top: 33px;">
    <div class="canvas-toolbar">
      <div class="float-left">

        <span class="color-white m-l-10px" v-show="$store.state.designer.canvasEnabled">
          <Tooltip content="画布被激活的状态下，即可将组件拖入画布中" :max-width="400">
            <Icon type="md-alert" size="13"/> <span class="m-l-5px" style="text-decoration: underline;">画布已激活组件放置事件</span>
          </Tooltip>
        </span>

      </div>
    </div>
    <div id="zoomArea" style="width: 100%; height: 100%;">
      <div id="AbsoluteLayout"
           class="absolute-layout-canvas"
           :class="buildLayoutClassObj(layout)"
           :style="{
               width: layout.layoutConfigData.width + layout.layoutConfigData.widthPixelUnit,
               height: layout.layoutConfigData.height + layout.layoutConfigData.heightPixelUnit,
               backgroundColor: layout.layoutConfigData.backgroundColor,

               backgroundImage: layout.layoutConfigData.imageRelativePath ? 'url('+canvasBackgroundImageSrc+')': '',
               backgroundRepeat: layout.layoutConfigData.imageRelativePath ? layout.layoutConfigData.imageRepeat: '',
               backgroundSize: layout.layoutConfigData.imageRelativePath ? layout.layoutConfigData.imageSize: ''
             }"
           @click.stop="layoutCanvasClick">

        <div
            v-for="layoutItem in layout.layoutItems"
            :key="layoutItem.id">

          <vue-draggable-resizable :id="'drag-'+layoutItem.id"
                                   :draggable="layoutItem.layoutItemConfigData.draggableEnabled"
                                   :resizable="layoutItem.layoutItemConfigData.draggableEnabled"
                                   :parent="false"
                                   :grid="[layout.layoutConfigData.dragPixel, layout.layoutConfigData.dragPixel]"
                                   :x="layoutItem.layoutItemConfigData.left"
                                   :y="layoutItem.layoutItemConfigData.top"
                                   :w="layoutItem.layoutItemConfigData.width"
                                   :h="layoutItem.layoutItemConfigData.height"
                                   :style="{
                                       zIndex: layoutItem.layoutItemConfigData.zIndex,
                                       display: layoutItem.layoutItemConfigData.display,
                                     }"
                                   @activated="onLayoutItemActivated(layoutItem)" @deactivated="onLayoutItemDeactivated"
                                   @dragging="onLayoutItemDrag" @dragstop="onLayoutItemDragStop"
                                   @resizing="onLayoutItemResize" @resizestop="onLayoutItemResizeStop">
            <div class="absolute-layout-item"
                 :class="buildLayoutItemClassObj(layoutItem)"
                 :id="layoutItem.id"
                 :data-id="layoutItem.id"
                 @click.stop="layoutItemClick(layoutItem, $event)"
                 v-contextmenu:contextmenu>


              <component :is="layoutItem.name" :layoutItem="layoutItem">
                <FuncCompContainer :location="layoutItem.id">
                  <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
                </FuncCompContainer>
              </component>

            </div>
          </vue-draggable-resizable>
        </div>

      </div>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="layoutItemContextMenuClick('menu_unbindComponent')"><Icon type="md-close" /> 解除关联组件</v-contextmenu-item>
      <v-contextmenu-item @click="layoutItemContextMenuClick('menu_delLayoutItem')"><Icon type="md-trash"/> 删除布局块</v-contextmenu-item>
    </v-contextmenu>

  </div>
</template>

<script>

  import Vue from 'vue'

  // 右键菜单组件
  import contentmenu from 'v-contextmenu'
  import '../../../../assets/css/contextmenu.css'
  Vue.use(contentmenu);

  // 引入vue-draggable-resizable
  import VueDraggableResizable from 'vue-draggable-resizable'
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
  Vue.component('vue-draggable-resizable', VueDraggableResizable);

  import FuncCompContainer from '../common/FuncCompContainer'

  import AbsoluteLayoutGlobalMixin from '@/mixin/AbsoluteLayoutGlobalMixin'
  import CanvasDesignerMixin from '@/mixin/CanvasDesignerMixin'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'AbsoluteLayoutCanvas',
    components: {
      FuncCompContainer,
    },
    mixins: [CanvasDesignerMixin, AbsoluteLayoutGlobalMixin],
    data() {
      return {
        tmpCurrentSelectLayoutItemId: '', // 临时存储当前选中布局块的ID

        $AbsoluteLayout: null, // 存储画布JQuery对象
        keepCtrl: false, // 标识当前是否保持按住Ctrl按键（mac下会监听command按键），用于多选布局块时使用
        keepSelectable: false, // 标识当前是否保持按住alt按键，用于框选布局块时使用

      }
    },
    mounted() {

      this.$AbsoluteLayout = $('#AbsoluteLayout');

      // 设计器初始化之后先给画布的放置事件配置scope为compCardScope
      setTimeout(()=>{
        this.$AbsoluteLayout.droppable('option', 'scope', 'compCardScope');
      }, 100);

      this.registerCanvasDrop();
      this.registerLayoutItemDrop();
      this.registerKeyDownAndUp();
      this.registerCanvasNonactivated();

    },
    methods: {

      /**
       * 布局块右键菜单点击事件处理
       * @param name
       */
      layoutItemContextMenuClick (name) {
        let tmpLayoutItemId = this.$store.state.designer.currentSelectLayoutItemId;

        // 删除布局块
        if (name == 'menu_delLayoutItem') {
          this.$Modal.confirm({
            title: '提醒',
            content: '确认删除所选中的布局块吗？',
            onOk: () => {
              let layoutItemIds = [];
              layoutItemIds.pushNoRepeat(tmpLayoutItemId)
              layoutItemIds.forEach(id => {
                this.$store.commit('designer/deleteLayoutItem', id);
                this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
                this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
                this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');

              });
            }
          });
        }
        // 解绑关联组件
        else if (name == 'menu_unbindComponent') {
          this.$Modal.confirm({
            title: '提醒',
            content: '确认解除所选中布局块的关联组件吗？',
            onOk: () => {
              let layoutItemIds = [];
              layoutItemIds.pushNoRepeat(tmpLayoutItemId)
              layoutItemIds.forEach(id => {
                this.$store.commit('designer/deleteComponentByLayoutItemId', id);
                this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '')
              });
            }
          });
        }
      },

      onLayoutItemActivated (layoutItem) {
        // console.log('onLayoutItemActivated');

        this.registerKeyDownAndUp(); // 重新注册键盘监听

        this.tmpCurrentSelectLayoutItemId = layoutItem.id;

        // 点击布局块的时候，清空画布的scope，然后给布局块设置droppable的属性scope为compCardScope，
        // 与组件库拖拽对象的scope对应，这样组件库的拖拽对象就可以放置在当前点击的布局块里
        this.$AbsoluteLayout.droppable('option', 'scope', '');
        $('.absolute-layout-item').droppable('option', 'scope', '');
        $('#'+layoutItem.id).droppable('option', 'scope', 'compCardScope');

        // 如果当前点击的布局块不等于store中存储的currentSelectLayoutItemId，就清空功能组件配置表单
        // (这一段代码是为了解决点击同一个布局块，会刷新功能组件表单的问题)
        if (this.$store.state.designer.currentSelectLayoutItemId != this.tmpCurrentSelectLayoutItemId) {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        }
        // 这里先设置布局块配置表单为NullForm，然后延时50毫秒再加载真实的布局块配置表单。
        // 是为了解决如果配置表单中存在代码编辑器，多个布局块之间来回切换的时候，代码编辑器绑定的数据互相冲突的问题
        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'NullForm');
        setTimeout(()=>{
          this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', layoutItem.name + 'Form');
        }, 50);
        this.$store.commit('designer/setCurrentSelectLayoutItemId', this.tmpCurrentSelectLayoutItemId)
      },

      onLayoutItemDeactivated () {
        // console.log('onLayoutItemDeactivated');
        this.tmpCurrentSelectLayoutItemId = '';

        // 此处关闭右键菜单要设置一段延时，否则在布局块失活时，同步关闭菜单的话，会出现菜单点击无效的情况
        setTimeout(item => {
          this.$refs.contextmenu.hide()
        }, 150)
      },

      onLayoutItemDrag (left, top) {

        this.toggleLayoutItemXyLabel('block', left, top);
        // this.toggleLayoutItemSubline('block');
      },

      onLayoutItemDragStop (left, top) {

        this.toggleLayoutItemXyLabel('none', left, top);
        // this.toggleLayoutItemSubline('none');

        let currentLayoutItem = this.$store.getters['designer/getLayoutItemById'](this.tmpCurrentSelectLayoutItemId);

        let offsetLeft = left - currentLayoutItem.layoutItemConfigData.left; // 左偏移
        let offsetTop = top - currentLayoutItem.layoutItemConfigData.top; // 右偏移

        this.$store.commit('designer/setLayoutItemLeftAndTop', {id: this.tmpCurrentSelectLayoutItemId, left: left, top: top});

      },

      onLayoutItemResize (left, top, width, height) {

      },

      onLayoutItemResizeStop (left, top, width, height) {
        // console.log('onLayoutItemResizeStop');
        this.$store.commit('designer/setLayoutItemWidthAndHeight',
          {id: this.tmpCurrentSelectLayoutItemId, width: width, height: height});
      },

      toggleLayoutItemXyLabel (display, x, y) {
        $("#"+this.tmpCurrentSelectLayoutItemId).find('.xy_label').css('display', display);
        $('#'+this.tmpCurrentSelectLayoutItemId + ' .xy_label .x').text(x);
        $('#'+this.tmpCurrentSelectLayoutItemId + ' .xy_label .y').text(y);
      },

      /**
       * 切换显示布局块辅助线
       */
      toggleLayoutItemSubline (display) {
        $("#"+this.tmpCurrentSelectLayoutItemId).find('.item_subline_h').css('display', display);
        $("#"+this.tmpCurrentSelectLayoutItemId).find('.item_subline_v').css('display', display);
      },

      /**
       * 注销画布框选监听
       */
      disableSelectable () {
        this.$AbsoluteLayout.selectable("disable");
        this.keepSelectable = false;
      },

      /**
       * 注册画布失活监听
       */
      registerCanvasNonactivated () {
        let func = () => {
          $(document).unbind('keydown');
          $(document).unbind('keyup');
        };
        this.$EventBus.$on('headerClick', func);
        this.$EventBus.$on('footerClick', func);
        this.$EventBus.$on('leftSidebarClick', func);
        this.$EventBus.$on('rightSidebarClick', func);
      },

      /**
       * 移动布局块，移动的偏移量是根据画布设置的（拖拽单位像素）指定的
       * direction 方向
       */
      moveLayoutItem (direction) {

        if (direction == 'left') {
          if(this.$store.state.designer.currentSelectLayoutItemId) {
            this.$store.commit('designer/setLayoutItemLeftAndTopOffset', {
              id: this.$store.state.designer.currentSelectLayoutItemId,
              direction: 'left',
              offset: -this.layout.layoutConfigData.dragPixel
            })
          }
        } else if (direction == 'top') {
          if(this.$store.state.designer.currentSelectLayoutItemId) {
            this.$store.commit('designer/setLayoutItemLeftAndTopOffset',
              {
                id: this.$store.state.designer.currentSelectLayoutItemId,
                direction: 'top',
                offset: -this.layout.layoutConfigData.dragPixel
              });
          }
        } else if (direction == 'right') {
          if(this.$store.state.designer.currentSelectLayoutItemId) {
            this.$store.commit('designer/setLayoutItemLeftAndTopOffset',
              {
                id: this.$store.state.designer.currentSelectLayoutItemId,
                direction: 'left',
                offset: +this.layout.layoutConfigData.dragPixel
              });
          }
        } else if (direction == 'bottom') {
          if(this.$store.state.designer.currentSelectLayoutItemId) {
            this.$store.commit('designer/setLayoutItemLeftAndTopOffset',
              {
                id: this.$store.state.designer.currentSelectLayoutItemId,
                direction: 'top',
                offset: +this.layout.layoutConfigData.dragPixel
              });
          }
        }

      },

      /**
       * 注册监听键盘按键
       */
      registerKeyDownAndUp () {
        let _this = this;

        $(document).unbind('keydown');
        $(document).unbind('keyup');

        this.registerKeyCtrlAndS();

        $(document).bind("keydown", function(e) {

          let keyCode = event.keyCode || event.which || event.charCode;
          let ctrlKey = event.ctrlKey || event.metaKey;

          // ctrl + a 全选组合键
          if(ctrlKey && keyCode == 65) {
            event.preventDefault();
            let ids = [];
            _this.layout.layoutItems.forEach(item => {
              if (item.layoutItemConfigData.display == 'block') {
                ids.pushNoRepeat(item.id)
              }
            });
          }

          if (e.keyCode == 37) { // 方向左键
            // 判断如果当前移动的是组，那么就不需要再执行moveLayoutItem
            _this.moveLayoutItem('left');
            e.preventDefault()
          }
          else if(e.keyCode == 38) { // 方向上键
            _this.moveLayoutItem('top');
            e.preventDefault()
          }
          else if(e.keyCode == 39) { // 方向右键
            _this.moveLayoutItem('right');
            e.preventDefault()
          }
          else if(e.keyCode == 40) { // 方向下键
            _this.moveLayoutItem('bottom');
            e.preventDefault()
          }
        });
        $(document).bind("keyup", function(e) {
          if(_this.$PnUtil.isMac()) {
            if(e.keyCode == 91) { // Command键
              _this.keepCtrl = false;
            }
            if(e.keyCode == 18) {
              _this.disableSelectable()
            }
          }else if(_this.$PnUtil.isWindows()) {
            if(e.keyCode == 17) { // Ctrl键
              _this.keepCtrl = false;
            }
            if(e.keyCode == 18) {
              _this.disableSelectable()
            }
          }
        });

      },

      /**
       * 注册画布放置监听
       */
      registerCanvasDrop () {
        let _this = this;

        $("#AbsoluteLayout").droppable({
          accept: ".comp-card",
          drop: (e, ui) => {
            let compName = ui.draggable[0].attributes['data-component'].nodeValue;

            // 判断是否放置的是布局块组件
            if (compName == 'DefaultLayoutItem') {

              _this.$store.commit('designer/addLayoutItem', this.$PnDesigner.buildAbsoluteLayoutItem());
            }else {

              let newLayoutItem = _this.$PnDesigner.buildAbsoluteLayoutItem();

              let component = {
                id: _this.$PnUtil.uuid(),
                name: compName,
                compConfigData: ''
              };

              const componentsContext = require.context('../../../../components/', true, /\.vue$/);

              componentsContext.keys().forEach(fileName => {
                const componentConfig = componentsContext(fileName);

                if(componentConfig.default.name == compName) {
                  const compInst = require('../../../../components/'+fileName.slice(2, fileName.length));
                  component.compConfigData = Object.assign({}, compInst.default.attr.configDataTemp)
                }
              });

              newLayoutItem.component = component;

              _this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
              _this.$store.commit('designer/addLayoutItem', newLayoutItem);

            }

          }
        });
      },

      /**
       * 注册布局块放置监听
       */
      registerLayoutItemDrop() {
        let _this = this;

        // 必须设置延迟，否则将无法正常给动态新增的布局块添加拖拽等事件
        setTimeout(() => {

          // 注册布局块放置监听
          $(".absolute-layout-item").droppable({
            accept: ".comp-card",
            // activeClass: "layout-item-drop-active",
            // hoverClass: "layout-item-drop-hover",
            drop: (e, ui) => {

              let layoutItemId = e.target.attributes['data-id'].nodeValue;
              let compName = ui.draggable[0].attributes['data-component'].nodeValue;

              if (compName == 'DefaultLayoutItem') {
                _this.$Message.warning('布局块不可多层嵌套！')
              }else {
                let addComponent = function (_layoutItemId) {
                  let component = {
                    id: _this.$PnUtil.uuid(),
                    name: compName,
                    compConfigData: ''
                  };
                  const componentsContext = require.context('../../../../components/', true, /\.vue$/);

                  componentsContext.keys().forEach(fileName => {
                    const componentConfig = componentsContext(fileName);

                    if(componentConfig.default.name == compName) {
                      const compInst = require('../../../../components/'+fileName.slice(2, fileName.length));
                      component.compConfigData = Object.assign({}, compInst.default.attr.configDataTemp)
                    }
                  });

                  _this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
                  _this.$store.commit('designer/addComponentToLayoutItem', {
                    layoutItemId: _layoutItemId,
                    component: component
                  })
                };

                let storeLayoutItem = this.$store.getters['designer/getLayoutItemById'](layoutItemId);
                if (storeLayoutItem.component.id) {
                  this.$Modal.confirm({
                    title: '提醒',
                    content: '目标布局块已关联组件，是否要覆盖？',
                    okText: '覆盖',
                    onOk: () => {
                      addComponent(layoutItemId)
                    }
                  })
                }else {
                  addComponent(layoutItemId)
                }
              }

            }
          });

        }, 100);

      },

      /**
       * 画布点击事件监听
       */
      layoutCanvasClick () {
        // console.log('layoutCanvasClick');

        // 设置画布激活状态为true
        this.$store.commit('designer/setCanvasEnabled', true);

        // 清空所有布局块的scope，然后给画布的放置配置设置scope为compCardScope
        $('.absolute-layout-item').droppable('option', 'scope', '');
        this.$AbsoluteLayout.droppable('option', 'scope', 'compCardScope');

        if (!this.tmpCurrentSelectLayoutItemId && !this.keepSelectable) {
          this.registerKeyDownAndUp(); // 重新注册键盘监听

          this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
          this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
        }
      },

      /**
       * 布局块点击事件监听
       * @param layoutItem
       * @param event
       */
      layoutItemClick(layoutItem, event) {

        // 设置画布激活状态为false
        this.$store.commit('designer/setCanvasEnabled', false);

        this.$refs.contextmenu.hide();

      },

      buildLayoutClassObj (layout) {
        let clazz = '';
        if(layout.layoutConfigData.showGrid) {
          clazz += layout.layoutConfigData.canvasGridClass + ' '
        }
        return clazz
      },

      buildLayoutItemClassObj (layoutItem) {

        if (this.$store.state.designer.currentSelectLayoutItemId == layoutItem.id &&
          this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'black') {
          return 'activeBlack'
        }
        if (this.$store.state.designer.currentSelectLayoutItemId == layoutItem.id &&
          this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'white') {
          return 'activeWhite'
        }

        if (this.$store.state.designer.currentHoverLayoutItemId == layoutItem.id) {
          if (this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'black') {
            return 'activeBlack'
          }else if (this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'white') {
            return 'activeWhite'
          }
        }

        return ''
      },

      buildGroupItemClassObj (groupItem) {
        if (this.$store.state.designer.currentSelectGroupItemId == groupItem.id) {
          return 'active'
        }

        if (this.$store.state.designer.currentHoverGroupItemId == groupItem.id) {
          return 'active'
        }

        return ''
      }

    },
    computed: {
      ...mapFields({
        layout: 'pageMetadata.layout',
        currentSelectLayoutItemId: 'currentSelectLayoutItemId',
        canvasEnabled: 'canvasEnabled'
      })
    },
    watch: {
      'layout.layoutItems': {
        handler: 'registerLayoutItemDrop'
      },
      'currentSelectLayoutItemId': {
        handler: function (val) {
          if (val) {
            // 点击布局块的时候，清空画布的scope，然后给布局块设置droppable的属性scope为compCardScope，
            // 与组件库拖拽对象的scope对应，这样组件库的拖拽对象就可以放置在当前点击的布局块里
            this.$AbsoluteLayout.droppable('option', 'scope', '');
            $('.absolute-layout-item').droppable('option', 'scope', '');
            $('#'+val).droppable('option', 'scope', 'compCardScope');
            if (this.canvasEnabled) {
              // 设置画布激活状态为false
              this.$store.commit('designer/setCanvasEnabled', false);
            }
          }
        }
      },
      // 监听画布是否被激活状态
      'canvasEnabled': {
        handler: function (val) {
          if (val) {
            // 清空所有布局块的scope，然后给画布的放置配置设置scope为compCardScope
            $('.absolute-layout-item').droppable('option', 'scope', '');
            this.$AbsoluteLayout.droppable('option', 'scope', 'compCardScope');
          }
        }
      }
    }
  }
</script>

<style scoped>

  .canvas-toolbar {
    width: 100%;
    height: 33px;
    border-bottom: 1px solid #424242;
    background-color: #616161;
    position: fixed;
    top: 48px;
    z-index: 3;
    line-height: 31px;
    padding-left: 20px;
  }

  .absolute-layout-canvas {
    position: relative;
  }

  .absolute-layout-item {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .absolute-layout-item.activeBlack {
    box-shadow: 0 0 10px #000;
    outline: 1px solid #18ffff;
  }
  .absolute-layout-item.activeWhite {
    box-shadow: 0 0 10px #FFF;
    outline: 1px solid #18ffff;
  }

  .ivu-cell i {
    font-size: 16px;
    margin-top: -2px;
  }

</style>
