<template>
<div class="main">
  <div class="container">
    <FileList :path="currentPath"  class="file-list" @click="onClickFile"/>
    <div class="content-view">
      <div class="content-title">{{ showPath }}</div>
      <div class="content-body">
        <MarkdownView class="markdown-view" v-if="showMarkdown" :path="showPath"/>
      </div>
    </div>
  </div>
  <Footer/>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileList from '@/components/FileList.vue' // @ is an alias to /src
import { decodeUrlSafeBase64, encodeUrlSafeBase64 } from '@/src/util'
import MarkdownView from '@/components/MarkdownView.vue'
import { getFileMeta } from '@/src/api'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    FileList,
    MarkdownView,
    Footer
  }
})
export default class Home extends Vue {
  private currentPath = ''
  private showPath = ''
  private detailLoaded = false
  private showMarkdown = false
  private showMarkdownPath = ''

  public mounted () {
    if (this.$route.params.path.length > 0) {
      this.currentPath = decodeUrlSafeBase64(this.$route.params.path)
    } else {
      this.currentPath = '/'
    }
    this.showPath = this.currentPath
    this.showDetail(this.showPath)
  }

  public onClickFile (path: string) {
    if (this.showPath === path) {
      return
    }
    this.showPath = path
    this.showDetail(this.showPath)
    this.$router.push({
      name: 'Path',
      params: {
        path: encodeUrlSafeBase64(path)
      }
    })
  }

  private async showDetail (path: string) {
    this.detailLoaded = false
    this.showMarkdown = false
    const meta = await getFileMeta(path)
    if (meta.path.toLowerCase().endsWith('.md')) {
      this.showPath = meta.path
      this.showMarkdownContent(this.showPath)
    } else if (meta.readme && meta.readme.length > 0) {
      this.showPath = meta.readme
      this.showMarkdownContent(this.showPath)
    }
    this.detailLoaded = true
  }

  private showMarkdownContent (path: string) {
    this.showMarkdown = true
    this.showMarkdownPath = path
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    height: calc(100vh - 36px);

    .file-list {
      width: 300px;
    }

    .content-view {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      width: 60%;

      .content-title {
        padding: 16px;
        line-height: 24px;
      }

      .content-body {
        padding: 24px;
        background-color: #f8f8f8;
        overflow-y: auto;
        flex-grow: 1;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          background-color: #fcfcfc;
        }

        &::-webkit-scrollbar-thumb {
          background: #f8f8f8;
        }
      }
    }

    .markdown-view {
      padding: 24px;
      background-color: #ffffff;
    }
  }
</style>
