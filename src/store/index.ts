import { ActionTree, MutationTree } from 'vuex'

const state = () => ({
  hosts: [] as string[],
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setHosts(state: Record<string, any>, hosts: Array<any>) {
    state.hosts = hosts
  },
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
  async fetchRoutes(_: any, { $http, app }: Record<string, any>) {
    try {
      const { data } = await $http.$get('/routes.json')
      if (data?.length) {
        data.forEach((route: Record<string, any>) => app.router.addRoute(route))
      }
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
