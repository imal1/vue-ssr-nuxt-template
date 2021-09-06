import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(
  async ({ store, $globalApi, $message, $fullLoading }: any) => {
    const loading = $fullLoading()
    try {
      const routeList = await $globalApi.getMenus()
      if (routeList?.length) {
        store.dispatch('setRouteList', routeList)
      } else {
        $message.error('未获取到路由')
      }

      const deptList = await $globalApi.getDeptList()
      store.dispatch('setDeptList', deptList)

      loading.close()
    } catch (error) {
      loading.close()
      throw new Error(error)
    }
  }
)
