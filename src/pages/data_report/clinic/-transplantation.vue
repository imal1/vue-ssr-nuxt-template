<template>
  <el-row
    :gutter="20"
    style="margin: 0; max-height: calc(100vh - 120px); overflow-y: scroll"
  >
    <el-col :span="12">
      <div class="ml-8px text-lg">
        人体器官捐献、获取与移植技术指标
        <el-button
          type="primary"
          style="float: right; margin-right: 20px"
          size="mini"
          plain
          @click="leadOut"
          >导出</el-button
        >
      </div>
      <el-table
        v-if="tableData.length > 0"
        id="printObj"
        :data="tableDatax"
        stripe
        highlight-current-row
        border
        :span-method="objectSpanMethod"
        @row-click="handletablerow"
      >
        <el-table-column
          prop="bigCategory"
          label="指标名称"
          width="25%"
        ></el-table-column>
        <el-table-column
          prop="smallCategory"
          label="指标分类"
          width="25%"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="指标名称"
          width="20%"
        ></el-table-column>
        <el-table-column
          prop="currentVal"
          label="本期值"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="periodVal"
          label="同期值"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="compareVal"
          label="同比"
          width="10%"
        ></el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="nowpage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="tableData.length"
        @row-click="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
    <el-col :span="12">
      <div v-show="chartname" class="ml-8px text-lg">{{ chartname }}</div>
      <div id="chartA" style="margin: 20px"></div>
      <div id="chartB" style="margin: 20px"></div>
    </el-col>
  </el-row>
</template>

<script type="text/javascript">
// import { MultiView, Bar } from '@antv/g2plot'
// import { TransDateToYearMonth } from '../search-bar/util'
import api from '@/plugins/api'
import func from '@/plugins/func'
import comchart from '@/components/chart/column_line'
import panelchart from '@/components/chart/panel_normal'

export default {
  props: {
    searchModel: {
      type: Object,
      required: true,
      default: new Date(),
    },
  },

  data() {
    return {
      tableData: {},
      chartname: '',
      pagesize: 12,
      nowpage: 1,
      pages: 0,
    }
  },
  computed: {
    tableDatax() {
      const x = this.tableData
      const num = this.nowpage - 1
      let NO = this.pagesize * num
      const data = []
      for (let i = 0; i < this.pagesize; i++) {
        if (NO < x.length) {
          data.push(x[NO])
          NO++
        }
      }
      return func.spanTable(data, ['bigCategory', 'smallCategory'])
    },
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api.transplantation('listReport',func.getyearmonth(this.searchModel)).then(res => {
        if(res.data.data){
          that.tableData = res.data.data
        }
      }).catch(err=>{
        this.$message.warning(err)
      })
      document.getElementById('chartA').innerHTML = ''
      document.getElementById('chartB').innerHTML = ''
      that.chartname = ''
    },
    deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    api
      .transplantation('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.tableData = res.data.data
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
  },

  methods: {
    // 表格合并同类项
    objectSpanMethod({ row, columnIndex }) {
      if (columnIndex === 0) {
        // eslint-disable-next-line eqeqeq
        if (row.span0 != 0) {
          return {
            rowspan: row.span0,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
      if (columnIndex === 1) {
        // eslint-disable-next-line eqeqeq
        if (row.span1 != 0) {
          return {
            rowspan: row.span1,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
    // 打印
    leadOut() {
      if (this.tableData.length > 0) {
        this.$confirm('是否确定导出文件?', '提示', {}).then(() => {
          func.printTable(
            '人体器官捐献、获取与移植技术指标',
            document.querySelector('#printObj')
          )
        })
      } else {
        this.$message.error('表格暂无数据')
      }
    },

    // 改编页码
    handleCurrentChange(e) {
      this.nowpage = e
    },

    // 点击表格行
    async handletablerow(e) {
      // const that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      const opt = {
        chapterId: e.chapterId,
        deptId: e.deptId,
        month: func.getyearmonth(this.searchModel).month,
        targetId: e.targetId,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .transplantation('getDetail', opt)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartA').innerHTML = ''
            panelchart('chartA', res.data.data.val, res.data.data.name)
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })

      const opt2 = {
        chapterId: e.chapterId,
        deptId: e.deptId,
        month: func.getyearmonth(this.searchModel).month,
        targetId: e.targetId,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .transplantation('listTrend', opt2)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartB').innerHTML = ''
            comchart('chartB', res.data.data.counts, res.data.data.rates)
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })
      this.chartname = e.name
      loading.close()
    },
  },
}
</script>

<style type="text/css">
.el-table__body,
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  cursor: pointer;
}
</style>
