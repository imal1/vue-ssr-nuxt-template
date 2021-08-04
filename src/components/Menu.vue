<!--
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-15 17:11:18
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 17:33:06
-->
<template>
  <el-menu :ref="root" v-bind="menuAttrs" v-on="menuEvents">
    <template v-for="(item, key) in menuList">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :key="key"
        v-bind="item"
      >
        <template slot="title">
          <i v-if="item.icon" :class="`el-icon-${item.icon}`" />
          <span>{{ item.name }}</span>
        </template>
        <template v-for="(subItem, subKey) in item.children">
          <el-submenu
            v-if="subItem.children && subItem.children.length > 0"
            :key="`${key}-${subKey}`"
            v-bind="subItem"
          >
            <template slot="title">
              <i v-if="subItem.icon" :class="`el-icon-${subItem.icon}`" />
              <span>{{ subItem.name }}</span>
            </template>
            <template v-for="(trdItem, trdKey) in subItem.children">
              <el-menu-item
                :key="`${key}-${subKey}-${trdKey}`"
                v-bind="trdItem"
              >
                <template slot="title">
                  <i v-if="trdItem.icon" :class="`el-icon-${trdItem.icon}`" />
                  <span>{{ trdItem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="`${key}-${subKey}`" v-bind="subItem">
            <template slot="title">
              <i v-if="subItem.icon" :class="`el-icon-${subItem.icon}`" />
              <span>{{ subItem.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :key="key" v-bind="item">
        <template slot="title">
          <i v-if="item.icon" :class="`el-icon-${item.icon}`" />
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import { omit, keys, isFunction, pickBy } from 'lodash'
import { IMenuItem } from './typings'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<IMenuItem[]>,
      required: true,
    },
  },
  setup({ list }: any, ctx: any) {
    const root = ref(null)
    const menuList = ref(list)
    const menuEvents = ref({})
    const menuAttrs = ref({})

    watch(ctx.attrs, (newAttrs) => {
      menuEvents.value = pickBy(newAttrs, isFunction)
      menuAttrs.value = omit(newAttrs, keys(menuEvents.value))
    })

    return {
      root,
      menuList,
      menuAttrs,
      menuEvents,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> .el-menu-item,
>>> .el-submenu__title {
  height: 48px;
  line-height: 48px;
}
.el-submenu .el-menu-item {
  height: 42px;
  line-height: 42px;
}
</style>

function keys(value: {}): any {
  throw new Error('Function not implemented.')
}

function pickBy(newAttrs: { [x: string]: unknown }, isFunction: any): {} {
  throw new Error('Function not implemented.')
}

function omit(newAttrs: { [x: string]: unknown }, arg1: any): {} {
  throw new Error('Function not implemented.')
}

function keys(value: {}): any {
  throw new Error('Function not implemented.')
}
