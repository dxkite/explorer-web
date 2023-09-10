<template>
  <markdown-it-vue ref="markdown-it" class="markdown-content" :content="content" :options="options" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import MarkdownItVue from 'markdown-it-vue'

@Component({
  components: {
    MarkdownItVue
  }
})
export default class MarkdownView extends Vue {
  get content () {
    return this.$store.state.markdown.content
  }

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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.markdown-content {
  background-color: #fff;
}
</style>
