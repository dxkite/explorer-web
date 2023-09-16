<template>
  <div class="tag">
    <div class="icon">
      <img src="@/assets/tag.svg" :alt="name">
    </div>
    <div>{{props.name}}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({ name: String })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tag {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #F8F8F8;

  .icon {
    width: 16px;
    height: 16px;
  }
}
</style>
