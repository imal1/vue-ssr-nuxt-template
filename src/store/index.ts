import { ActionTree, MutationTree } from 'vuex'

const state = () => ({
  hosts: [] as string[],
  routes: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setHosts(state: Record<string, any>, hosts: Array<any>) {
    state.hosts = hosts
  },
  setRoutes(state: Record<string, any>, routes: Array<any>) {
    state.routes = routes
  }
}

const actions: ActionTree<RootState, RootState> = {
  async fetchHost({ commit, state }: Record<string, any>, { $http }: Record<string, any>) {
    try {
      const { code, msg, data } = await fetch(
        'http://localhost:3000/host.json',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      ).then((res) => res.json())

      if (code !== 200 || !data) {
        throw new Error(msg || '未知错误')
      }

      const { hosts } = state
      if (!hosts.includes(data)) {
        hosts.push(data)
        commit('setHosts', {
          baseUrl: hosts,
        })
      }

      $http.setBaseURL(data)
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchRoutes({ commit }: Record<string, any>, { $http }: Record<string, any>) {
    try {
      const { data } = await $http.$get('/routes.json')
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
    await dispatch('fetchHost', context)
    await dispatch('fetchRoutes', context)
  },
}

export default {
  state,
  mutations,
  actions,
}
