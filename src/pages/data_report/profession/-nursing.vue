<template>
  <el-row>
    <el-col :span="12">
      <div class="ml-8px text-lg" style="margin-bottom: 10px">
        护理专业医疗质量控制指标
        <el-button
          type="primary"
          style="float: right"
          size="mini"
          plain
          @click="leadOut"
          >导出</el-button
        >
      </div>
      <el-table
        v-if="tableData.length > 0"
        id="printObj"
        :data="tableData"
        height="calc(100vh - 150px)"
        stripe
        highlight-current-row
        @row-click="handletablerow"
      >
        <el-table-column
          prop="smallCategory"
          label="指标类别"
          width="35%"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="指标明细"
          width="35%"
          cell-style="text-decoration: underline"
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
    </el-col>

    <el-col :span="12">
      <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
        <div v-show="chartname" class="ml-8px text-lg">{{ chartname }}分析</div>
        <div id="chartA" style="margin: 20px"></div>
        <div id="chartB" style="margin: 20px"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script type="text/javascript">
// import { MultiView, Bar } from '@antv/g2plot'
// import { TransDateToYearMonth } from '../search-bar/util'
import api from '@/plugins/api'
import func from '@/plugins/func'
import comchart from '@/components/chart/column_line'
import twinchart from '@/components/chart/column_twin'

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
    }
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api.nursing('listReport',func.getyearmonth(this.searchModel)).then(res => {
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
      .nursing('listReport', func.getyearmonth(this.searchModel))
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
    // 打印
    leadOut() {
      if (this.tableData.length > 0) {
        this.$confirm('是否确定导出文件?', '提示', {}).then(() => {
          func.printTable(
            '护理专业医疗质量控制指标',
            document.querySelector('#printObj')
          )
        })
      } else {
        this.$message.error('表格暂无数据')
      }
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
        .nursing('listTrendRate', opt)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartB').innerHTML = ''
            const x = res.data.data
            const xcounts = []
            const xrates = []
            x.forEach(function (v){
              if(v.name === '同比'){
                xcounts.push(v)
              }else{
                xrates.push(v)
              }
            })
            comchart('chartB', xcounts, xrates)
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
        .nursing('listTrend', opt2)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartA').innerHTML = ''
            twinchart('chartA', res.data.data)
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
