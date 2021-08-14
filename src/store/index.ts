import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  routeList: [] as Record<string, any>[],
  deptList: [] as Record<string, any>[],
  menuList: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setRouteList(state: Record<string, any>, routeList: Array<any>) {
    state.routeList = routeList
  },
  setDeptList(state: Record<string, any>, deptList: Array<any>) {
    state.deptList = deptList
  },
  setMenuList(state: Record<string, any>, menuList: Array<any>) {
    state.menuList = menuList
  }
}

const getters: GetterTree<RootState, RootState> = {
  routePathList: (state: RootState) => state.routeList.map((d: any) => ({
    ...d,
    path: d.path ? d.path : d.index
  })),
  deptList: (state: RootState) => state.deptList,
  menuRouteList: (state: RootState) => {
    return (home: string) =>
      state.menuList.map((item: any) => {
        item.index = item.index
          ? `${item.index}`
          : `${item.id}`
        item.route = `/${home}/${item.index}`
        return item
      })
  }
}

const actions: any = {
  async fetchRouteList(
    { commit }: Record<string, any>,
  ) {
    try {
      const loading = process.client && this.$fullLoading()
      const routeList = await this.$axios
        .$get('/menus/getMenus')
        .finally(() => process.client && loading.close())
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
      const loading = process.client && this.$fullLoading()
      const deptList = await this.$axios
        .$get('/targetDept/listTree')
        .finally(() => process.client && loading.close())
      commit('setDeptList', deptList)
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchMenuList(
    { commit }: Record<string, any>,
  ) {
    try {
      const loading = this.$fullLoading()
      const menuList = await this.$axios.$get('/target/listTopChapter')
        .finally(() => loading.close())
      if (menuList.length) {
        commit('setMenuList', menuList)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
