<template>
    <div class="footer">
      <div v-if="config.copyrightName.length > 0" class="footer-item copyright">&copy; {{ new Date().getFullYear() }} {{config.copyrightName}} </div>
      <a v-if="config.websiteRecordLink.length > 0" class="footer-item website-record" :href="config.websiteRecordLink" target="_blank">{{ config.websiteRecord }}</a>
      <a v-if="config.websitePoliceLink.length > 0" class="footer-item police-record" target="_blank" :href="config.websitePoliceLink">
        <img class="icon" src="@/assets/police.png"/><div>{{config.websitePoliceRecord}}</div>
      </a>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import { computed } from 'vue';

const mainStore = useMainStore();
const config = computed(() => mainStore.config)
</script>
<style lang="scss" scoped>
@import "@/scss/layout.scss";
</style>
