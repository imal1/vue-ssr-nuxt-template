<template>
  <Tutorial/>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import consola from 'consola'

export default defineComponent({
  layout: 'section',
  setup() {

  },
  mounted() {
    consola.log('111')
  }
})
</script>
