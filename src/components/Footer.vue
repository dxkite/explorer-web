<template>
    <div class="footer">
      <div class="footer-item copyright">&copy; {{ new Date().getFullYear() }} dxkite </div>
      <a class="footer-item website-record" href="https://beian.miit.gov.cn/" target="_blank">
        湘ICP备20002416号-1
      </a>
      <a class="footer-item police-record" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43112602000222">
        <img class="icon" src="@/assets/police.png"/><div>湘公网安备 43112602000222号</div>
      </a>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
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
