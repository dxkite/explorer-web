<template>
<div class="main">
  <div class="container">
    <Panel @tagClick="onClickTag" :config="config"/>
    <FileList :path="currentPath" :tag="currentTag" :text="currentSearch" class="file-list" @click="onClickFile" @clearTag="onClearTag" @searchTextChange="onSearchTextChange"/>
    <div class="content-view">
      <div class="content-title">
        <PathView :path="currentPath" @click="onClickFile"/>
      </div>
      <div class="content-body">
        <MarkdownView class="markdown-view content-item" v-if="showMarkdown" :path="currentPath"/>
        <MetaView class="content-item" v-if="currentMeta" :meta="currentMeta"/>
      </div>
    </div>
  </div>
  <Footer :config="config"/>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import FileList from '@/components/FileList.vue' // @ is an alias to /src
import { decodeUrlSafeBase64, encodeUrlSafeBase64 } from '@/src/util'
import MarkdownView from '@/components/MarkdownView.vue'
import { FileMeta, getFileMeta, Tag, WebsiteConfig } from '@/src/api'
import Footer from '@/components/Footer.vue'
import Panel from '@/components/Panel.vue'
import MetaView from '@/components/MetaView.vue'
import PathView from '@/components/PathView.vue'
import { RawLocation } from 'vue-router'

@Component({
  components: {
    FileList,
    MarkdownView,
    Footer,
    Panel,
    MetaView,
    PathView
  }
})
export default class Home extends Vue {
  private currentPath = ''
  private currentTag = ''
  private currentSearch = ''

  private detailLoaded = false
  private showMarkdown = false
  private showMarkdownPath = ''

  private currentMeta: FileMeta | null = null

  private config: WebsiteConfig = {
    name: 'dxkite的网站',
    copyrightName: 'dxkite',
    websiteRecord: '湘ICP备20002416号-1',
    websiteRecordLink: 'https://beian.miit.gov.cn/',
    websitePoliceRecord: '湘公网安备 43112602000222号',
    websitePoliceLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43112602000222'
  }

  public mounted () {
    const { path, search, tag } = this.getCurrentRoute()
    this.currentPath = path || '/'
    this.currentTag = tag
    this.currentSearch = search
    this.showDetail(this.currentPath)
  }

  public onClickFile (path: string) {
    if (this.currentPath === path) {
      return
    }
    this.currentPath = path
    this.showDetail(this.currentPath)
  }

  private async showDetail (path: string, fileMeta?: FileMeta) {
    this.detailLoaded = false
    this.showMarkdown = false
    let meta = fileMeta
    if (!fileMeta) {
      meta = await getFileMeta(path)
    }
    if (!meta) {
      console.log('empty meta')
      return
    }
    this.currentMeta = meta
    if (meta.path.toLowerCase().endsWith('.md')) {
      this.currentPath = meta.path
      this.showMarkdownContent(this.currentPath)
    } else if (meta.readme && meta.readme.length > 0) {
      this.currentPath = meta.readme
      this.showMarkdownContent(this.currentPath)
    }
    this.detailLoaded = true
  }

  private showMarkdownContent (path: string) {
    this.showMarkdown = true
    this.showMarkdownPath = path
  }

  private onClickTag (tag: Tag) {
    this.currentTag = tag.name
  }

  @Watch('currentPath')
  @Watch('currentTag')
  @Watch('currentSearch')
  private handleRouteUpdate () {
    if (!this.isRouteChange) {
      return
    }
    this.pushRoute()
  }

  get isRouteChange () {
    const { path, search, tag } = this.getCurrentRoute()
    if (path !== this.currentPath) {
      return true
    }
    if (search !== this.currentSearch) {
      return true
    }
    if (tag !== this.currentTag) {
      return true
    }
    return false
  }

  private getCurrentRoute () {
    let path = this.$route.params.path || ''
    if (path) {
      path = decodeUrlSafeBase64(path)
    }
    const tag = this.$route.query.tag as string || ''
    const search = this.$route.query.search as string || ''
    return { path, tag, search }
  }

  private pushRoute () {
    const location: RawLocation = {
      name: 'Path',
      params: {
        path: encodeUrlSafeBase64(this.currentPath)
      },
      query: {}
    }
    if (this.currentTag && location.query) {
      location.query.tag = this.currentTag
    }
    if (this.currentSearch && location.query) {
      location.query.search = this.currentSearch
    }
    console.log('updateRoute', location)
    this.$router.push(location)
  }

  private onClearTag () {
    this.currentTag = ''
  }

  private onSearchTextChange (text: string) {
    console.log('onSearchTextChange', text)
    this.currentSearch = text
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

    .content-item+.content-item {
      margin-top: 16px;
    }
  }
</style>
