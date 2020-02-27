<template>
  <div class="">
    <div class="jsoneditor-vue"></div>
  </div>
</template>

<script>
  import 'jsoneditor/dist/jsoneditor.min.css'
  import JsonEditor from 'jsoneditor'
  // 引入颜色采集器组件
  import VanillaPicker from 'vanilla-picker'

  export default {
    props: {
      value: [String, Number, Object, Array],
      mode: {
        type: String,
        default: 'tree'
      },
      modes: {
        type: Array,
        default: function () {
          return ['tree', 'code', 'form', 'text', 'view']
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (!this.internalChange) {
            this.setEditor(val)
          }
        },
        deep: true
      }
    },
    data() {
      return {
        editor: null,
        error: false,
        json: this.value,
        internalChange: false,
      }
    },
    mounted() {
      let self = this;

      let options = {
        mode: this.mode,
        modes: this.modes, // allowed modes
        onColorPicker: function (parent, color, onChange) {
          new VanillaPicker({
            parent: parent,
            color: color,
            onDone: function (color) {
              onChange(color.hex)
            }
          }).show();
        },
        onChange() {
          try {
            let json = self.editor.get();
            self.json = json;
            self.$emit('json-change', json);
            self.internalChange = true;
            self.$emit('input', json);
            self.$nextTick(function () {
              self.internalChange = false
            })
          } catch (e) {
            self.$emit('has-error', e);
          }
        }
      };

      this.editor = new JsonEditor(this.$el.querySelector('.jsoneditor-vue'), options, this.json)
    },
    methods: {

      setEditor(value) {
        if (this.editor)
          this.editor.set(value)
      }
    }
  }
</script>

<style scoped>

</style>
