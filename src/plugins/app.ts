export default async function ({ store }: any) {
  await store.dispatch('fetchRouteList')
  await store.dispatch('fetchDeptList')
}
