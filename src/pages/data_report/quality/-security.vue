<template>
  <el-row>
    <el-col :span="12">
      <div class="ml-8px text-lg" style="margin-bottom: 10px">
        医疗安全各项指标明细
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
          prop="name"
          label="质量指标名称"
          width="60%"
          cell-style="text-decoration: underline"
        ></el-table-column>
        <el-table-column
          prop="num"
          label="发生例数"
          width="20%"
        ></el-table-column>
        <el-table-column
          prop="rate"
          label="发生率"
          width="20%"
        ></el-table-column>
      </el-table>
    </el-col>

    <el-col :span="12">
      <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
        <!-- <div class="marktips">
          <b>手术患者手术后肺栓塞发生例数和发生率</b><br />
          【指标定义】<br />ICD-10编码：I26.9的手术患者肺栓塞发生例数；以及手术患者手术后肺栓塞发生例数占同期手术患者出院人次的比例。<br />【计算公式】<br />手术患者手术后肺栓塞发生率=手术患者手术后肺栓塞发生例数/同期手术患者出院人次×100%
        </div> -->
        <div v-show="chartname" class="ml-8px text-lg">
          {{chartname}}分析
        </div>
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
      chartname: ''
    }
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api.safe('listReport',func.getyearmonth(this.searchModel)).then(res => {
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
      .safe('listReport', func.getyearmonth(this.searchModel))
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
            '医疗安全各项指标明细',
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
        .safe('listTrend', opt)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartB').innerHTML = ''
            comchart('chartB', res.data.data.counts, res.data.data.rates)
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
        .safe('listTrendCounts', opt2)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartA').innerHTML = ''
            twinchart('chartA', res.data.data, '人数')
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
.marktips {
  font-size: 12px;
  margin: 20px;
}
.el-table__body,
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  cursor: pointer;
}
</style>
