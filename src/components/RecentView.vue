<template>
  <div class="file-meta">
    <div class="file-title">
      <div class="file-title-item">最新文件</div>
    </div>
    <div class="file-content">
      <div class="file-list">
        <div :class="['file-item']" v-for="item in list" :key="item.path" @click="onClickItem(item)">
          <div class="file-name">
            {{ item.name }}
          </div>
          <div class="file-ext">
            {{ item.modTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/store/main';
import { FileMeta } from '@/src/api';
const mainStore = useMainStore();

const list = computed(() => mainStore.recentList )

const onClickItem = (meta: FileMeta) => {
  mainStore.switchMeta(meta)
}

</script>
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
    padding: 4px;
  }
}

  .file-list {
    padding: 8px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #fcfcfc;
    }

    &::-webkit-scrollbar-thumb {
      background: #f8f8f8;
    }

    .file-item {
      padding: 8px;
      border-radius: 8px;
      background-color: #ffffff;
      margin-bottom: 2px;
      cursor: pointer;
      user-select: none;
      display: flex;
      justify-content: space-between;
      .item-text {
        display: flex;
        .item-icon {
          padding-right: 8px;
        }
      }
    }

    .file-item:hover, .file-item.is-active {
      background-color: #f8f8f8;
    }
  }
</style>
