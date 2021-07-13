<template>
  <el-menu :ref="root" :router="router" mode="horizontal">
    <template v-for="(item, index) in menuList">
      <el-menu-item :key="index" :index="item.index">
        <template slot="title">
          {{ item.name }}
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
