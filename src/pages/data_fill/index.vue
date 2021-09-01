<template>
  <div class="app-data-fill flex">
    <el-scrollbar class="flex-1">
      <Table
        v-loading="tableLoading"
        :show-header="false"
        :columns="columns"
        :data="detailList"
        :tree-props="{ children: 'childrenList' }"
        row-key="id"
      >
        <template #input="{ row }">
          <el-input-number
            v-if="row.isTarget"
            v-model="row.val"
            :min="0"
            :disabled="row.deptHasVal"
          />
          <span
            v-else-if="row.type && row.formula"
            :get-val="
              (getVal = (t) =>
                $_.get(
                  $_.find(
                    row.childrenList,
                    (c) => c.originId === row.formula[t]
                  ),
                  'val'
                ))
            "
            :set-cal="
              (cal = $_.round(
                $_.divide(getVal('targetIdMo'), getVal('targetIdDe')),
                2
              ))
            "
          >
            {{ $_.isFinite(cal) ? cal : '--' }}
          </span>
        </template>
        <template #extra="{ row }">
          <detail-dialog
            v-if="!!row.isTarget"
            :row="{
              ...row,
              targetId: row.originId,
              generalChapterId: menuActive,
            }"
            @target-click="doSubmit"
            @dialog-close="getDetailList(menuActive, yearAcitve)"
          />
        </template>
      </Table>
      <div
        v-if="!tableLoading && detailList && detailList.length"
        class="flex justify-center my-20px"
      >
        <el-button type="primary" @click="doSubmit">提交</el-button>
      </div>
    </el-scrollbar>
    <el-scrollbar class="timeline-scroll w-100px">
      <el-timeline class="m-0 ml-2px p-0 pt-8px pb-8px w-full">
        <el-timeline-item
          v-for="year in yearList"
          :key="year.REPORT_YEAR"
          hide-timestamp
          :type="
            yearAcitve === $_.toString(year.REPORT_YEAR) ? 'primary' : undefined
          "
          :timestamp="$_.toString(year.REPORT_YEAR)"
        >
          <el-link @click="() => doYearClick(year.REPORT_YEAR)">
            {{ year.REPORT_YEAR }}
          </el-link>
        </el-timeline-item>
      </el-timeline>
      <div class="relative pb-20px">
        <el-link icon="el-icon-plus" @click="$refs['add-year-picker'].focus()">
          添加年份
        </el-link>
        <el-date-picker
          ref="add-year-picker"
          v-model="addYear"
          type="year"
          value-format="yyyy"
          class="fake-date-picker absolute left-0 -z-9999 w-20px"
          :picker-options="pickerOptions"
          @change="doAddYear"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    DetailDialog: async () => await import('./-detail-dialog.vue'),
  },
  setup(_props: any, ctx: any) {
    const { $dayjs } = (getCurrentInstance() as any).proxy
    const { map, includes } = ctx.root.$_
    const route = useRoute()
    const menuActive = computed(() => route.value.query.menu)
    const detailList = ref([] as any[])
    const yearList = computed(() => useStore().getters['data_fill/yearList'])
    const yearAcitve = computed(() => route.value.query.year)
    const addYear = ref('')
    const tableLoading = ref(false)
    const columns = [
      {
        prop: 'name',
      },
      {
        prop: 'input',
        align: 'center',
        width: '160',
      },
      {
        prop: 'extra',
        align: 'center',
        width: '80',
      },
    ]
    const pickerOptions = {
      disabledDate(time: any) {
        return includes(
          map(yearList.value, ({ REPORT_YEAR }: any) => REPORT_YEAR.toString()),
          $dayjs(time).format('YYYY')
        )
      },
    }

    return {
      columns,
      tableLoading,
      detailList,
      yearList,
      addYear,
      menuActive,
      yearAcitve,
      pickerOptions,
    }
  },
  watch: {
    async menuActive(newActive: any) {
      if (this.yearList?.length) {
        await this.getDetailList(newActive, this.yearList[0].REPORT_YEAR)
      }
    },
  },
  watchQuery: ['menu'],
  async mounted() {
    try {
      const api: any = this.$datafillApi
      const menuList = await api.getTopChapterList()
      if (menuList?.length) {
        this.$store.dispatch('setMenuList', menuList)
      }
      const yearList = await api.getYearList()
      if (yearList?.length) {
        this.$store.dispatch('data_fill/setYearList', yearList)
        if (this.menuActive) {
          await this.getDetailList(this.menuActive, yearList[0].REPORT_YEAR)
          this.$router.replace({
            query: {
              ...this.$route.query,
              year: yearList[0].REPORT_YEAR,
            },
          })
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  methods: {
    async getDetailList(chapterId: any, reportYear: any) {
      this.tableLoading = true
      this.detailList = []
      const detailList = await (this.$datafillApi as any).getDetailList({
        chapterId,
        reportYear,
      })
      if (detailList?.length) {
        this.$store.dispatch('data_fill/setDetailList', detailList)
      }
      this.tableLoading = false
      // this.detailList = (this.$_ as any).cloneDeep(
      //   this.$store.getters['data_fill/detailList']
      // )
      this.detailList = this.$store.getters['data_fill/detailList']
    },
    async doSubmit() {
      const results: any[] = []
      function getTargets(arr: any[]): void {
        arr.forEach((item: any) => {
          if (item.targets?.length) {
            results.push(...item.childrenList.filter((c: any) => c.val))
          } else {
            getTargets(item.childrenList)
          }
        })
      }
      getTargets(this.detailList)
      const payload = results
        .filter((item: any) => !item.deptHasVal)
        .map(({ name, val, chapterId, originId }: any) => ({
          name,
          val,
          chapterId,
          id: originId,
          reportYear: this.yearAcitve,
          generalChapterId: this.menuActive,
        }))
      try {
        await (this.$datafillApi as any).saveTarget(payload)
        this.$message.success('提交成功')
      } catch (error) {
        throw new Error(error)
      }
    },
    doAddYear(val: any) {
      const { cloneDeep, toNumber }: any = this.$_
      const newYearList = cloneDeep(this.yearList)
      newYearList.push({ REPORT_YEAR: val })
      newYearList.sort(
        (a: any, b: any) => toNumber(b.REPORT_YEAR) - toNumber(a.REPORT_YEAR)
      )
      this.$store.commit('data_fill/SET_YEAR_LIST', newYearList)
      this.addYear = ''
    },
    async doYearClick(year: any) {
      await this.getDetailList(this.menuActive, year)
      this.$router.replace({ query: { ...this.$route.query, year } })
    },
  },
})
</script>
<style lang="scss" scoped>
.app-data-fill {
  height: calc(100vh - 60px);
  ::v-deep .el-table__empty-block {
    min-height: calc(100vh - 60px);
  }
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
    padding-right: 8px;
  }
  ::v-deep .el-timeline-item__wrapper {
    top: -6px;
  }
  ::v-deep .el-timeline-item:last-child {
    padding: 0;
  }
  ::v-deep .timeline-scroll .el-scrollbar__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-x: hidden;
  }
  ::v-deep .fake-date-picker {
    .el-input__prefix {
      display: none;
    }
    .el-input__inner {
      border: none;
      caret-color: transparent;
    }
  }
}
</style>
