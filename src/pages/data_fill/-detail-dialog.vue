<template>
  <ButtonDialog
    :button="{
      label: '详细',
      click: doTargetClick,
    }"
    :dialog="{
      destroyOnClose: true,
      title: '科室详情填报',
      width: '60%',
      customClass: 'max-w-600px',
      close: () => $emit('dialog-close'),
    }"
  >
    <Form
      inline
      :items="searchItems"
      :values="searchModel"
      class="flex justify-evenly"
    >
      <template #type>
        <el-radio-button :label="0">按年填报</el-radio-button>
        <el-radio-button :label="1">按月填报</el-radio-button>
      </template>
      <template #reportYear>
        <el-option
          v-for="year in yearList"
          :key="year.REPORT_YEAR"
          :label="`${year.REPORT_YEAR}年`"
          :value="year.REPORT_YEAR.toString()"
        />
      </template>
      <template #reportMonth>
        <el-option
          v-for="(month, key) in $dayjs.months()"
          :key="month"
          :label="month"
          :value="key + 1"
        />
      </template>
    </Form>
    <el-tree
      highlight-current
      default-expand-all
      :expand-on-click-node="false"
      :data="deptList"
      :props="{ label: 'name' }"
    >
      <template #default="{ node, data }">
        <div class="flex justify-between w-full leading-28px">
          <span>{{ node.label }}</span>
          <el-input-number
            v-if="node.isLeaf"
            v-model="targetModel[data.id]"
            :min="0"
          />
        </div>
      </template>
    </el-tree>
    <template #footer>
      <el-button type="primary" @click="doSubmitTargets"> 提交 </el-button>
    </template>
  </ButtonDialog>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useStore,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'

interface IDetailDialogProps {
  chapterId: number
  name: string
  targetId: number
  generalChapterId: string
}

export default defineComponent({
  props: {
    row: {
      type: Object as PropType<IDetailDialogProps>,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    const deptList = ref(store.getters.deptList)
    const searchModel = ref({} as any)
    const yearList = computed(() => store.getters['data_fill/yearList'])
    const targetList = computed(() => store.getters['data_fill/targetList'])
    const targetModel = ref({})
    const searchItems = ref([
      {
        prop: 'type',
        content: {
          is: 'el-radio-group',
          change: (type: number) => {
            if (type) {
              searchItems.value.push({
                prop: 'reportMonth',
                content: {
                  is: 'el-select',
                  placeholder: '请选择月份',
                  style: { width: '110px' },
                },
              })
            } else {
              searchItems.value.splice(2, 1)
            }
          },
        },
      },
      {
        prop: 'reportYear',
        content: {
          is: 'el-select',
          placeholder: '请选择年份',
          style: { width: '110px' },
        },
      },
    ])

    return {
      deptList,
      yearList,
      targetList,
      searchItems,
      searchModel,
      targetModel,
    }
  },
  watch: {
    targetList(newList: any[]) {
      const result: any = {}
      const { $_ }: any = this
      $_.each(newList, (item: any) => {
        result[item.reportDeptId] = item.val
      })
      this.targetModel = result
    },
    searchModel: {
      handler(newModel: any) {
        this.getTargetList(newModel)
      },
      deep: true,
    },
  },
  methods: {
    async getTargetList(model: any) {
      const { $datafillApi, $store }: any = this
      const { targetId } = this.row
      const { type, reportYear, reportMonth } = model
      try {
        const targetList = await $datafillApi.getTargetDeptList({
          targetId,
          reportYear,
          reportMonth: type ? reportMonth : 0,
        })
        $store.dispatch('data_fill/setTargetList', targetList)
      } catch (error) {
        throw new Error(error)
      }
    },
    doTargetClick() {
      this.$emit('target-click')
      this.searchModel = {
        type: 0,
        reportYear: this.$route.query.year,
        reportMonth: 1,
        ...this.searchModel,
      }
    },
    async doSubmitTargets() {
      const { $datafillApi }: any = this
      const { map, omitBy, isNil }: any = this.$_
      const { targetId, chapterId, generalChapterId, name } = this.row
      try {
        await $datafillApi.saveTargetDept(
          map(
            omitBy(cloneDeep(this.targetModel), isNil),
            (val: any, reportDeptId: any) => ({
              name,
              val,
              targetId,
              chapterId,
              reportDeptId,
              generalChapterId,
              reportYear: this.searchModel.reportYear,
              reportMonth: this.searchModel.type
                ? this.searchModel.reportMonth
                : 0,
            })
          )
        )
        this.$message.success('提交成功')
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.el-tree {
  max-height: calc(70vh - 160px);
  overflow: auto;
  padding: 0 20px;
  ::v-deep .el-tree-node__content {
    height: 36px;
  }
}
</style>
