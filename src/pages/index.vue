<!--
 * @Author: imali
 * @Date: 2021-09-06 15:07:29
 * @LastEditTime: 2021-09-22 13:21:22
 * @LastEditors: imali
 * @Description:
-->
<template>
  <div />
</template>
<script>
export default {
  created() {
    const routePath = this.$route.name?.split('-')[0]
    const { routeList } = this.$store.state.storage
    if (routePath === 'index' && routeList.length) {
      this.$router.replace(routeList[0].path)
    }
  },
}
</script>
