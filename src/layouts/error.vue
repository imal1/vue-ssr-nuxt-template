<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      text-center
      px-40px
      py-30px
    "
  >
    <!-- <i class="el-icon-error text-64px"></i>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1> -->
    <Result
      icon="error"
      :title="error.statusCode === 404 ? '404' : '错误提示'"
      :sub-title="error.statusCode === 404 ? '找不到页面' : '发生错误'"
    />
    <NuxtLink to="/">
      <el-link type="primary">返回首页</el-link>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
