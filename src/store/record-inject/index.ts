import { MutationTree, GetterTree } from 'vuex'

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
          id: t.accessId,
          originId: t.id,
          deptValMap: t.deptValMap || {}
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

const actions: any = {
  async fetchDetails(
    { commit }: Record<string, any>,
    { chapterId }: Record<string, any>
  ) {
    try {
      // this.$loading.start()
      const details = await this.$http
        .$get(`/target/listDetailChapter?chapterId=${chapterId}&reportId=0`)
        .then((res: any) => res.data)
      // .finally(() => this.$loading.finish())
      if (details?.length) {
        commit('setDetails', details)
      } else {
        commit('setDetails', [])
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async saveTargets(
    _store: Record<string, any>,
    payload: any[]
  ) {
    try {
      // this.$loading.start()
      await this.$http
        .$post('target/saveTarget', payload)
        .then(() => {
          this.$message.success('提交成功')
        })
      // .finally(() => this.$loading.finish())
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
