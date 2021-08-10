import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  routeList: [] as Record<string, any>[],
  deptList: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setRouteList(state: Record<string, any>, routeList: Array<any>) {
    state.routeList = routeList
  },
  setDeptList(state: Record<string, any>, deptList: Array<any>) {
    state.deptList = deptList
  }
}

const getters: GetterTree<RootState, RootState> = {
  routePathList: (state: RootState) => state.routeList.map((d: any) => ({
    ...d,
    path: d.path ? d.path : d.index
  })),
  deptList: (state: RootState) => state.deptList
}

const actions: any = {
  async fetchRouteList(
    { commit }: Record<string, any>
  ) {
    try {
      const loading = this.$fullLoading()
      const routeList = await this.$http
        .$get('/menus/getMenus')
        .then((res: any) => res.data)
        .finally(() => loading.close())
      if (!routeList?.length) {
        throw new Error('未添加路由数据')
      }
      commit('setRouteList', routeList)
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchDeptList(
    { commit }: Record<string, any>
  ) {
    try {
      const loading = this.$fullLoading()
      const deptList = await this.$http
        .$get('/targetDept/listTree')
        .then((res: any) => res.data)
        .finally(() => loading.close())
      commit('setDeptList', deptList)
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
