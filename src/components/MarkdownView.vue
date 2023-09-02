<template>
  <markdown-it-vue ref="markdown-it" class="markdown-content" :content="content" :options="options" />
</template>

<script lang="ts">
import { getFileRawText } from '@/src/api'
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import { replaceMarkdownLink } from '@/src/util'

@Component
export default class MarkdownView extends Vue {
  @Prop() private path!: string

  private content = ''
  private options = {
    linkAttributes: {
      attrs: {
        target: '_blank',
        rel: 'noopener'
      }
    },
    katex: {
      throwOnError: false,
      errorColor: '#cc0000'
    },
    icons: 'font-awesome',
    githubToc: {
      tocFirstLevel: 2,
      tocLastLevel: 3,
      tocClassName: 'toc',
      anchorLinkSymbol: '',
      anchorLinkSpace: false,
      anchorClassName: 'anchor',
      anchorLinkSymbolClassName: 'octicon octicon-link'
    },
    mermaid: {
      theme: 'default'
    },
    image: {
      hAlign: 'left',
      viewer: true
    }
  }

  public mounted () {
    this.loadPath()
  }

  @Watch('path')
  private async loadPath () {
    const raw = await getFileRawText(this.path)
    this.content = replaceMarkdownLink(raw)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.markdown-content {
  background-color: #fff;
}
</style>
