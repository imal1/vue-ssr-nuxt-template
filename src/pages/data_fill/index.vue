<!--
 * @Author: imali
 * @Date: 2021-09-18 14:32:08
 * @LastEditTime: 2021-09-18 15:39:27
 * @LastEditors: imali
 * @Description:
-->
<template>
  <div>data_fill</div>
</template>
<script>
import { AccessIndexMenuList } from '@/utils'

export default {
  watchQuery: ['menu'],
  async created() {
    const menuList = await this.$globalApi.getMenus()
    this.$storage.setState('menuList', AccessIndexMenuList(menuList))
  },
}
</script>
