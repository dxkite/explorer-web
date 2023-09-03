<template>
  <div :class="['panel', {'is-open': isOpen}]">
    <div class="website-info" @click="onClickOpenClose">
      <div class="website-logo"><img src="@/assets/dxkite.png"/></div>
      <div class="website-name">{{ config.name }}</div>
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
  @Prop()
  private config!: WebsiteConfig

  public tagList: TagItem[] = []
  public isOpen = false

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

  private onClickOpenClose () {
    this.isOpen = !this.isOpen
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
  width: 64px;
  transition: .5s;

  &.is-open {
    width: 256px;
    .website-info {
      padding: 32px;
      .website-logo {
        width: 128px;
        height: 128px;
      }
      .website-name {
        transform: scale(1);
        opacity: 1;
        display: block;
      }
    }
    .tag-panel {
      .tag-icon {
        transform: scale(0);
        opacity: 0;
        display: none;
      }
      .tag-title {
        transform: scale(1);
        opacity: 1;
        display: block;
      }
      .tag-list {
        transform: scale(1);
        opacity: 1;
        display: flex;
      }
    }
  }

  .website-info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .website-logo {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .website-name {
      transform: scale(0);
      opacity: 0;
      display: none;
      font-size: 18px;
      padding: 16px;
      opacity: 1;
      transition: .3s;
    }
  }
  .tag-panel {
    padding: 16px;
    transition: .3s;

    .tag-icon {
      display: flex;
      justify-content: center;
    }

    .tag-title {
      font-size: 18px;
      margin-bottom: 8px;
      transform: scale(0);
      opacity: 0;
      display: none;
    }

    .tag-list {
      transform: scale(0);
      opacity: 0;
      display: flex;
      flex-wrap: wrap;
      margin-left: -4px;
      display: none;

      .tag-item {
        padding-left: 4px;
        padding-bottom: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
