import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  reportList: [] as Record<string, any>[],
  histogramList: [] as Record<string, any>[],
  trendData: {} as any,
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setReportList(state: Record<string, any>, reportList: Array<any>) {
    state.reportList = reportList
  },
  setHistogramList(state: Record<string, any>, histogramList: Array<any>) {
    state.histogramList = histogramList
  },
  setTrendData(state: Record<string, any>, trendData: Record<string, any>) {
    state.trendData = trendData
  },
}

const getters: GetterTree<RootState, RootState> = {
  reportList: (state: RootState) => state.reportList,
  histogramList: (state: RootState) => state.histogramList,
  trendData: (state: RootState) => state.trendData
}

const actions: any = {
  async fetchReportList(
    { commit }: Record<string, any>,
    payload: any
  ) {
    try {
      const reportList = await this.$api
        .$post(`/report/bed/listReport`, payload)
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
        .$post(`/report/bed/listHistogram`, payload)
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
        .$post(`/report/bed/listTrend`, payload)
      if (trendData) {
        commit('setTrendData', trendData)
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
