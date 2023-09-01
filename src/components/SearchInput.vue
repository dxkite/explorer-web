<template>
    <div :class="['file-search-box', {'is-focus':inputFocus}]">
      <div class="search-input-wrapper">
        <input ref="input" class="search-input" @input="onInput"/>
        <div class="search-close" @click="onClickSearchClose">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.93746 0.35949L4.99996 4.29699L1.06246 0.35949C0.958123 0.265824 0.840956 0.218991 0.710956 0.218991C0.580956 0.218991 0.46629 0.268491 0.366957 0.367491C0.267623 0.466491 0.218123 0.581157 0.218456 0.711491C0.21879 0.841824 0.265623 0.958991 0.358956 1.06299L4.29646 5.00049L0.358956 8.93799C0.223623 9.07332 0.17929 9.23482 0.225957 9.42249C0.272623 9.61016 0.38729 9.72732 0.569956 9.77399C0.752623 9.82066 0.916623 9.77632 1.06196 9.64099L4.99946 5.70349L8.93696 9.64099C9.04129 9.73466 9.15845 9.78149 9.28846 9.78149C9.41846 9.78149 9.53312 9.73199 9.63245 9.63299C9.73179 9.53399 9.78129 9.41932 9.78096 9.28899C9.78062 9.15866 9.73379 9.04149 9.64046 8.93749L5.70296 4.99999L9.64046 1.06249C9.77579 0.927157 9.82012 0.765657 9.77346 0.577991C9.72679 0.390324 9.60962 0.273157 9.42196 0.226491C9.23429 0.179824 9.07279 0.224157 8.93746 0.35949Z" fill="#303133"/>
          </svg>
        </div>
      </div>
        <div @click="onClickSearchOpen" class="search-button">
          <div class="search-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9375 11.7345L13.8905 13.6875C13.9842 13.7918 14.031 13.909 14.031 14.039C14.031 14.169 13.9815 14.2837 13.8825 14.383C13.7835 14.4823 13.6688 14.5318 13.5385 14.5315C13.4082 14.5312 13.291 14.4843 13.187 14.391L11.234 12.438C9.84867 13.5733 8.31217 14.0915 6.6245 13.9925C4.93683 13.8935 3.47333 13.2033 2.234 11.922C1.04633 10.5783 0.468168 9.06267 0.499501 7.375C0.530834 5.68733 1.16633 4.19767 2.406 2.906C3.69767 1.66633 5.18733 1.03083 6.875 0.999501C8.56267 0.968168 10.0783 1.54633 11.422 2.734C12.7033 3.97367 13.3935 5.43717 13.4925 7.1245C13.5915 8.81183 13.0733 10.3483 11.938 11.734L11.9375 11.7345ZM7 13C8.56267 12.9583 9.8595 12.4218 10.8905 11.3905C11.9215 10.3592 12.458 9.06233 12.5 7.5C12.4583 5.93733 11.9218 4.6405 10.8905 3.6095C9.85917 2.5785 8.56233 2.042 7 2C5.43733 2.04167 4.1405 2.57817 3.1095 3.6095C2.0785 4.64083 1.542 5.93767 1.5 7.5C1.54167 9.06267 2.07817 10.3595 3.1095 11.3905C4.14083 12.4215 5.43767 12.958 7 13Z"
                fill="black"
              />
            </svg>
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
