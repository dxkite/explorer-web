import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MarkdownItVue from 'markdown-it-vue'

Vue.config.productionTip = false
Vue.use(MarkdownItVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
