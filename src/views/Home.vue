<template>
  <div class="container">
    <FileList class="file-list" :path="currentPath" @click="onClickFile"/>
    <div class="content-view">
      <div class="content-title">{{ showPath }}</div>
      <div class="content-body">
        <MarkdownView class="markdown-view" v-if="isMarkdown" :path="showPath"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileList from '@/components/FileList.vue' // @ is an alias to /src
import { decodeUrlSafeBase64, encodeUrlSafeBase64 } from '@/src/util'
import MarkdownView from '@/components/MarkdownView.vue'

@Component({
  components: {
    FileList,
    MarkdownView
  }
})
export default class Home extends Vue {
  private currentPath = ''
  private showPath = ''

  public mounted () {
    if (this.$route.params.path.length > 0) {
      this.currentPath = decodeUrlSafeBase64(this.$route.params.path)
    } else {
      this.currentPath = '/'
    }
    this.showPath = this.currentPath
  }

  public onClickFile (path: string) {
    if (this.showPath === path) {
      return
    }

    this.showPath = path
    this.$router.push({
      name: 'Path',
      params: {
        path: encodeUrlSafeBase64(path)
      }
    })
  }

  get isMarkdown () {
    return this.showPath.toLowerCase().endsWith('.md')
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    .content-view {
      flex-grow: 1;
      height: 100vh;
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
