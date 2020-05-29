import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnimated from '@codekraft-studio/vue-animated'
import VueMask from 'v-mask'
import VueGtag from 'vue-gtag'


Vue.use(VueGtag, {
  config: { id: "UA-167925505-1" },
  appName: '7-sotok',
  pageTrackerScreenviewEnabled: true
}, router)


Vue.use(VueMask)
Vue.use(VueAnimated)

import 'normalize.css'
import '../src/assets/css-reset/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
