<template>
    <div class="footer">
      <div v-if="config.copyrightName.length > 0" class="footer-item copyright">&copy; {{ new Date().getFullYear() }} {{config.copyrightName}} </div>
      <a v-if="config.websiteRecordLink.length > 0" class="footer-item website-record" :href="config.websiteRecordLink" target="_blank">{{ config.websiteRecord }}</a>
      <a v-if="config.websitePoliceLink.length > 0" class="footer-item police-record" target="_blank" :href="config.websitePoliceLink">
        <img class="icon" src="@/assets/police.png"/><div>{{config.websitePoliceRecord}}</div>
      </a>
      <div v-if="showUserCount" class="footer-item online-user" >
        <div class="icon-item"><img class="icon" src="@/assets/online-user.svg"/></div>
        <div>{{ onlineUser }}人在线</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import { computed } from 'vue';

const mainStore = useMainStore();
const config = computed(() => mainStore.config)
const onlineUser = computed(() => mainStore.clientCount)
const showUserCount = computed(() => mainStore.webEventStatus === 'online')
</script>
<style lang="scss" scoped>
@import "@/scss/layout.scss";

.online-user {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-item {
    height: 1em;

    .icon {
      width: 100%;
      height: 100%;
      padding-right: 8px;
    }
  }
}
</style>
