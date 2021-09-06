import Vue from 'vue'
import Router from 'vue-router'
// import { onGlobalSetup, useStore } from '@nuxtjs/composition-api'
// import HomePage from './pages/index.vue'

Vue.use(Router)

export function createRouter(
  ssrContext,
  createDefaultRouter,
  routerOptions,
  config
) {
  const options =
    routerOptions || createDefaultRouter(ssrContext, config).options
  // const routeList = useStore().getters.routePathList
  const router = new Router({
    ...options,
    mode: 'history',
  })

  // router.beforeEach((_to, from, next) => {
  //   if (from === Router.START_LOCATION) {
  //     onGlobalSetup(async () => {
  //       const routeList = useStore().getters.routePathList
  //       await router.addRoute({
  //         path: '/',
  //         component: HomePage,
  //         children: routeList.map((route) => ({
  //           path: route.index,
  //           component: () =>
  //             import(
  //               /* webpackChunkName: "[request]" */ `./pages/${route.index}/index.vue`
  //             ),
  //         })),
  //       })
  //       next()
  //     })
  //   }
  // })

  return router
}
