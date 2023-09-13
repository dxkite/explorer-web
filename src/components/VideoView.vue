<template>
  <div class="file-meta">
    <div class="file-title">
      <div class="file-title-item">视频预览</div>
    </div>
    <div class="file-content">
      <VueDPlayer :options="options" />
    </div>
  </div>
</template>

<script lang="ts">
import { getFileRawLink } from '@/src/api'
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

@Component({
  components: {
    VueDPlayer
  }
})
export default class VideoView extends Vue {
  get options () {
    return {
      video: {
        url: this.$store.state.rawUrl
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
