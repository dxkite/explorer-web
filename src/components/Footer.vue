<template>
    <div class="footer">
      <div v-if="config.copyrightName.length > 0" class="footer-item copyright">&copy; {{ new Date().getFullYear() }} {{config.copyrightName}} </div>
      <a v-if="config.websiteRecordLink.length > 0" class="footer-item website-record" :href="config.websiteRecordLink" target="_blank">{{ config.websiteRecord }}</a>
      <a v-if="config.websitePoliceLink.length > 0" class="footer-item police-record" target="_blank" :href="config.websitePoliceLink">
        <img class="icon" src="@/assets/police.png"/><div>{{config.websitePoliceRecord}}</div>
      </a>
    </div>
</template>

<script lang="ts">
import { WebsiteConfig } from '@/src/api'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  @Prop()
  private config!: WebsiteConfig
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  font-size: 16px;
  line-height: 20px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  .website-record, .police-record {
    text-decoration: none;
    color: #000;
  }

  .footer-item+.footer-item {
    padding-left: 16px;
  }

  .police-record {
    display: flex;
    .icon {
      padding-right: 8px;
    }
  }
}
</style>
