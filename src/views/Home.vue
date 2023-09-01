<template>
  <div class="home">
    <FileList :path="currentPath" @click="onClickFile"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileList from '@/components/FileList.vue' // @ is an alias to /src
import { decodeUrlSafeBase64, encodeUrlSafeBase64 } from '@/src/util'

@Component({
  components: {
    FileList
  }
})
export default class Home extends Vue {
  private currentPath = ''

  public mounted () {
    if (this.$route.params.path.length > 0) {
      this.currentPath = decodeUrlSafeBase64(this.$route.params.path)
    } else {
      this.currentPath = '/'
    }
  }

  public onClickFile (path: string) {
    this.$router.push({
      name: 'Path',
      params: {
        path: encodeUrlSafeBase64(path)
      }
    })
  }
}
</script>
