import { ActionTree, MutationTree } from 'vuex'

const state = () => ({
  routes: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setRoutes(state: Record<string, any>, routes: Array<any>) {
    state.routes = routes
  }
}

const actions: ActionTree<RootState, RootState> = {
  async fetchRoutes({ commit }: Record<string, any>, { $http }: Record<string, any>) {
    try {
      const { data } = await $http.$get('/menus/getMenus')
      if (!data?.length) {
        throw new Error('未添加路由数据')
      }
      commit('setRoutes', data)
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
}
