<template>
  <div :class="['panel', {'is-open': isOpen}]">
    <div class="website-header">
      <div class="website-info" @click="onClickOpenClose">
        <div class="website-logo"><img src="@/assets/dxkite.png"/></div>
        <div class="website-name">{{ config.name }}</div>
      </div>
      <div :class="['search-icon', {'is-open': searchOpen }]" @click="onClickSearch">
        <img src="@/assets/search.svg"/>
      </div>
    </div>
    <div class="tag-panel" v-if="showTag">
      <div class="tag-icon" @click="onClickOpenClose"><img src="@/assets/tag.svg"/></div>
      <div class="tag-title">标签</div>
      <div class="tag-list">
        <div class="tag-item" v-for="item in tagList" :key="item.name" @click="onClickTag(item)">
          <Tag :name="item.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag as TagItem } from '@/src/api'
import { computed, onMounted, ref } from 'vue'
import Tag from './TagView.vue'
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();

const isOpen = ref(false);

const tagList = computed(() => mainStore.tagList || [] );

const showTag = computed(() => tagList.value.length  > 0)

const config = computed(() => mainStore.config);

const searchOpen = computed(() => mainStore.searchOpen);

onMounted(() => {
  mainStore.loadTags();
})


const onClickOpenClose = () => {
  isOpen.value = !isOpen.value
}

const onClickTag = (tag: TagItem) => {
  mainStore.updateTag(tag.name)
}

const onClickSearch = () => {
  mainStore.setSearchOpen(!searchOpen.value)
}

</script>
<style lang="scss" scoped>
@import "@/scss/layout.scss";
</style>
