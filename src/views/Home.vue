<template>
<div class="main">
  <div class="container">
    <Panel />
    <FileList class="file-list"/>
    <div class="content-view">
      <div class="content-title">
        <PathView />
      </div>
      <div class="content-body">
        <MarkdownView class="markdown-view content-item" v-if="showMarkdown"/>
        <MetaView class="content-item"/>
      </div>
    </div>
  </div>
  <Footer />
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import FileList from '@/components/FileList.vue' // @ is an alias to /src
import MarkdownView from '@/components/MarkdownView.vue'
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
  get tag () {
    return this.$store.state.searchTag
  }

  get path (): string {
    return this.$store.state.path
  }

  get search () {
    return this.$store.state.search
  }

  get showMarkdown () {
    return this.$store.state.markdown.show
  }

  public mounted () {
    const { path, search, tag } = this.getCurrentRoute()
    this.$store.dispatch('load', { path, search, tag })
  }

  @Watch('path')
  @Watch('search')
  @Watch('tag')
  private handleRouteUpdate () {
    if (!this.isRouteChange) {
      return
    }
    this.pushRoute()
  }

  get isRouteChange () {
    const { path, search, tag } = this.getCurrentRoute()
    if (path !== this.path) {
      return true
    }
    if (search !== this.search) {
      return true
    }
    if (tag !== this.tag) {
      return true
    }
    return false
  }

  private getCurrentRoute () {
    const path = this.$route.params.path || '/'
    const tag = this.$route.query.tag as string || ''
    const search = this.$route.query.search as string || ''
    return { path, tag, search }
  }

  private pushRoute () {
    const location: RawLocation = {
      name: 'Path',
      params: {
        path: this.path
      },
      query: {}
    }
    if (this.tag && location.query) {
      location.query.tag = this.tag
    }
    if (this.search && location.query) {
      location.query.search = this.search
    }
    console.log('updateRoute', location)
    this.$router.push(location)
  }

  private setTitle (title: string) {
    document.title = title
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/layout.scss";
</style>
