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
    <i v-if="icon === 'error'" class="el-icon-error text-64px text-danger" />
    <i v-else-if="icon === 'warning'" class="el-icon-warning text-64px text-warning" />
    <i v-else-if="icon === 'success'" class="el-icon-success text-64px text-success" />
    <i v-else-if="icon === 'info'" class="el-icon-info text-64px text-info" />
    <i v-else :class="`text-64px el-icon-${icon}`" />
    <p v-if="title" class="mt-20px text-20px text-text-primary">{{ title }}</p>
    <p v-if="subTitle" class="mt-10px text-14px text-text-regular">
      {{ subTitle }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default() {
        return ''
      },
    },
    title: {
      type: String,
      default() {
        return ''
      },
    },
    subTitle: {
      type: String,
      default() {
        return ''
      },
    },
  },
  setup() {},
})
</script>
