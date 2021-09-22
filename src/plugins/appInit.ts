/*
 * @Author: imali
 * @Date: 2021-09-07 09:28:19
 * @LastEditTime: 2021-09-18 15:20:50
 * @LastEditors: imali
 * @Description:
 */
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(
  async (ctx: any) => {
    const { $storage, $globalApi, $message, $fullLoading, env } = ctx
    if (env.NUXT_ENV_STORYBOOK) {
      return
    }
    const loading = process.client && $fullLoading()
    try {
      const routeList = await $globalApi.getRoutes()
      if (routeList?.length) {
        $storage.setState('routeList', routeList.map((d: any) => ({
          ...d,
          path: d.path ? d.path : d.index,
          route: `/${d.path ? d.path : d.index}`
        })))
      } else {
        $message.error('未获取到路由')
      }

      process.client && loading.close()
    } catch (error: any) {
      process.client && loading.close()
      throw new Error(error)
    }
  }
)
