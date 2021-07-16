<!--
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-15 17:11:18
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 17:33:06
-->
<template>
  <el-menu :ref="root" :router="router">
    <template v-for="item in menuList">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :key="item.index"
        :index="item.index"
      >
        <template slot="title">
          <i v-if="item.icon" :class="`el-icon-${item.icon}`" />
          <span>{{ item.name }}</span>
        </template>
        <template v-for="subItem in item.children">
          <el-submenu
            v-if="subItem.children && subItem.children.length > 0"
            :key="subItem.index"
            :index="subItem.index"
          >
            <template slot="title">
              <i v-if="subItem.icon" :class="`el-icon-${subItem.icon}`" />
              <span>{{ subItem.name }}</span>
            </template>
            <template v-for="trdItem in subItem.children">
              <el-menu-item :key="trdItem.index" :index="trdItem.index">
                <template slot="title">
                  <i v-if="trdItem.icon" :class="`el-icon-${trdItem.icon}`" />
                  <span>{{ trdItem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="subItem.index" :index="subItem.index">
            <template slot="title">
              <i v-if="subItem.icon" :class="`el-icon-${subItem.icon}`" />
              <span>{{ subItem.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :key="item.index" :index="item.index">
        <template slot="title">
          <i v-if="item.icon" :class="`el-icon-${item.icon}`" />
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import { IMenuItem } from '../typings'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<IMenuItem[]>,
      required: true,
    },
    router: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  setup(props: any) {
    const root = ref(null)
    const menuList = reactive(props.list)

    return {
      root,
      menuList,
    }
  },
})
</script>
