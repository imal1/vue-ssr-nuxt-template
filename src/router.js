import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './pages/Home/index.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HomePage,
        children: [
          {
            path: ':home',
          },
        ],
      },
    ],
  })
}
