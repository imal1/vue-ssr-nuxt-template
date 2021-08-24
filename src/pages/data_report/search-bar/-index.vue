<template>
  <Form
    class="pt-8px pl-8px"
    inline
    label-width="0"
    :items="searchItems"
    :values="searchModel"
  >
    <template #type>
      <el-radio label="year">{{ DateType.year }}</el-radio>
      <el-radio label="month">{{ DateType.month }}</el-radio>
    </template>
    <template #date>
      <el-date-picker
        v-model="searchModel.date"
        :type="searchModel.type"
        :placeholder="`请选择${DateType[searchModel.type]}`"
        :format="searchModel.type === 'year' ? 'yyyy' : 'yyyy-MM'"
      />
    </template>
    <template #action>
      <el-button type="primary" @click="doSearch">查询</el-button>
    </template>
  </Form>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { DateType } from './util'

export default defineComponent({
  props: {
    search: {
      type: Object,
      required: true,
    },
    doSearch: {
      type: Function,
      required: true,
    },
  },
  setup(props: any) {
    const searchModel = computed(() => props.search)
    const searchItems = computed(() => [
      {
        prop: 'type',
        content: {
          is: 'el-radio-group',
        },
      },
      {
        prop: 'date',
      },
      {
        prop: 'action',
      },
    ])
    return {
      DateType,
      searchModel,
      searchItems,
    }
  },
})
</script>
