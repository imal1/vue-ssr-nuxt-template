<template>
  <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
    <div class="ml-8px text-lg">科研指标概况</div>

    <div v-if="cardData.length > 0" class="topcard">
      <div v-for="v in cardData" :key="v.id" class="topcards">
        <h2 style="font-weight: bolder" v-text="v.name"></h2>
        <div class="topcardsNum" @click="handleclick(v)">
          {{ v.currentVal }} <span style="font-size: 14px">()</span>
        </div>
        <div class="topcardsbtm">
          同期值：{{ v.periodVal }}（元）&nbsp;&nbsp;&nbsp;同比：{{
            v.compareVal
          }}%↑
        </div>
      </div>
    </div>

    <el-row>
      <el-col :span="12">
        <div class="ml-8px text-lg">每百名卫生技术人员科研项目经费时间趋势</div>
        <div id="chartA" style="margin: 20px"></div>
      </el-col>
      <el-col :span="12">
        <div class="ml-8px text-lg">各科室每百名卫生技术人员科研项目经费</div>
        <div id="chartB" style="margin: 0 20px"></div>
      </el-col>
    </el-row>

    <div class="ml-8px text-lg">
      各科室科研指标明细表
      <el-button
        type="primary"
        style="float: right; margin-right: 20px"
        size="mini"
        plain
        @click="leadOut"
        >导出</el-button
      >
      <div style="margin: 10px 20px 0 0">
        <el-table
          v-if="tableData.length > 0"
          id="printObj"
          :data="tableData"
          height="calc(100vh - 160px)"
          stripe
        >
          <el-table-column type="index" width="3%"></el-table-column>
          <el-table-column
            prop="deptName"
            label="科室"
            width="9%"
          ></el-table-column>
          <el-table-column label="新技术临床转化数量">
            <el-table-column
              prop="hundredAmount"
              label="每百名卫生技术人员科研项目经费（元）"
              width="10%"
            ></el-table-column>
            <el-table-column
              prop="allAmount"
              label="本年度科研项目立项经费总金额（元）"
              width="10%"
            ></el-table-column>
            <el-table-column
              prop="hundredConversionAmount"
              label="每百名卫生技术人员科技成果转化金额（元）"
              width="10%"
            ></el-table-column>
            <el-table-column
              prop="allConversionAmount"
              label="本年度科技成果转化总金额（元）"
              width="10%"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="取得临床相关国家专利数量">
            <el-table-column
              prop="hundredInventionPatentNum"
              label="每百名卫生技术人员发明专利数量（项）"
              width="10%"
            ></el-table-column>
            <el-table-column
              prop="allInventionPatentNum"
              label="本年度医院发明专利总项数（项）"
              width="10%"
            ></el-table-column>
            <el-table-column
              prop="hundredNewInventionPatentNum"
              label="每百名卫生技术人员实用新型专利数量（项）"
              width="10%"
            ></el-table-column>
            <el-table-column
              prop="allNewInventionPatentNum"
              label="本年度医院实用新型专利总项数（项）"
              width="10%"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            prop="personNum"
            label="卫生技术人员数"
            width="8%"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
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
    }
  },
  watch: {
    searchModel:{
      handler(){
        // this.$forceUpdate()
        const that = this
        api
          .science('listReport', func.getyearmonth(this.searchModel))
          .then((res) => {
            if (res.data.data) {
              that.cardData = res.data.data
            }
          })
          .catch((err) => {
            this.$message.warning(err)
          })
        api
          .science('listReportDetail', func.getyearmonth(this.searchModel))
          .then((res) => {
            if (res.data.data) {
              that.tableData = res.data.data
            }
          })
          .catch((err) => {
            this.$message.warning(err)
          })
        // document.getElementById('chartA').innerHTML = ''
        // document.getElementById('chartB').innerHTML = ''
        // that.chartname = ''
      },
      deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    api
      .science('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.cardData = res.data.data
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
    api
      .science('listReportDetail', func.getyearmonth(this.searchModel))
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
            '各科室科研指标明细表',
            document.querySelector('#printObj')
          )
        })
      } else {
        this.$message.error('表格暂无数据')
      }
    },

    async handleclick(e) {
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
        targetId: e.targetId,
        month: func.getyearmonth(this.searchModel).month,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .science('listTrend', opt)
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
        chapterId: e.chapterId,
        targetId: e.targetId,
        month: func.getyearmonth(this.searchModel).month,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .science('listHistogram', opt2)
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

      loading.close()
    },
  },
}
</script>

<style type="text/css" scoped>
.topcard {
  margin: 5px 5px 20px;
  display: flex;
  justify-content: space-between;
}
.topcards {
  width: 100%;
  border-radius: 5px;
  margin: 0 5px;
  border: 1px solid #65bdfb;
  padding: 5px;
}
.topcardsNum {
  color: #4070ff;
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
}
.topcardsbtm {
  color: #666;
  font-size: 13px;
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
