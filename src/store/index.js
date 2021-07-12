const state = () => ({
  hosts: [],
})

const mutations = {
  setHosts(state, hosts) {
    state.hosts = hosts
  },
}

const actions = {
  async fetchHost({ commit, state }, { $http }) {
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
  async fetchRoutes(_, { $http, app }) {
    try {
      const { data } = await $http.$get('/routes.json')
      if (data?.length) {
        data.forEach((route) => app.router.addRoute(route))
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async nuxtServerInit({ dispatch }, context) {
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
