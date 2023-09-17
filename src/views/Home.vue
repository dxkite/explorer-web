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
        <TextView class="content-item" v-if="showText"/>
        <VideoView class="content-item" v-if="isVideo"/>
        <RecentView class="content-item" v-if="showRecent"/>
        <MetaView class="content-item"/>
      </div>
    </div>
  </div>
  <Footer />
</div>
</template>
<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import FileList from '@/components/FileList.vue'
import Footer from '@/components/Footer.vue'
import Panel from '@/components/Panel.vue'
import MetaView from '@/components/MetaView.vue'
import PathView from '@/components/PathView.vue'
import { RawLocation } from 'vue-router'

const MarkdownView = defineAsyncComponent(() => {
  return import('@/components/MarkdownView.vue')
})

const TextView = defineAsyncComponent(() => {
  return import('@/components/TextView.vue')
})

const VideoView = defineAsyncComponent(() => {
  return import('@/components/VideoView.vue')
})

const RecentView = defineAsyncComponent(() => {
  return import('@/components/RecentView.vue')
})

@Component({
  components: {
    FileList,
    MarkdownView,
    TextView,
    Footer,
    Panel,
    MetaView,
    PathView,
    VideoView,
    RecentView
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
    return this.$store.state.markdown.length > 0
  }

  get showText () {
    return this.$store.state.text.length > 0
  }

  get showRecent () {
    return this.$store.state.recentList.length > 0 && this.$store.getters.hasPreviousPath === false
  }

  get isVideo () {
    return this.$store.getters.isVideo
  }

  public mounted () {
    const { path, search, tag } = this.getCurrentRoute()
    this.$store.dispatch('load', { path, search, tag })
    const name = this.$store.state.config.name
    this.setTitle(name)
    this.$store.dispatch('loadRecent')
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

  @Watch('$route')
  private onRouteChange () {
    const { path, search, tag } = this.getCurrentRoute()
    this.$store.dispatch('load', { path, search, tag })
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

    const name = this.$store.state.config.name

    this.setTitle([name, this.path].join(' - '))
  }

  private setTitle (title: string) {
    document.title = title
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/layout.scss";
</style>
