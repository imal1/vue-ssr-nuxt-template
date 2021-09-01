<template>
  <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
    <div class="ml-8px text-lg">
      神经系统疾病医疗质量控制指标
      <el-button
        type="primary"
        style="float: right; margin-right: 20px"
        size="mini"
        plain
        @click="leadOut"
        >导出</el-button
      >
    </div>

    <div style="margin: 10px">
      <el-table
        v-if="tableData.length > 0"
        id="printObj"
        :data="tableDatax"
        stripe
        border
        :span-method="objectSpanMethod"
      >
        <el-table-column
          prop="bigCategory"
          label="指标类别"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="smallCategory"
          label="指标名称"
          width="20%"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="指标拆解"
          width="20%"
        ></el-table-column>
        <el-table-column
          prop="threeVal"
          :label="years[3] + '年'"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="twoVal"
          :label="years[2] + '年'"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="oneVal"
          :label="years[1] + '年'"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="thisVal"
          :label="years[0] + '年'"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="avgVal"
          label="近4年平均值"
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
    </div>
  </div>
</template>

<script type="text/javascript">
// import { MultiView, Bar } from '@antv/g2plot'
// import { TransDateToYearMonth } from '../search-bar/util'
import api from '@/plugins/api'
import func from '@/plugins/func'
// import comchart from '@/components/chart/column_line';
// import rankchart from '@/components/chart/column_rank';

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
      years: [],

      pagesize: 20,
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
      api.nervous('listReport',func.getyearmonth(this.searchModel)).then(res => {
        if(res.data.data){
          that.tableData = res.data.data
        }
      }).catch(err=>{
        this.$message.warning(err)
      })
    },
    deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    let x = new Date().getFullYear()
    for (let i = 0; i < 4; i++) {
      this.years.push(x)
      x--
    }
    api
      .nervous('listReport', func.getyearmonth(this.searchModel))
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
            '神经系统疾病医疗质量控制指标',
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
  },
}
</script>

<style type="text/css">
.el-table__body,
.el-table__header {
  width: 100% !important;
}
</style>
