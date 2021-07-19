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
      :ref="root"
      :router="router"
      :default-active="mainIndex"
      mode="horizontal"
      @select="doMainSelect"
    >
      <template v-for="item in mainList">
        <el-menu-item
          :key="item.path"
          :index="item.path"
          :route="item.route"
          class="mr-8 p-0"
        >
          <template slot="title">
            <el-button size="medium">
              <i v-if="item.icon" :class="`el-icon el-icon-${item.icon}`"/>
              {{ item.name }}
            </el-button>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
    <el-tabs
      v-if="
        mainList &&
        mainList.length &&
        mainList.some((item) => item.children && item.children.length)
      "
      :value="subIndex"
      class="min-h-54px"
      @tab-click="doSubSelect"
    >
      <template v-for="item in subList">
        <el-tab-pane :key="item.path" :name="item.path">
          <span slot="label">
            <i v-if="item.icon" :class="`el-icon-${item.icon}`" />
            {{ item.name }}
          </span>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import { INavItem } from '../typings'

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
  setup(props: any) {
    const root = ref(null)
    const mainList = ref(props.list)
    const mainIndex = ref(mainList.value[0]?.path)
    const subList = ref(
      mainList.value[0]?.children?.length ? mainList.value[0].children : []
    )
    const subIndex = ref(subList.value?.length ? subList.value[0].path : '')

    const doMainSelect = (index: string) => {
      mainIndex.value = index
      const { children } = mainList.value.find(
        (item: { path: any }) => item.path === mainIndex.value
      )
      if (children?.length) {
        subList.value = children
        subIndex.value = subList.value[0]?.path
      } else {
        subList.value = []
        subIndex.value = ''
      }
    }

    const doSubSelect = ({ name }: any) => {
      subIndex.value = name
    }

    return {
      root,
      mainList,
      mainIndex,
      subList,
      subIndex,
      doMainSelect,
      doSubSelect,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> .el-tabs__nav-wrap::after {
  display: none;
}
.el-menu-item.is-active .el-button {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
