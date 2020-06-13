import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import VueGtag from 'vue-gtag'
import VueFacebookPixel from 'vue-analytics-facebook-pixel'


Vue.use(VueGtag, {
  config: { id: "UA-167925505-1" },
  appName: '7-sotok',
  pageTrackerScreenviewEnabled: true
}, router)

Vue.use(VueFacebookPixel)
Vue.analytics.fbq.init('654344018480734', {
  em: 'voroshyk@icloud.com'
})

Vue.analytics.fbq.event('ViewContent', {
  content_name: 'Really Fast Running Shoes'
})


Vue.use(VueMask)

import 'normalize.css'
import '../src/assets/css-reset/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
