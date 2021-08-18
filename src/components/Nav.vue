<!--
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 11:21:08
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 17:57:18
-->
<template>
  <div>
    <el-menu
      ref="root"
      router
      mode="horizontal"
      v-bind="menuAttrs"
      v-on="menuEvents"
    >
      <template v-for="item in menuList">
        <el-submenu
          v-if="item.children && item.children.length"
          :key="item.path"
          :index="item.path"
          :popper-append-to-body="false"
        >
          <template slot="title">
            <i v-if="item.icon" :class="`el-icon el-icon-${item.icon}`" />
            {{ item.name }}
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              :key="subItem.path"
              :index="`${item.path}${subItem.path}`"
              :route="item.route"
            >
              <template slot="title">
                <i
                  v-if="subItem.icon"
                  :class="`el-icon el-icon-${subItem.icon}`"
                />
                {{ subItem.name }}
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          v-else
          :key="item.path"
          :index="item.path"
          :route="item.route"
        >
          <template slot="title">
            <i v-if="item.icon" :class="`el-icon el-icon-${item.icon}`" />
            {{ item.name }}
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  computed,
} from '@nuxtjs/composition-api'
import { omit, keys, isFunction, pickBy } from 'lodash'
import { INavItem } from './typings'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<INavItem[]>,
      required: true,
    },
    router: {
      type: Boolean,
      default() {
        return true
      },
    },
  },
  setup(props: any, ctx: any) {
    const root = ref(null)
    const menuList = computed(() => props.list)
    const menuEvents = pickBy(ctx.attrs, isFunction)
    const menuAttrs = omit(ctx.attrs, keys(menuEvents.value))

    return {
      root,
      menuList,
      menuAttrs,
      menuEvents,
    }
  },
})
</script>
<style lang="scss" scoped>
::v-deep .el-menu {
  border-style: none;
}
::v-deep div.el-menu--horizontal {
  margin-left: -10px;
}

::v-deep .el-menu--horizontal > .el-menu-item,
::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
  padding: 0;
  line-height: 60px;
  height: 48px;
}

::v-deep .el-menu--horizontal > .el-menu-item:not(:last-child),
::v-deep
  .el-menu--horizontal
  > .el-submenu
  .el-submenu__title:not(:last-child) {
  margin-right: 20px;
}

::v-deep .el-menu--collapse .el-menu .el-submenu,
::v-deep .el-menu--popup,
::v-deep .el-submenu .el-menu-item {
  min-width: 0px;
}

::v-deep .el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
::v-deep .el-menu--horizontal > .el-menu-item.is-active,
::v-deep .el-menu--horizontal .el-menu .el-menu-item.is-active,
::v-deep
  .el-menu--horizontal
  .el-menu
  .el-submenu.is-active
  > .el-submenu__title,
::v-deep .el-submenu.is-active .el-submenu__title i {
  color: $--color-primary;
}
</style>
