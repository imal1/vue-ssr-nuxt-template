import { ActionTree, MutationTree, GetterTree } from 'vuex'

const state = () => ({
  details: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setDetails(state: Record<string, any>, details: Array<any>) {
    state.details = doInChildrenList(details)
  }
}

function doInChildrenList(arr: any[]) {
  const result: any[] = []
  arr.forEach((item: any) => {
    if (!item.childrenList) {
      if (item.targets?.length) {
        item.childrenList = item.targets.map((t: any) => ({
          ...t,
          isTarget: true,
          id: `target-${t.id}`
        }))
      } else {
        item.childrenList = []
      }
    } else {
      doInChildrenList(item.childrenList)
    }
    result.push(item)
  })
  return result
}

const getters: GetterTree<RootState, RootState> = {
  details: (state: RootState) => state.details
}

const actions: ActionTree<RootState, RootState> = {
  async fetchDetails(
    { commit }: Record<string, any>,
    { $http, $loading, chapterId }: Record<string, any>
  ) {
    try {
      $loading.start()
      const details = await $http
        .$get(`/target/listDetailChapter?chapterId=${chapterId}&reportId=0`)
        .then((res: any) => res.data)
        .finally(() => $loading.finish())
      if (details?.length) {
        commit('setDetails', details)
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
