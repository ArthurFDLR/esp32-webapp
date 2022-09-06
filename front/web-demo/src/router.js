import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Light from './views/Light.vue'
import Blinker from './views/Blinker.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/light',
      name: 'light',
      component: Light
    },
    {
      path: '/blinker',
      name: 'blinker',
      component: Blinker
    }
  ]
})
