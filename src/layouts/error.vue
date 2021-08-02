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
    <Result
      icon="error"
      :title="error.statusCode === 404 ? '404' : '发生错误'"
      :sub-title="error.statusCode === 404 ? '找不到页面' : error.message"
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
