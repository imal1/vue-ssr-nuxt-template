import { MutationTree, GetterTree } from 'vuex'

const state = () => ({
  detailList: [] as Record<string, any>[],
  recordList: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  setDetailList(state: Record<string, any>, detailList: Array<any>) {
    state.detailList = doInChildrenList(detailList)
  },
  setRecordList(state: Record<string, any>, recordList: Array<any>) {
    state.recordList = recordList
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
          swapValMap: {}
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
  detailList: (state: RootState) => state.detailList,
  recordList: (state: RootState) => state.recordList,
}

const actions: any = {
  async fetchRecordList(
    { commit }: Record<string, any>,
  ) {
    try {
      const loading = process.client && this.$fullLoading()
      const recordList = await this.$axios
        .$get('/targetRecord/listDataRecord')
        .finally(() => process.client && loading.close())
      commit('setRecordList', recordList)
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchDetailList(
    { commit }: Record<string, any>,
    { chapterId }: Record<string, any>
  ) {
    try {
      const loading = process.client && this.$fullLoading()
      const detailList = await this.$axios
        .$get(`/target/listDetailChapter?chapterId=${chapterId}&reportId=0`)
        .finally(() => process.client && loading.close())
      if (detailList?.length) {
        commit('setDetailList', detailList)
      } else {
        commit('setDetailList', [])
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
      const loading = process.client && this.$fullLoading()
      await this.$axios
        .$post('target/saveTarget', payload)
        .then(() => {
          this.$message.success('提交成功')
        })
        .finally(() => process.client && loading.close())
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
