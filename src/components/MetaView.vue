<template>
  <div class="file-meta">
    <div class="file-title">
      <div class="file-title-item">文件信息</div>
      <div class="file-title-item">
        <div v-if="!isDir"><a class="link-text" :href="downloadLink">下载文件</a></div>
      </div>
    </div>
    <div class="file-content">
      <div class="file-content-item">文件路径 {{ path }}</div>
      <div class="file-content-item">更新时间 {{ modTime }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { FileMeta, getFileRawLink } from '@/src/api'
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'

@Component
export default class MetaView extends Vue {
  get meta () {
    return this.$store.state.pathMeta
  }

  private path = ''
  private modTime = ''
  private isDir = false
  private downloadLink = ''

  @Watch('meta')
  private async loadMeta () {
    if (this.meta === null) {
      return
    }
    this.path = this.meta.path
    this.modTime = this.meta.modTime
    this.isDir = this.meta.isDir
    this.downloadLink = await getFileRawLink(this.meta.path)
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
    padding: 8px 16px;
    .file-content-item {
      padding: 4px 0;
    }
  }
}

.link-text {
  text-decoration: none;
  color: #000;
}
</style>
