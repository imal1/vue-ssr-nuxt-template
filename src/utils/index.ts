/*
 * @Author: imali
 * @Date: 2021-09-18 15:35:19
 * @LastEditTime: 2021-09-18 15:39:01
 * @LastEditors: imali
 * @Description:
 */
import { cloneDeep, map } from "lodash";

export function AccessIndexMenuList(menuList) {
  return map(cloneDeep(menuList), (item: any) => ({
    ...item,
    index: item.index ? `${item.index}` : `${item.id}`,
    children: item.children?.length ? item.children.map((child: any) => ({
      ...child,
      index: `${item.index}-${child.index ? child.index : child.id}`
    })) : null
  }))
}
