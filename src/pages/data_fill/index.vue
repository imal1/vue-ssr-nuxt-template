<!--
 * @Author: imali
 * @Date: 2021-09-18 14:32:08
 * @LastEditTime: 2021-10-13 11:18:44
 * @LastEditors: imali
 * @Description:
-->
<template>
  <div>data_fill</div>
</template>
<script>
export default {
  middleware: ['menu'],
  watchQuery: ['menu'],
  mounted() {
    const { menuList } = this.$storage.state
    this.$router.replace(menuList[0].route)
  }
}
</script>
