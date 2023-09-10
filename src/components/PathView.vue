<template>
  <div class="path-view">
    <div class="path-item" @click="onClickPath('/')">
      <div class="path-icon">
        <img src="@/assets/folder.svg"/>
      </div>
      <div class="path-icon" v-if="hasBaseArrow">
       <img src="@/assets/arrow-right.svg"/>
      </div>
    </div>
    <div class="path-item" v-for="(item, idx) in pathName" :key="item.path" @click="onClickPath(item.path)">
      <div>{{ item.name }}</div>
      <div class="path-icon" v-if="hasArrow(idx)">
       <img src="@/assets/arrow-right.svg"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

interface PathInfo {
  name: string
  path: string
}

@Component
export default class PathView extends Vue {
  private pathName: PathInfo[] = []

  get path () {
    return this.$store.state.path
  }

  get hasBaseArrow () {
    return this.path !== '/'
  }

  private mounted () {
    this.initPath()
  }

  @Watch('path')
  private initPath () {
    const path = this.path || ''
    const val = path.replace(/^\//, '').trim().split('/')
    this.pathName = val.map((v :string, idx: number) => ({ name: v, path: '/' + [...val].slice(0, idx + 1).join('/') }))
  }

  private hasArrow (idx: number) {
    return idx + 1 !== this.pathName.length
  }

  private onClickPath (path: string) {
    this.$store.dispatch('loadPath', path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.path-view {
  display: flex;
  justify-items: center;
  min-height: 24px;
  flex-wrap: wrap;

  .path-icon {
    width: 14px;
    height: 14px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .path-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 0;
    min-height: 24px;
  }
}
</style>
