/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@kangc/v-md-editor/lib/*';
declare module '@uiw/codemirror-theme-vscode';
declare module 'dplayer';