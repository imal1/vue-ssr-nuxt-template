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
      :default-active="defaultIndex"
      mode="horizontal"
      @select="(index) => (defaultIndex = index)"
    >
      <template v-for="item in menuList">
        <el-menu-item
          :key="item.index"
          class="mr-8 p-0"
          :index="item.index"
          :route="item.route"
        >
          <template slot="title">
            <el-button>
              {{ item.name }}
            </el-button>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  PropType,
  onMounted,
  useRoute,
  getCurrentInstance,
  watch,
} from '@nuxtjs/composition-api'
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
    const defaultIndex = ref()
    const menuList = reactive(props.list)
    const route = useRoute().value
    const { proxy }: any = getCurrentInstance()

    onMounted(() => {
      if (
        !route.path ||
        menuList.every((list: { path: string }) => list.path !== route?.path)
      ) {
        proxy.defaultIndex = menuList[0].index
      }
    })

    watch(defaultIndex, (newIndex, oldIndex) => {
      if (newIndex !== oldIndex) {
        console.log(newIndex)
      }
    })

    return {
      root,
      menuList,
      defaultIndex,
    }
  },
})
</script>
