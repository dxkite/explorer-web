<template>
  <div class="tag">
    <div class="icon">
      <img src="@/assets/tag.svg" :alt="name">
    </div>
    <div>{{name}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop() name!: string
}
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
