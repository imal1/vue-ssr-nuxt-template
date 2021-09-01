import { cloneDeep } from 'lodash'
import { make } from 'vuex-pathify'

const state = () => ({
  detailList: [] as Record<string, any>[],
  yearList: null as any,
  targetList: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations = make.mutations(state)

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

const getters = {
  ...make.getters(state),
  detailList: (state: RootState) => doInChildrenList(cloneDeep(state.detailList))
}

const actions: any = make.actions(state)

export default {
  state,
  mutations,
  actions,
  getters
}
