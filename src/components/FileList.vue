<template>
  <div class="file-explorer">
    <SearchInput class="file-search" v-model="searchText" />
    <div class="file-list">
      <div class="filter-item" v-if="hasTag">
        <div class="filter-title">
          <div class="filter-icon"><img src="@/assets/tag.svg"/></div>
          <div class="filter-name">{{ tag }}</div>
        </div>
        <div class="tag-close" @click="onClickTagClose">
          <img src="@/assets/close.svg"/>
        </div>
      </div>
      <div v-if="!listLoading">
        <div class="file-item" v-if="hasPrevious" @click="onClickPrevious">
          <div class="item-text">
            <div class="item-icon"><img src="@/assets/back.svg"/></div>
            <div class="item-title">上级目录</div>
          </div>
        </div>
        <div :class="['file-item', {'is-active': isActiveItem(item)}]" v-for="item in list" :key="item.path" @click="onClickItem(item)" >{{ item.name }}</div>
      </div>
      <div v-else class="file-item">加载中...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import SearchInput from './SearchInput.vue'
import { getFileMeta, FileMeta, searchFileMeta } from '@/src/api'
import { hasPreviousPath, getDirName } from '@/src/util'

@Component({
  components: {
    SearchInput
  }
})
export default class FileList extends Vue {
  public searchText = ''
  public searchList: FileMeta[] = []

  public currentFile: FileMeta | null = null
  public currentDir: FileMeta | null = null

  public currentPath = ''

  get hasTag () {
    return this.$store.state.searchTag !== ''
  }

  get tag () {
    return this.$store.state.searchTag
  }

  get path () {
    return this.$store.state.path
  }

  get search () {
    return this.$store.state.search
  }

  get hasPrevious () {
    return this.$store.getters.hasPreviousPath
  }

  get list () {
    return this.$store.state.list
  }

  get listLoading () {
    return this.$store.state.listLoading
  }

  private onClickPrevious () {
    if (this.hasPrevious) {
      this.$store.dispatch('loadPrevious')
    }
  }

  private isActiveItem (file: FileMeta) {
    if (file.isDir) {
      return false
    }
    return file.path === this.$store.state.path
  }

  private onClickItem (meta: FileMeta) {
    this.$store.dispatch('switchMeta', meta)
  }

  private onClickTagClose () {
    this.$store.dispatch('updateTag', '')
  }

  @Watch('searchText')
  private onSearchTextChange () {
    this.$store.dispatch('updateSearch', this.searchText)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.file-explorer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter-item {
    padding: 8px;
    border-radius: 8px;
    background-color: #f8f8f8;
    margin-bottom: 2px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;

    .filter-title {
      display: flex;
      align-items: center;
      .filter-icon {
        padding-right: 8px;
      }
    }

    .filter-close {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      padding: 8px;
    }
  }

  .file-search {
  }

  .file-list {
    padding: 8px;
    background-color: #fcfcfc;
    flex-grow: 1;
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
}
</style>
