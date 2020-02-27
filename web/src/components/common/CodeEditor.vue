<template>
  <div class="ace-container">
    <div class="ace-editor" ref="ace"></div>

  </div>
</template>

<script>

  import ace from 'ace-builds'
  import 'ace-builds/src-noconflict/snippets/javascript'
  import 'ace-builds/src-noconflict/snippets/html'
  import 'ace-builds/src-noconflict/snippets/css'
  import 'ace-builds/src-noconflict/snippets/scss'
  import 'ace-builds/src-noconflict/snippets/json'
  import 'ace-builds/src-noconflict/snippets/java'
  import 'ace-builds/src-noconflict/snippets/text'
  import 'ace-builds/src-noconflict/snippets/sql'
  import 'ace-builds/webpack-resolver'
  import 'ace-builds/src-noconflict/ext-language_tools'
  import 'ace-builds/src-noconflict/theme-monokai'
  import 'ace-builds/src-noconflict/mode-javascript'

  const modeArray = [
    {
      name: 'js',
      path: 'ace/mode/javascript'
    }, {
      name: 'html',
      path: 'ace/mode/html'
    }, {
      name: 'css',
      path: 'ace/mode/css'
    }, {
      name: 'scss',
      path: 'ace/mode/scss'
    }, {
      name: 'json',
      path: 'ace/mode/json'
    }, {
      name: 'java',
      path: 'ace/mode/java'
    }, {
      name: 'text',
      path: 'ace/mode/text'
    }, {
      name: 'sql',
      path: 'ace/mode/sql'
    }
  ];

  export default {
    props: {
      value: String,
      mode: String,
      onBlur: {
        type: Function
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this.mode) {
        modeArray.forEach(item => {
          if (item.name == this.mode) {
            this.modePath = item.path
          }
        });
      } else {
        this.modePath = 'ace/mode/javascript'
      }

      this.aceEditor = ace.edit(this.$refs.ace, {
        maxLines: 20,
        minLines: 6,
        fontSize: 14,
        value: this.currentValue ? this.currentValue : '',
        theme: this.themePath,
        mode: this.modePath,
        wrap: this.wrap,
        tabSize: 2,
        readOnly: this.currentReadOnly
      });

      // 激活自动提示
      this.aceEditor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true
      });

      this.aceEditor.getSession().on('change', this.change);
      if(this.onBlur) {
        this.aceEditor.on('blur', this.onBlur)
      }

    },
    destroy() {
      this.aceEditor.destroy();
      this.aceEditor.container.remove();
    },
    data() {
      return {
        currentValue: this.value,
        contentBackup: '',
        aceEditor: null,
        wrap: false,
        themePath: 'ace/theme/monokai',
        modePath: '',
        modeArray: modeArray,
        currentReadOnly: this.readOnly
      }
    },
    methods: {
      change() {
        let content = this.aceEditor.getSession().getValue();
        this.$emit('input', content);
        this.contentBackup = content;
      }
    },
    watch: {
      value(val) {
        if (this.contentBackup !== val) {
          this.aceEditor.session.setValue(val, 1);
          this.contentBackup = val;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .ace-container {
    position: relative;

    .ace-toolbar-container {
      width: 100%;
      height: 20px;
      background-color: #2F3129;
      position: inherit;
      bottom: 0px;
      line-height: 20px;
      padding: 0px 5px 0px 5px;

      .ace-toolbar {
        float: right;
      }
    }
  }

</style>
