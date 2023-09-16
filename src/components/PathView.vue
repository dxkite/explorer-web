<template>
  <div class="path-view">
    <div class="path-item" @click="onClickPath('/')">
      <div class="path-icon">
        <img src="@/assets/folder.svg" />
      </div>
      <div class="path-icon" v-if="hasBaseArrow">
        <img src="@/assets/arrow-right.svg" />
      </div>
    </div>
    <div class="path-item" v-for="(item, idx) in pathName" :key="item.path" @click="onClickPath(item.path)">
      <div>{{ item.name }}</div>
      <div class="path-icon" v-if="hasArrow(idx)">
        <img src="@/assets/arrow-right.svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch} from 'vue'
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();

const pathName = ref<PathInfo[]>([])

interface PathInfo {
  name: string
  path: string
}

const hasBaseArrow = computed(() => mainStore.path !== '/')

const path = computed(() => mainStore.path)

const initPath = () => {
  const path = mainStore.path || ''
  const val = path.replace(/^\//, '').trim().split('/')
  pathName.value = val.map((v: string, idx: number) => ({ name: v, path: '/' + [...val].slice(0, idx + 1).join('/') }))
}

watch(path, initPath);

onMounted(() => {
  initPath()
})
const hasArrow = (idx: number) => {
  return idx + 1 !== pathName.value.length
}

const onClickPath = (path: string) => {
  mainStore.loadPath(path)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.path-view {
  display: flex;
  justify-items: center;
  min-height: 24px;
  flex-wrap: wrap;

  .path-icon {
    width: 14px;
    height: 14px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .path-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 0;
    min-height: 24px;
  }
}
</style>
