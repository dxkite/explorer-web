import { FileMeta, Tag, getFileMeta, getTagList, searchFileMeta, getFileRawText } from '@/src/api'
import { replaceMarkdownLink } from '@/src/util'
import path from 'path'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface Data {
  path: string;
  pathMeta: FileMeta | null;
  dirPath: string;
  dirMeta: FileMeta | null;
  list: FileMeta[];
  searchTag: string;
  search: string;
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
  markdown: {
    show: boolean,
    content: string,
  }
}

interface RouteParams {
  path: string
  search: string
  tag: string
}

export default new Vuex.Store<Data>({
  state: {
    path: '',
    pathMeta: null,
    dirPath: '',
    dirMeta: null,
    list: [],
    searchTag: '',
    search: '',
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
    markdown: {
      show: false,
      content: ''
    }
  },
  getters: {
    hasPreviousPath (state) {
      return state.dirPath !== '/'
    }
  },
  mutations: {
    updatePath (state: Data, meta: FileMeta) {
      state.path = meta.path
      state.pathMeta = meta
    },
    updateTagList (state: Data, tag: Tag[]) {
      state.tagList = tag
    },
    updateDir (state: Data, dirMeta: FileMeta) {
      state.dirPath = dirMeta.path
      state.dirMeta = dirMeta
      state.list = dirMeta.children || []
    },
    updateList (state: Data, list: FileMeta[]) {
      state.list = list
    },
    updateSearch (state: Data, { tag, search }: { tag: string, search: string }) {
      console.log('updateTag', tag, search)
      state.searchTag = tag
      state.search = search
    },
    setListLoading (state, loading: boolean) {
      state.listLoading = loading
    },
    setSearchOpen (state, searchOpen: boolean) {
      state.searchOpen = searchOpen
    },
    setMarkdown (state, { show = false, content } : { show: boolean, content: string }) {
      state.markdown.show = show
      state.markdown.content = content
    }
  },
  actions: {
    async switchMeta (context, meta: FileMeta) {
      console.log('switchMeta', meta)
      context.commit('setListLoading', meta.isDir)
      await context.dispatch('loadPath', meta.path)
      context.commit('updatePath', meta)
      context.commit('setListLoading', false)
    },
    async loadPrevious (context) {
      context.commit('setListLoading', true)
      const previous = path.dirname(context.state.dirPath)
      await context.dispatch('loadPath', previous)
      context.commit('setListLoading', false)
    },
    async loadPath (context, path) {
      await context.dispatch('load', {
        path: path,
        search: context.state.search,
        tag: context.state.searchTag
      })
    },
    async load (context, { path: pathname, tag, search }: RouteParams) {
      console.log('load', { pathname, tag, search })

      if (pathname === context.state.path) {
        console.log('load ignore', { pathname, tag, search })
        return
      }

      const meta = await getFileMeta(pathname)
      context.commit('updatePath', meta)

      if (meta.isDir) {
        context.commit('updateDir', meta)
      } else {
        const dirPath = path.dirname(pathname)
        if (dirPath !== context.state.dirPath) {
          context.commit('setListLoading', true)
          const dirMeta = await getFileMeta(dirPath)
          context.commit('updateDir', dirMeta)
          context.commit('setListLoading', false)
        }
      }

      if (tag !== '' || search !== '') {
        context.commit('setListLoading', true)
        context.commit('updateSearch', { tag, search })
        const list = await searchFileMeta(context.state.dirPath, search, tag)
        context.commit('updateList', list)
        context.commit('setListLoading', false)
      }

      context.dispatch('previewMeta', meta)
    },
    async updateTag (context, tag: string) {
      context.commit('updateSearch', { tag, search: context.state.search })

      if (tag === '' && context.state.search === '') {
        context.commit('updateList', context.state.dirMeta?.children || [])
        return
      }

      context.dispatch('search')
    },
    async updateSearch (context, search: string) {
      context.commit('updateSearch', { tag: context.state.searchTag, search })

      if (search === '' && context.state.searchTag === '') {
        context.commit('updateList', context.state.dirMeta?.children || [])
        return
      }

      context.dispatch('search')
    },
    async search (context) {
      const list = await searchFileMeta(context.state.dirPath, context.state.search, context.state.searchTag)
      context.commit('updateList', list)
    },
    async loadTags (context) {
      const tagList = await getTagList()
      context.commit('updateTagList', tagList)
    },
    async loadMarkdown (context, markdownPath: string) {
      const raw = await getFileRawText(markdownPath)
      const content = replaceMarkdownLink(markdownPath, raw)
      context.commit('setMarkdown', { show: true, content })
    },
    async previewMeta (context, meta: FileMeta) {
      if (meta.isDir && meta.readme) {
        context.dispatch('loadMarkdown', meta.readme)
      } else {
        if (meta.path.toLowerCase().endsWith('.md')) {
          context.dispatch('loadMarkdown', meta.path)
        } else {
          context.commit('setMarkdown', { show: false, content: '' })
        }
      }
    }
  },
  modules: {
  }
})
