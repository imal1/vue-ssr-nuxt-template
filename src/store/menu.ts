import { ActionTree, MutationTree } from 'vuex'

const state = () => ({
  menus: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setMenus(state: Record<string, any>, menus: Array<any>) {
    state.menus = menus
  }
}

const actions: ActionTree<RootState, RootState> = {
  async fetchMenus({ commit }: Record<string, any>, { $http }: Record<string, any>) {
    try {
      const menus = await $http.$get('/target/listChapter?chapterId=0').then((res: { data: any }) => res.data)
      if (menus.length) {
        commit('setMenus', menus)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
