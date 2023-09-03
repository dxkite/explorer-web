<template>
  <div class="file-explorer">
    <SearchInput class="file-search" v-model="searchText" @open="onSearchStart" @close="onSearchStop" />
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
      <div v-if="isLoaded">
        <div class="file-item" v-if="hasPrevious" @click="onClickPrevious">
          <div class="item-text">
            <div class="item-icon"><img src="@/assets/back.svg"/></div>
            <div class="item-title">上级目录</div>
          </div>
        </div>
        <div :class="['file-item', {'is-active': isActiveItem(item)}]" v-for="item in fileList" :key="item.path" @click="onClickItem(item)" >{{ item.name }}</div>
      </div>
      <div v-else class="is-empty">加载中...</div>
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
  @Prop() public path!: string
  @Prop() public tag!: string

  public searchText = ''
  public searchTag = ''
  public isSearchText = false
  public isSearchTag = false
  public searchList: FileMeta[] = []

  public isLoaded = false

  public currentFile: FileMeta | null = null
  public currentDir: FileMeta | null = null

  public currentPath = ''

  get hasTag () {
    return this.searchTag.length > 0
  }

  get hasPrevious () {
    return hasPreviousPath(this.currentDir?.path || '')
  }

  public mounted () {
    this.initTag()
    this.initPath()
  }

  get fileList () {
    console.log('currentDir', this.currentDir)
    if (this.isSearchTag || this.isSearchText) {
      return this.searchList
    }
    return this.currentDir?.children || []
  }

  @Watch('path')
  public initPath () {
    if (this.path === this.currentPath) {
      return
    }
    this.currentPath = this.path || '/'
    console.log('init', [this.currentPath, this.path])
    this.loadPath(this.currentPath)
  }

  @Watch('tag')
  public initTag () {
    this.searchTag = this.tag || ''
    if (this.searchTag.length > 0) {
      this.isSearchTag = true
    }
  }

  private async loadPath (path: string) {
    this.isLoaded = false
    console.log('loading', path)
    const current = await getFileMeta(path)
    if (current.isDir) {
      this.currentDir = current
      this.currentFile = null
    } else {
      const dir = getDirName(this.currentPath)
      const dirMeta = await getFileMeta(dir)
      this.currentDir = dirMeta
      this.currentFile = current
    }
    console.log('loaded', path, this.currentDir, this.currentFile)
    this.isLoaded = true
  }

  private onClickPrevious () {
    if (this.hasPrevious && this.currentDir) {
      this.currentPath = getDirName(this.currentDir.path)
      this.loadPath(this.currentPath)
      this.$emit('click', this.currentPath)
    }
  }

  private isActiveItem (file: FileMeta) {
    if (file.isDir) {
      return false
    }
    return file.path === this.currentFile?.path
  }

  private onClickItem (file: FileMeta) {
    this.$emit('click', file.path, file)
    this.currentPath = file.path
    if (file.isDir) {
      this.loadPath(file.path)
    } else {
      this.currentFile = file
    }
  }

  @Watch('searchText')
  @Watch('searchTag')
  private onSearch () {
    const isEnableSearch = this.isSearchText && this.searchText.length > 0
    const isEnableTagSearch = this.searchTag.length > 0
    const currentDir = this.currentDir?.path || '/'
    console.log(this.isSearchText, this.searchTag, isEnableSearch, isEnableTagSearch)
    if (isEnableSearch || isEnableTagSearch) {
      this.handleSearch(currentDir, this.searchText, this.searchTag)
    }
  }

  private async handleSearch (path: string, text: string, tag: string) {
    this.isLoaded = false
    this.searchList = []
    console.log('searching...', text)
    const current = await searchFileMeta(path, text, tag)
    this.searchList = current
    console.log('search finish', text, current)
    this.isLoaded = true
  }

  private onSearchStart () {
    this.isSearchText = true
  }

  private onSearchStop () {
    this.isSearchText = false
  }

  private onClickTagClose () {
    this.searchTag = ''
    this.isSearchTag = false
    this.$emit('clearTag')
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

    .is-empty {
      padding: 8px;
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
