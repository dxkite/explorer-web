<template>
  <div :class="['panel', {'is-open': isOpen}]">
    <div class="website-header">
      <div class="website-info" @click="onClickOpenClose">
        <div class="website-logo"><img src="@/assets/dxkite.png"/></div>
        <div class="website-name">{{ config.name }}</div>
      </div>
      <div :class="['search-icon', {'is-open': searchOpen }]" @click="onClickSearch">
        <img src="@/assets/search.svg"/>
      </div>
    </div>
    <div class="tag-panel" v-if="showTag">
      <div class="tag-icon" @click="onClickOpenClose"><img src="@/assets/tag.svg"/></div>
      <div class="tag-title">标签</div>
      <div class="tag-list">
        <div class="tag-item" v-for="item in tagList" :key="item.name" @click="onClickTag(item)">
          <Tag :name="item.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getTagList, Tag as TagItem, WebsiteConfig } from '@/src/api'
import { Component, Prop, Vue } from 'vue-property-decorator'
import Tag from './Tag.vue'

@Component({
  components: {
    Tag
  }
})
export default class Panel extends Vue {
  public isOpen = false

  get showTag () {
    return this.tagList.length > 0
  }

  get tagList () {
    return this.$store.state.tagList || []
  }

  get config () {
    return this.$store.state.config
  }

  get searchOpen () {
    return this.$store.state.searchOpen
  }

  private mounted () {
    this.initTag()
  }

  private onClickTag (tag: TagItem) {
    this.$store.dispatch('updateTag', tag.name)
  }

  private async initTag () {
    this.$store.dispatch('loadTags')
  }

  private onClickOpenClose () {
    this.isOpen = !this.isOpen
  }

  private onClickSearch () {
    this.$store.commit('setSearchOpen', !this.searchOpen)
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/layout.scss";
</style>
