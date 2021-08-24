import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  cakeList: [] as Record<string, any>[],
  histogramList: [] as Record<string, any>[],
  reportList: [] as Record<string, any>[],
  reportDetailList: [] as Record<string, any>[],
  trendData: {} as any,
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setCakeList(state: Record<string, any>, cakeList: Array<any>) {
    state.cakeList = cakeList
  },
  setHistogramList(state: Record<string, any>, histogramList: Array<any>) {
    state.histogramList = histogramList
  },
  setReportList(state: Record<string, any>, reportList: Array<any>) {
    state.reportList = reportList
  },
  setReportDetailList(state: Record<string, any>, reportDetailList: Array<any>) {
    state.reportDetailList = reportDetailList
  },
  setTrendData(state: Record<string, any>, trendData: Record<string, any>) {
    state.trendData = trendData
  },
}

const getters: GetterTree<RootState, RootState> = {
  cakeList: (state: RootState) => state.cakeList,
  reportList: (state: RootState) => state.reportList,
  histogramList: (state: RootState) => state.histogramList,
  reportDetailList: (state: RootState) => state.reportDetailList,
  trendData: (state: RootState) => state.trendData
}

const actions: any = {
  async fetchReportList(
    { commit }: Record<string, any>,
    payload: any
  ) {
    try {
      const reportList = await this.$api
        .$post(`/surgery/listReport`, payload)
      if (reportList?.length) {
        commit('setReportList', reportList)
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchHistogramList(
    { commit }: Record<string, any>,
    payload: any
  ) {
    try {
      const histogramList = await this.$api
        .$post(`/surgery/listHistogram`, payload)
      if (histogramList?.length) {
        commit('setHistogramList', histogramList)
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchTrendData(
    { commit }: Record<string, any>,
    payload: any
  ) {
    try {
      const trendData = await this.$api
        .$post(`/surgery/listTrend`, payload)
      if (trendData) {
        commit('setTrendData', trendData)
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchCakeList(
    { commit }: Record<string, any>,
    payload: any
  ) {
    try {
      const cakeList = await this.$api
        .$post(`/surgery/listCake`, payload)
      if (cakeList?.length) {
        commit('setCakeList', cakeList)
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchReportDetailList(
    { commit }: Record<string, any>,
    payload: any
  ) {
    try {
      const reportDetailList = await this.$api
        .$post(`/surgery/listReportDetail`, payload)
      if (reportDetailList?.length) {
        commit('setReportDetailList', reportDetailList)
      }
    } catch (error) {
      throw new Error(error)
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
