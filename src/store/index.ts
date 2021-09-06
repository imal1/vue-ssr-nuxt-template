import { GetterTree } from 'vuex'
import { make } from 'vuex-pathify'

const state = () => ({
  routeList: [] as Record<string, any>[],
  deptList: [] as Record<string, any>[],
  menuList: [] as Record<string, any>[]
})

export type RootState = ReturnType<typeof state>

const mutations = make.mutations(state)

const getters: GetterTree<RootState, RootState> = {
  ...make.getters(state),
  menuIndexList: (state: RootState) => state.menuList.map((item: any) => ({
    ...item,
    index: item.index ? `${item.index}` : `${item.id}`,
    children: item.children?.length ? item.children.map((child: any) => ({
      ...child,
      index: `${item.index}-${child.index ? child.index : child.id}`
    })) : null
  })),
  routePathList: (state: RootState) => state.routeList.map((d: any) => ({
    ...d,
    path: d.path ? d.path : d.index,
    route: `/${d.path ? d.path : d.index}`
  })),
}

const actions: any = make.actions(state)

export default {
  state,
  mutations,
  actions,
  getters,
}
