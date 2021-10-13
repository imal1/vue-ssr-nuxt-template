/*
 * @Author: imali
 * @Date: 2021-10-12 17:23:13
 * @LastEditTime: 2021-10-13 10:12:01
 * @LastEditors: imali
 * @Description:
 */
import { AccessIndexMenuList } from '@/utils'

export default async function (ctx: any) {
  const { $storage, $globalApi, route } = ctx
  const menuList = $storage.state.menuList
  if (menuList.length) {
    return
  }
  try {
    let newList = await $globalApi.getMenus()
    newList = AccessIndexMenuList(newList)
    newList = newList.map((m) => ({
      ...m,
      route: `/${route.name.split('-')[0]}/${m.index}`
    }))
    $storage.setState('menuList', newList)
  } catch (error: any) {
    throw new Error(error)
  }
}
