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
      :router="router"
      :default-active="menuIndex"
      mode="horizontal"
      class="border-none"
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
  watch,
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
  setup(props: any, { attrs }: any) {
    const root = ref(null)
    const menuList = computed(() => props.list)
    const menuIndex = computed(() => {
      if (menuList.value.length) {
        const { path, children } = menuList.value[0]
        return children?.length ? `${path}${children[0].path}` : path
      } else {
        return ''
      }
    })
    const menuEvents = ref({})
    const menuAttrs = ref({})

    watch(attrs, (newAttrs) => {
      menuEvents.value = pickBy(newAttrs, isFunction)
      menuAttrs.value = omit(newAttrs, keys(menuEvents.value))
    })

    return {
      root,
      menuList,
      menuIndex,
      menuAttrs,
      menuEvents,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> div.el-menu--horizontal {
  margin-left: -10px;
}

>>> .el-menu--horizontal > .el-menu-item,
>>> .el-menu--horizontal > .el-submenu .el-submenu__title {
  padding: 0;
  line-height: 60px;
  height: 48px;
}

>>> .el-menu--horizontal > .el-menu-item:not(:last-child),
>>> .el-menu--horizontal > .el-submenu .el-submenu__title:not(:last-child) {
  margin-right: 20px;
}

>>> .el-menu--collapse .el-menu .el-submenu,
>>> .el-menu--popup,
>>> .el-submenu .el-menu-item {
  min-width: 0px;
}

>>> .el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
>>> .el-menu--horizontal > .el-menu-item.is-active,
>>> .el-menu--horizontal .el-menu .el-menu-item.is-active,
>>> .el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title,
>>> .el-submenu.is-active .el-submenu__title i {
  color: #409eff;
}
</style>
