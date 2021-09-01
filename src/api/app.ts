import { NuxtAxiosInstance } from "@nuxtjs/axios"

export default (request: NuxtAxiosInstance) => ({

  getMenus() {
    return request({
      url: '/menus/getMenus',
      method: 'GET'
    })
  },

  getDeptList() {
    return request({
      url: '/targetDept/listTree',
      method: 'GET'
    })
  },

})
