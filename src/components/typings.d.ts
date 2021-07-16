import { Route } from 'vue-router'

export interface INavItem {
  name: string
  index: string
  route?: Route
}

export interface IMenuItem extends INavItem {
  icon?: string
  children?: Array<IMenuItem>
}
