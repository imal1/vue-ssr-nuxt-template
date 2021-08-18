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
            <div class="nav-button">
              <i v-if="item.icon" :class="`el-icon el-icon-${item.icon}`" />
              {{ item.name }}
            </div>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              :key="subItem.path"
              :index="`${item.path}${subItem.path}`"
              :route="item.route"
            >
              <template slot="title">
                <div class="nav-button">
                  <i
                    v-if="subItem.icon"
                    :class="`el-icon el-icon-${subItem.icon}`"
                  />
                  {{ subItem.name }}
                </div>
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
            <div class="nav-button">
              <i v-if="item.icon" :class="`el-icon el-icon-${item.icon}`" />
              {{ item.name }}
            </div>
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
::v-deep .el-menu,
::v-deep .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
::v-deep .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
  background: transparent;
}
::v-deep .el-menu.el-menu--horizontal,
::v-deep .el-menu-item {
  border: none !important;
  padding: 0 8px;
}
::v-deep .nav-button {
  height: 34px;
  line-height: 32px;
  margin: 12px 0;
  font-size: 14px;
  padding: 0 10px;
  font-weight: 400;
  border: 1px solid transparent;
}
::v-deep .is-active > .nav-button,
::v-deep .nav-button:hover {
  border-color: #e5e5e5;
  border-radius: 6px;
  background: $--background-color;
}
</style>
