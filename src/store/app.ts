import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  menus: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setMenus(state: Record<string, any>, menus: Array<any>) {
    state.menus = menus
  }
}

const getters: GetterTree<RootState, RootState> = {
  menusWithRoute: (state: RootState) => {
    return (home: string) =>
      state.menus.map((item: any) => {
        item.index = item.index
          ? `${item.index}`
          : `${item.id}`
        item.route = `/${home}/${item.index}`
        return item
      })
  }
}

const actions: any = {
  async fetchMenus(
    { commit }: Record<string, any>,
  ) {
    try {
      const menus = await this.$http.$get('/target/listTopChapter')
        .then((res: { data: any }) => res.data)
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
  actions,
  getters
}
