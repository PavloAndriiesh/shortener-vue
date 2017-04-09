import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

Vue.use(VueRouter)
Vue.prototype.$http = axios

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  }
  next('/')
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
