<!--
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 11:21:08
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 17:53:22
-->
<template>
  <el-menu :ref="root" :router="router" mode="horizontal">
    <template v-for="(item, index) in menuList">
      <el-menu-item :key="index" class="mr-8 pd-0" :index="item.index">
        <template slot="title">
          <el-button>
            {{ item.name }}
          </el-button>
        </template>
    </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, PropType } from '@nuxtjs/composition-api'
import { Route } from "vue-router"

interface IMenuItem {
  name: string;
  index: string;
  route?: Route
}

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<IMenuItem[]>,
      required: true
    },
    router: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  setup(props: any) {
    const root = ref(null)
    const menuList = reactive(props.list)

    return {
      root,
      menuList
    }
  }
})
</script>
