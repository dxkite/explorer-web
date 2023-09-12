<template>
  <div class="file-meta">
    <div class="file-title">
      <div class="file-title-item">文件预览</div>
    </div>
    <div class="file-content">
      <codemirror v-model="text" :options="options"/>
    </div>
  </div>
</template>

<script lang="ts">
import { FileMeta, getFileRawLink } from '@/src/api'
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/mode/meta'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/lua/lua'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/python/python'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/shell/shell'

import { ExtCodeMirrorMode } from '@/src/const'

@Component({
  components: {
    codemirror
  }
})
export default class TextView extends Vue {
  get meta () {
    return this.$store.state.pathMeta
  }

  get text () {
    return this.$store.state.text
  }

  get options () {
    return {
      line: true,
      tabSize: 2, // 制表符的宽度
      indentUnit: 2, // 一个块应该缩进多少个空格（无论这在编辑语言中意味着什么）。默认值为 2。
      firstLineNumber: 1, // 从哪个数字开始计算行数。默认值为 1。
      readOnly: false, // 只读
      scrollbarStyle: 'simple',
      autorefresh: true,
      smartIndent: true, // 上下文缩进
      lineNumbers: true, // 是否显示行号
      styleActiveLine: true, // 高亮选中行
      viewportMargin: Infinity, // 处理高度自适应时搭配使用
      showCursorWhenSelecting: true, // 当选择处于活动状态时是否应绘制游标
      mode: this.mode
    }
  }

  get mode () {
    const ext = this.$store.state.pathMeta.ext || ''
    return ExtCodeMirrorMode[ext] || 'shell'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.file-meta {
  background-color: #fff;
  .file-title {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f8f8f8;
  }

  .file-content {
    padding: 8px;
  }
}

.link-text {
  text-decoration: none;
  color: #000;
}
</style>
<style>
.CodeMirror {
  height: auto !important;
}
</style>
