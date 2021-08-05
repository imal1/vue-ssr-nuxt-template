import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  routes: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setRoutes(state: Record<string, any>, routes: Array<any>) {
    state.routes = routes
  }
}

const getters: GetterTree<RootState, RootState> = {
  routesWithPath: (state: RootState) => state.routes.map((d: any) => ({
    ...d,
    path: d.path ? d.path : d.index
  }))
}

const actions: any = {
  async fetchRoutes(
    { commit }: Record<string, any>,
  ) {
    try {
      const routes = await this.$http
        .$get('/menus/getMenus')
        .then((res: any) => res.data)
      if (!routes?.length) {
        throw new Error('未添加路由数据')
      }
      commit('setRoutes', routes)
    } catch (error) {
      throw new Error(error)
    }
  },
  async nuxtServerInit({ dispatch }: Record<string, any>, context: any) {
    // https://zh.nuxtjs.org/docs/2.x/directory-structure/store#the-nuxtserverinit-action
    await dispatch('fetchRoutes', context)
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
