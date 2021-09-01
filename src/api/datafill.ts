import { NuxtAxiosInstance } from "@nuxtjs/axios"

export default (request: NuxtAxiosInstance) => ({

  getTopChapterList() {
    return request({
      url: '/target/listTopChapter',
      method: 'GET'
    })
  },

  getYearList() {
    return request({
      url: '/targetRecord/listYear',
      method: 'POST'
    })
  },

  getDetailList(params: any) {
    return request({
      url: '/target/listDetailChapter',
      method: 'GET',
      params
    })
  },

  getTargetDeptList(params: any) {
    return request({
      url: '/target/listTargetDept',
      method: 'GET',
      params
    })
  },

  saveTarget(data: any) {
    return request({
      url: '/target/saveTarget',
      method: 'POST',
      data
    })
  },

  saveTargetDept(data: any) {
    return request({
      url: '/target/saveTargetDept',
      method: 'POST',
      data
    })
  }

})
