/*
 * @Author: imali
 * @Date: 2021-09-06 15:07:29
 * @LastEditTime: 2021-09-18 15:20:13
 * @LastEditors: imali
 * @Description:
 */
import { NuxtAxiosInstance } from "@nuxtjs/axios"

export default (request: NuxtAxiosInstance) => ({

  getRoutes() {
    return request({
      url: '/menus/getMenus',
      method: 'GET'
    })
  },

  getMenus() {
    return request({
      url: '/target/listTopChapter',
      method: 'GET'
    })
  },
})
