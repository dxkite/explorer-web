<template>
  <div class="file-explorer">
    <SearchInput class="file-search" v-model="searchText" @open="onSearchStart" @close="onSearchStop" />
    <div  class="file-list">
      <div v-if="isLoaded">
        <div class="file-item" v-if="hasPrevious" @click="onClickPrevious">..</div>
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

  public searchText = ''
  public searchEnable = false
  public searchList: FileMeta[] = []

  public isLoaded = false

  public currentFile: FileMeta | null = null
  public currentDir: FileMeta | null = null

  public currentPath = ''

  get hasPrevious () {
    return hasPreviousPath(this.currentDir?.path || '')
  }

  public mounted () {
    this.init()
  }

  get fileList () {
    console.log('currentDir', this.currentDir)
    if (this.searchEnable) {
      return this.searchList
    }
    return this.currentDir?.children || []
  }

  @Watch('path')
  public init () {
    this.currentPath = this.path || '/'
    console.log('init', [this.currentPath, this.path])
    this.loadPath(this.currentPath)
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
    this.$emit('click', file.path)
    this.currentPath = file.path
    if (file.isDir) {
      this.loadPath(file.path)
    } else {
      this.currentFile = file
    }
  }

  @Watch('searchText')
  private onSearch () {
    if (this.searchEnable && this.searchText.length > 0) {
      this.handleSearch(this.searchText)
    }
  }

  private async handleSearch (text: string) {
    this.isLoaded = false
    console.log('searching...', text)
    const current = await searchFileMeta(text)
    this.searchList = current
    console.log('search finish', text, current)
    this.isLoaded = true
  }

  private onSearchStart () {
    this.searchEnable = true
  }

  private onSearchStop () {
    this.searchEnable = false
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
    }

    .file-item:hover, .file-item.is-active {
      background-color: #f8f8f8;
    }
  }
}
</style>
