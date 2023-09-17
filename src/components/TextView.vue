<template>
    <div class="file-meta">
        <div class="file-title">
            <div class="file-title-item">文件预览</div>
        </div>
        <div class="file-content">
            <Codemirror
            v-model="text"
            :disabled="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            ></Codemirror>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { LanguageSupport } from '@codemirror/language';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { computed, ref } from 'vue';
import { useMainStore } from '@/store/main';
import { cpp } from '@codemirror/lang-cpp';
import { markdown } from '@codemirror/lang-markdown';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { php } from '@codemirror/lang-php';

const ExtLang: Record<string, () => LanguageSupport> = {
  'cpp': cpp,
  'c': cpp,
  'h': cpp,
  'md': markdown,
  'html': html,
  'java': java,
  'js': javascript,
  'css': css,
  'php': php,
}

const extensions = computed(() => {
  const ext = [vscodeDark];
  const lang = ExtLang[mainStore.pathMeta?.ext || ''] || ExtLang['md']
  ext.push(lang())
  return ext;
})

const mainStore = useMainStore();
const text = computed(() => mainStore.text)

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

.link-text {
  text-decoration: none;
  color: #000;
}
</style>
<style>
.CodeMirror {
  height: auto !important;
}
</style>
