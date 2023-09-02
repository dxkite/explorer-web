<template>
    <div :class="['file-search-box', {'is-focus':inputFocus}]">
      <div class="search-input-wrapper">
        <input ref="input" class="search-input" @input="onInput"/>
        <div class="search-close" @click="onClickSearchClose">
          <img src="@/assets/close.svg"/>
        </div>
      </div>
        <div @click="onClickSearchOpen" class="search-button">
          <div class="search-icon">
            <img src="@/assets/search.svg"/>
          </div>
          <div class="search-text">搜索</div>
        </div>
    </div>
</template>

<script lang="ts">
import { nextTick } from 'vue'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

@Component
export default class SearchInput extends Vue {
  @Prop() private value!: string
  @Ref('input') private input!: HTMLInputElement
  private inputText = ''
  private inputFocus = false

  private mounted () {
    this.inputText = this.value || ''
  }

  private onClickSearchOpen () {
    this.inputFocus = true
    this.inputText = ''
    this.input.value = ''
    nextTick(() => {
      this.input.focus()
      this.$emit('open')
    })
  }

  private onClickSearchClose () {
    this.inputFocus = false
    this.$emit('close')
  }

  private onInput () {
    this.$emit('input', this.input.value)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .file-search-box {
    padding: 8px;

    &.is-focus {
      .search-button {
        display: none;
      }
      .search-input-wrapper {
        display: flex;
      }
    }
    .search-button {
      display: flex;
      justify-content: center;
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 8px;
      align-items: center;

      .search-text {
        line-height: 24px;
      }

      .search-icon {
        width: 1em;
        height: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
      }
    }
    .search-input-wrapper {
      display: flex;
      background-color: #f8f8f8;
      border-radius: 8px;
      display: none;

      .search-input {
        outline: none;
        flex-grow: 1;
        border: none;
        background-color: #f8f8f8;
        padding: 8px;
        line-height: 24px;
      }

      .search-close {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        width: 24px;
        padding: 8px;
      }
    }
  }

</style>
