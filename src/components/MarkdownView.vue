<template>
    <VMdPreview :text="text"></VMdPreview>
</template>

<script setup lang="ts">
import VMdPreview from '@kangc/v-md-editor/lib/preview';

import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup-templating'

import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/npm';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm';

import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

VMdPreview.use(vuePressTheme, {
  Prism,
});

VMdPreview.use(createEmojiPlugin());
VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(createMermaidPlugin());
VMdPreview.use(createKatexPlugin());
VMdPreview.use(createTodoListPlugin());

import { useMainStore } from '@/store/main';
import { computed } from 'vue';

const mainStore = useMainStore();

const text = computed(() => mainStore.markdown )

</script>

<style scoped lang="scss"></style>
