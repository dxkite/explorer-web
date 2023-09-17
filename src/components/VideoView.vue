<template>
  <div class="video-view">
    <div ref="player"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import 'hls.js';
import dPlayer from 'dplayer';
import { useMainStore } from '@/store/main';
const mainStore = useMainStore();

const player = ref(null);

const videoUrl = computed(() => mainStore.pathMeta?.rawUrl || '')

const initVideoPlayer = () => {
  const dp = new dPlayer({
    container: player.value,
    video: { url: videoUrl.value },
  })
  watch(videoUrl, () => {
    console.log('video change', videoUrl.value)
    dp.switchVideo({ url: videoUrl.value });
  })
}

onMounted(() => initVideoPlayer())

</script>
<style scoped lang="scss">
.video-view {}
</style>
