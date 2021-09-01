<template>
  <el-row style="max-height: calc(100vh - 120px); overflow-y: scroll">
    <el-col :span="12">
      <div class="ml-8px text-lg">人员支出概况</div>
      <div v-if="cardData.length > 0" class="topshowcard">
        <div v-for="v in cardData" :key="v.id" class="topshowcards">
          <!-- <h2 v-text="v.name"></h2> -->
          <b style="font-size: 16px; color: #454545" v-text="v.name"></b>
          <div class="topshowcarddatas">
            <p><span>当前值:</span>{{ v.currentVal }}</p>
            <p><span>同期值:</span>{{ v.periodVal }}</p>
            <p><span>同比:</span>{{ v.compareVal }}<span>%↑</span></p>
          </div>
        </div>
      </div>
      <div class="ml-8px text-lg" style="margin-top: 20px">
        各科室人员支出明细表
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
        height="calc(100vh - 160px)"
        stripe
        highlight-current-row
      >
        <el-table-column type="index" width="10%"></el-table-column>
        <el-table-column
          prop="deptName"
          label="科室"
          width="20%"
        ></el-table-column>
        <el-table-column
          prop="rate"
          sortable
          width="30%"
        >
        <template slot="header">
          <span class="tableheada" @click="handletablerow(0,'人员支出占业务支出')">人员支出占业务支出比重(%)</span>
        </template>
      </el-table-column>
        <el-table-column
          prop="personnelFunds"
          sortable
          width="30%"
        >
          <template slot="header">
            <span class="tableheada" @click="handletablerow(1,'人员经费')">人员经费(万元)</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="medicalActivityCost"
          sortable
          width="30%"
        >
          <template slot="header">
            <span class="tableheada" @click="handletablerow(2,'医疗活动费用')">医疗活动费用(万元)</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :span="12">
      <div v-show="chartname" class="ml-8px text-lg">{{chartname}}时间趋势</div>
      <div id="chartA" style="margin: 20px"></div>
      <div v-show="chartname" class="ml-8px text-lg">{{chartname}}比重</div>
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
import rankchart from '@/components/chart/column_rank'

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
      cardData: {},
      tableData: {},
      chartname: ''
    }
  },
  watch: {
    searchModel:{
      handler(){
        // this.$forceUpdate()
        const that = this
        api
          .finance('listReport', func.getyearmonth(this.searchModel))
          .then((res) => {
            if (res.data.data) {
              that.cardData = res.data.data
            }
          })
          .catch((err) => {
            this.$message.warning(err)
          })
        api
          .finance('listReportDetail', func.getyearmonth(this.searchModel))
          .then((res) => {
            if (res.data.data) {
              that.tableData = res.data.data
            }
          })
          .catch((err) => {
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
      .finance('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.cardData = res.data.data
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
    api
      .finance('listReportDetail', func.getyearmonth(this.searchModel))
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
      this.$confirm('是否确定导出文件?', '提示', {}).then(() => {
        func.printTable(
          '各科室人员支出明细表',
          document.querySelector('#printObj')
        )
      })
    },

    async handletablerow(e,ename) {
      // const that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      const opt = {
        index: e,
        month: func.getyearmonth(this.searchModel).month,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .finance('listTrend', opt)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartA').innerHTML = ''
            comchart('chartA', res.data.data.counts, res.data.data.rates)
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })

      const opt2 = {
        index: e,
        month: func.getyearmonth(this.searchModel).month,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .finance('listHistogram', opt2)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartB').innerHTML = ''
            rankchart('chartB', res.data.data, '占比')
            // that.chartDataB = res.data.data
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })
      this.chartname = ename

      loading.close()
    },
  },
}
</script>

<style type="text/css" scoped>
.topshowcard {
  margin: 5px 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #65bdfb;
}
.topshowcarddatas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px 0;
}
.topshowcarddatas p {
  text-align: center;
  width: 100%;
  font-size: 18px;
  color: #333;
}
.topshowcarddatas p span {
  font-size: 12px;
  color: #777;
  margin: 0 3px;
}

.tableheada{
  cursor: pointer;
  text-decoration: underline;
}
</style>

<style type="text/css">
.el-table__body,
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  cursor: pointer;
}
</style>
