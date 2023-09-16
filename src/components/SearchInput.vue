<template>
  <div :class="['file-search-box', { 'is-focus': inputFocus }]">
    <div class="search-input-wrapper">
      <input ref="input" class="search-input" v-model="inputText" />
      <div class="search-close" @click="onClickSearchClose">
        <img src="@/assets/close.svg" />
      </div>
    </div>
    <div @click="onClickSearchOpen" class="search-button">
      <div class="search-icon">
        <img src="@/assets/search.svg" />
      </div>
      <div class="search-text">搜索</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const input = ref<HTMLInputElement | null>(null);

const inputText = ref('');

const inputFocus = ref(false);

const initText = () => {
  inputText.value = props.modelValue || ''
  if (inputText.value.length > 0) {
    startSearch(inputText.value)
  }
}

const startSearch = (text: string) => {
  inputFocus.value = true
  inputText.value = text
  if (input.value) {
    input.value.value = text
  }

  nextTick(() => {
    input.value?.focus()
  })
}

const value = computed(() => props.modelValue)
watch(value, () => {
  if (value.value === inputText.value) {
    return
  }
  initText()
})

watch(inputText, () => {
  emit('update:modelValue', inputText.value)
})

const onClickSearchOpen = () => {
  startSearch('')
}

const onClickSearchClose = () => {
  inputFocus.value = false
  inputText.value = ''
  if (input.value) {
    input.value.value = ''
  }
  emit('update:modelValue', '')
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
