<template>
  <Form inline label-width="0" :items="searchItems" :values="searchModel">
    <template #type>
      <el-radio label="year">{{ DateType.year }}</el-radio>
      <el-radio label="quarter">{{ DateType.quarter }}</el-radio>
      <el-radio label="month">{{ DateType.month }}</el-radio>
    </template>
    <template #date>
      <el-date-picker
        v-model="
          searchModel[
            searchModel.type === 'quarter' ? 'year' : searchModel.type
          ]
        "
        :scoped="searchModel.type === 'quarter' ? 'year' : searchModel.type"
        :type="searchModel.type === 'quarter' ? 'year' : searchModel.type"
        :placeholder="`请选择${
          DateType[searchModel.type === 'quarter' ? 'year' : searchModel.type]
        }`"
      />
      <el-select
        v-if="searchModel.type === 'quarter'"
        v-model="searchModel.quarter"
        placeholder="请选择季"
      >
        <el-option
          v-for="key in [1, 2, 3, 4]"
          :key="key"
          :label="`第${$nzhcn.encodeS(key)}季度`"
          :value="key"
        />
      </el-select>
    </template>
    <template #action>
      <el-button type="primary">查询</el-button>
    </template>
  </Form>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import { DateType } from '../../typings/types'

export default defineComponent({
  setup() {
    const searchModel = reactive({
      type: 'year',
    })
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
<style lang="scss" scoped>
.el-date-editor {
  width: 172px;
}
</style>
