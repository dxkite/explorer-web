<template>
  <div class="file-meta">
    <div class="file-title">
      <div class="file-title-item">文件信息</div>
      <div class="file-title-item">
        <div v-if="!meta?.isDir"><a class="link-text" :href="downloadLink">下载文件</a></div>
      </div>
    </div>
    <div class="file-content">
      <div class="file-content-item">文件路径 {{ meta?.path }}</div>
      <div class="file-content-item">更新时间 {{ meta?.modTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFileRawLink } from '@/src/api'

import { useMainStore } from '@/store/main';
import { computed, watch, ref } from 'vue';

const mainStore = useMainStore();

const meta = computed(() => mainStore.pathMeta)

const downloadLink = ref('');

watch(meta, async () => {
  if (meta.value) {
    downloadLink.value= await getFileRawLink(meta.value.path)
  }
})
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
