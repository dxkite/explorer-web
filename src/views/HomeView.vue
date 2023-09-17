<template>
  <div class="main">
    <div class="container">
      <Panel />
      <FileList class="file-list" />
      <div class="content-view">
        <div class="content-title">
          <PathView />
        </div>
        <div class="content-body">
          <MarkdownView class="markdown-view content-item" v-if="showMarkdown" />
          <!-- 
          <TextView class="content-item" v-if="showText"/>
          <VideoView class="content-item" v-if="isVideo"/>-->
          <MetaView class="content-item" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, watch } from 'vue'
import FileList from '@/components/FileList.vue'
import Footer from '@/components/FooterView.vue'
import Panel from '@/components/PanelView.vue'
import MetaView from '@/components/MetaView.vue'
import PathView from '@/components/PathView.vue'
import { useMainStore } from '@/store/main';
import router from '@/router'
import { RouteLocation, RouteLocationRaw } from 'vue-router'

const MarkdownView = defineAsyncComponent(() => import('@/components/MarkdownView.vue'))

const currentRoute = router.currentRoute

const mainStore = useMainStore();

const setTitle = (title: string) => {
  document.title = title
}

const tag = computed(() => mainStore.searchTag)
const search = computed(() => mainStore.searchText)
const path = computed(() => mainStore.path)
const showMarkdown = computed(() => mainStore.markdown.length > 0)

const currentRouteParams = computed(() => {
  const path = currentRoute.value.params.path as string || '/'
  const tag = currentRoute.value.query.tag as string || ''
  const search = currentRoute.value.query.search as string || ''
  return { path, tag, search }
})

const isRouteChange = computed(() => {
  const param = currentRouteParams.value
  if (path.value !== param.path) {
    return true
  }
  if (search.value !== param.search) {
    return true
  }
  if (tag.value !== param.tag) {
    return true
  }
  return false
})

onMounted(() => {
  const param = currentRouteParams.value
  mainStore.load(param)
  setTitle(mainStore.config.name)
})

watch([tag, search, path], () => {
  if (!isRouteChange.value) {
    return;
  }
  pushRoute();
})

const pushRoute = () => {
  const location: RouteLocationRaw = {
    name: 'Path',
    params: {
      path: path.value
    },
    query: {}
  };

  if (tag.value && location.query) {
    location.query.tag = tag.value;
  }
  if (search.value && location.query) {
    location.query.search = search.value;
  }

  console.log('updateRoute', location);
  router.push(location);

  const name = mainStore.config.name;
  setTitle([name, path.value].join(' - '));
}
</script>
  
<style lang="scss" scoped>
@import "@/scss/layout.scss";
</style>
  