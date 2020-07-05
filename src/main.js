import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

import 'chart.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VXETable)

Vue.prototype.$modal = VXETable.modal
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
