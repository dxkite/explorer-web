import { FileMeta, Tag, getFileMeta, getFileRawLink, getFileRawText, getRecentList, getTagList, searchFileMeta } from '@/src/api';
import { TextViewExt, VideoExt } from '@/src/const';
import { replaceMarkdownLink } from '@/src/util';
import path from 'path-browserify';
import { defineStore } from 'pinia'

interface Data {
  path: string;
  pathMeta: FileMeta | null;
  dirPath: string;
  dirMeta: FileMeta | null;
  list: FileMeta[];
  recentList: FileMeta[];
  searchTag: string;
  searchText: string;
  searchOpen: boolean;
  tagList: Tag[];
  listLoading: boolean,
  config: {
    name: string;
    copyrightName: string;
    websiteRecord: string;
    websiteRecordLink: string;
    websitePoliceRecord: string;
    websitePoliceLink: string;
  },
  rawUrl: string;
  markdown: string;
  text: string;
}

interface RouteParams {
  path: string
  search: string
  tag: string
}


export const useMainStore = defineStore({
  id: 'main',
  state: (): Data => ({
    path: '',
    pathMeta: null,
    dirPath: '',
    dirMeta: null,
    list: [],
    recentList: [],
    searchTag: '',
    searchText: '',
    tagList: [],
    listLoading: false,
    searchOpen: false,
    config: {
      name: 'dxkite的网站',
      copyrightName: 'dxkite',
      websiteRecord: '湘ICP备20002416号-1',
      websiteRecordLink: 'https://beian.miit.gov.cn/',
      websitePoliceRecord: '湘公网安备 43112602000222号',
      websitePoliceLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43112602000222'
    },
    rawUrl: '',
    markdown: '',
    text: ''
  }),
  getters: {
    hasPreviousPath(): boolean {
      return this.dirPath !== '/'
    },
    isVideo(): boolean {
      return VideoExt.includes(this.pathMeta?.ext || '')
    }
  },
  actions: {
    updatePath(meta: FileMeta) {
      this.path = meta.path
      this.pathMeta = meta
    },
    updateTagList(tag: Tag[]) {
      this.tagList = tag
    },
    updateDir(dirMeta: FileMeta) {
      this.dirPath = dirMeta.path
      this.dirMeta = dirMeta
      this.list = dirMeta.children || []
    },
    updateList(list: FileMeta[]) {
      this.list = list
    },
    updateSearchParam({ tag, search }: { tag: string, search: string }) {
      console.log('updateTag', tag, search)
      this.searchTag = tag
      this.searchText = search
    },
    setListLoading(loading: boolean) {
      this.listLoading = loading
    },
    setSearchOpen(searchOpen: boolean) {
      this.searchOpen = searchOpen
    },
    setMarkdown(content: string) {
      this.markdown = content
    },
    setText(content: string) {
      this.text = content
    },
    setRawUrl(rawUrl: string) {
      this.rawUrl = rawUrl
    },
    async switchMeta(meta: FileMeta) {
      console.log('switchMeta', meta)
      this.setListLoading(meta.isDir)
      await this.loadPath(meta.path)
      this.updatePath(meta)
      this.setListLoading(false)
    },
    async loadPrevious() {
      this.setListLoading(true)
      const previous = path.dirname(this.dirPath)
      await this.loadPath(previous)
      this.setListLoading(false)
    },
    async loadPath(path: string) {
      await this.load({
        path: path,
        search: this.searchText,
        tag: this.searchTag
      })
    },
    async load({ path: pathname, tag, search }: RouteParams) {
      console.log('load', { pathname, tag, search })

      if (pathname === this.path) {
        console.log('load ignore', { pathname, tag, search })
        return
      }

      const meta = await getFileMeta(pathname)
      this.updatePath(meta)

      if (meta.isDir) {
        this.updateDir(meta)
      } else {
        const dirPath = path.dirname(pathname)
        if (dirPath !== this.dirPath) {
          this.setListLoading(true)
          const dirMeta = await getFileMeta(dirPath)
          this.updateDir(dirMeta)
          this.setListLoading(false)
        }
        if (VideoExt.includes(meta.ext || '')) {
          const rawUrl = await getFileRawLink(meta.path)
          this.setRawUrl(rawUrl)
        }
      }

      if (tag !== '' || search !== '') {
        this.setListLoading(true)
        this.updateSearchParam({ tag, search })
        const list = await searchFileMeta(this.dirPath, search, tag)
        this.updateList(list)
        this.setListLoading(false)
      }

      this.previewMeta(meta)
    },
    async updateTag(tag: string) {
      this.updateSearchParam({ tag, search: this.searchText })
      if (tag === '' && this.searchText === '') {
        this.updateList(this.dirMeta?.children || [])
        return
      }
      this.search()
    },
    async updateSearch(search: string) {
      this.updateSearchParam({ tag: this.searchTag, search })

      if (search === '' && this.searchTag === '') {
        this.updateList(this.dirMeta?.children || [])
        return
      }

      this.search()
    },
    async search() {
      const list = await searchFileMeta(this.dirPath, this.searchText, this.searchTag)
      this.updateList(list)
    },
    async loadTags() {
      const tagList = await getTagList()
      this.updateTagList(tagList)
    },
    async loadMarkdown(markdownPath: string) {
      const raw = await getFileRawText(markdownPath)
      const content = replaceMarkdownLink(markdownPath, raw)
      this.setMarkdown(content)
    },
    async loadText(textPath: string) {
      const raw = await getFileRawText(textPath)
      this.setText(raw)
    },
    async previewMeta(meta: FileMeta) {
      if (meta.isDir && meta.readme) {
        this.loadMarkdown(meta.readme)
      } else {
        this.setMarkdown('')
        this.setText('')
        const ext = path.extname(meta.path.toLowerCase()).replace(/^\./, '')
        if (['md'].includes(ext)) {
          this.loadMarkdown(meta.path)
        } else if (TextViewExt.includes(ext)) {
          this.loadText(meta.path)
        }
      }
    },
    async loadRecent () {
      const list = await getRecentList(10);
      this.recentList = list;
    }
  }
})