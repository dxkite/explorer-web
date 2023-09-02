<template>
  <div class="panel">
    <div class="website-info">
      <div class="website-logo"><img src="@/assets/dxkite.png"/></div>
      <div class="website-name">{{ config.name }}</div>
    </div>
    <div class="tag-panel" v-if="showTag">
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
  @Prop()
  private config!: WebsiteConfig

  public tagList: TagItem[] = []

  get showTag () {
    return this.tagList.length > 0
  }

  private mounted () {
    this.initTag()
  }

  private onClickTag (tag: TagItem) {
    this.$emit('tagClick', tag)
  }

  private async initTag () {
    const tagList = await getTagList()
    this.tagList = tagList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
  width: 256px;

  .website-info {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .website-logo {
      width: 128px;
      height: 128px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .website-name {
      font-size: 18px;
      padding: 16px;
    }
  }
  .tag-panel {
    padding: 16px;

    .tag-title {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      margin-left: -4px;

      .tag-item {
        padding-left: 4px;
        padding-bottom: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
