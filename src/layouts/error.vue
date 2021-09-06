<template>
  <div class="flex flex-col justify-center items-center text-center h-full">
    <el-result
      icon="error"
      :title="error.statusCode === 404 ? '404' : '发生错误'"
      :sub-title="error.statusCode === 404 ? '找不到页面' : error.message"
    >
      <template #extra>
        <NuxtLink to="/">
          <el-link type="primary">返回首页</el-link>
        </NuxtLink>
      </template>
    </el-result>
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
