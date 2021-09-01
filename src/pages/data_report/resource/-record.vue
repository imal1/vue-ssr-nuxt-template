<template>
  <el-tabs v-model="tabActive" type="card" class="w-full">
    <el-tab-pane label="床位资源配置" name="bed">
      <el-col :span="12">
        <div class="ml-8px text-lg">
          床位资源配置明细表
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
          :data="tableDatax"
          height="calc(100vh - 200px)"
          stripe
          border
          highlight-current-row
        :span-method="objectSpanMethod"
          @row-click="handletablerow"
        >
          <el-table-column
            prop="deptName"
            label="科室名称"
            width="20%"
            cell-style="text-decoration: underline"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="指标名称"
            width="35%"
            cell-style="text-decoration: underline"
          ></el-table-column>
          <el-table-column
            prop="currentVal"
            label="本期值"
            width="15%"
          ></el-table-column>
          <el-table-column
            prop="periodVal"
            label="同期值"
            width="15%"
          ></el-table-column>
          <el-table-column
            prop="compareVal"
            label="同比"
            width="15%"
          ></el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
        <div style="max-height: calc(100vh - 174px); overflow-y: scroll">
          <div v-show="chartname" class="ml-8px text-lg">
            {{ chartname }}时间趋势
          </div>
          <div id="chartA" style="margin: 20px"></div>
          <div v-show="chartname" class="ml-8px text-lg">
            {{ chartname }}分布
          </div>
          <div id="chartB" style="margin: 20px"></div>
        </div>
      </el-col>
    </el-tab-pane>
    <el-tab-pane label="手术运行分析" name="surgery">
      <div style="max-height: calc(100vh - 172px); overflow-y: scroll">
        <el-row :gutter="20" style="margin: 10px 0;">
          <el-col :span="12">
            <div class="ml-8px text-lg">出院手术概况</div>
            <div v-if="cardData.length > 0" class="topshowcard">
              <div v-for="v in cardData" :key="v.id" class="topshowcards">
                <!-- <h2 v-text="v.name"></h2> -->
                <!-- <b style="font-size: 16px; color: #454545;cursor: pointer;text-decoration: underline;" @click="handletablerowB(v)" v-text="v.name"></b> -->
                <b style="font-size: 16px; color: #454545;" v-text="v.name"></b>
                <div class="topshowcarddatas">
                  <p><span>当前值:</span>{{ v.currentVal }}</p>
                  <p><span>同期值:</span>{{ v.periodVal }}</p>
                  <p><span>同比:</span>{{ v.compareVal }}<span>%↑</span></p>
                </div>
              </div>
            </div>
          <!-- </el-col> -->
          <!-- <el-col v-show="chartnameC" :span="12">
            <div class="ml-8px text-lg">{{chartnameC}}</div>
            <div id="chartE"></div>
          </el-col> -->
        <!-- </el-row> -->
        <!-- <el-row :gutter="20" style="margin: 10px 0;"> -->
          <!-- <el-col :span="12"> -->
            <div class="ml-8px text-lg">出院手术患者比例时间趋势</div>
            <div id="chartC"></div>
          </el-col>
          <el-col v-show="chartnameB" :span="12">
            <div class="ml-8px text-lg">{{chartnameB}}</div>
            <div id="chartD"></div>
          </el-col>
        </el-row>
        <div style="margin: 10px">
          <div class="ml-8px text-lg">出院手术概况</div>
          <el-table
            v-if="tableDataB.length > 0"
            id="printObj"
            :data="tableDataB"
            height="360px"
            stripe
            highlight-current-row
          >
            <el-table-column type="index" width="5%"></el-table-column>
            <el-table-column
              prop="deptName"
              label="科室名称"
              width="20%"
            ></el-table-column>
            <el-table-column
              prop="surgeryOutRate"
              sortable
              width="15%"
            >
              <template slot="header">
                <span class="tableheada" @click="handletableA(0,'各科室年手术人次占其出院人次比例')">各科室年手术人次占其出院人次比例</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="surgeryNum"
              label="出院患者手术人次数"
              sortable
              width="15%"
            ></el-table-column>
            <el-table-column
              prop="outNum"
              label="出院患者人次数"
              sortable
              width="15%"
            ></el-table-column>
            <el-table-column
              prop="deptAllOutRate"
              sortable
              width="15%"
            >
              <template slot="header">
                <span class="tableheada" @click="handletableA(1,'各科室出院患者人次数占全院出院患者人次数比例')">各科室出院患者人次数占全院出院患者人次数比例</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="deptAllSurgeryRate"
              sortable
              width="15%"
            >
              <template slot="header">
                <span class="tableheada" @click="handletableA(2,'各科室手术人次数占全院手术人次数比例')">各科室手术人次数占全院手术人次数比例</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script type="text/javascript">
import api from '@/plugins/api'
import func from '@/plugins/func'
import comchart from '@/components/chart/column_line'
import comTLchart from '@/components/chart/column_twin_line'
import rankchart from '@/components/chart/column_rank'
// import circlePie from '@/components/chart/circle_pie'

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
      tableDataB: [],
      tabActive: 'bed',
      chartname: '',
      chartnameB: '',
      // chartnameC: '',
    }
  },
  computed: {
    tableDatax() {
      const x = this.tableData
      return func.spanTable(x, ['deptName'])
    },
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api.bed('listReport',func.getyearmonth(this.searchModel)).then(res => {
        if(res.data.data){
          that.tableData = res.data.data
        }
      }).catch(err=>{
        this.$message.warning(err)
      })
      document.getElementById('chartA').innerHTML = ''
      document.getElementById('chartB').innerHTML = ''
      document.getElementById('chartC').innerHTML = ''
      document.getElementById('chartD').innerHTML = ''
      // document.getElementById('chartE').innerHTML = ''
      that.chartname = ''
      that.chartnameB = ''
      // that.chartnameC = ''
    },
    deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    api
      .bed('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.tableData = res.data.data
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
    api
      .surgery('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.cardData = res.data.data
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
    api
      .surgery('listTrend', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
            document.getElementById('chartC').innerHTML = ''
            comTLchart('chartC', res.data.data.counts, res.data.data.rates)
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
    api
      .surgery('listReportDetail', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.tableDataB = res.data.data
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
    },
    // 打印
    leadOut() {
      if (this.tableData.length > 0) {
        this.$confirm('是否确定导出文件?', '提示', {}).then(() => {
          func.printTable(
            '床位资源配置明细表',
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
        .bed('listTrend', opt)
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
        month: func.getyearmonth(this.searchModel).month,
        targetId: e.targetId,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .bed('listHistogram', opt2)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartB').innerHTML = ''
            rankchart('chartB', res.data.data, '人数')
            // that.chartDataB = res.data.data
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })
      this.chartname = e.name

      loading.close()
    },

    async handletableA(v,o) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      const opt = {
        index: v,
        month: func.getyearmonth(this.searchModel).month,
        year: func.getyearmonth(this.searchModel).year,
      }
      await api
        .surgery('listHistogram', opt)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartD').innerHTML = ''
            rankchart('chartD', res.data.data, '人数')
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })
      this.chartnameB = o
      loading.close()

    },
    // async handletablerowB(e) {
      // // const that = this
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)',
      // })

      // const opt2 = {
      //   chapterId: e.chapterId,
      //   month: func.getyearmonth(this.searchModel).month,
      //   targetId: e.targetId,
      //   deptId: e.deptId,
      //   year: func.getyearmonth(this.searchModel).year,
      // }
      // await api
      //   .surgery('listCake', opt2)
      //   .then((res) => {
      //       circlePie('chartE', res.data.data, e.name)
      //     if (res.data.data) {
      //       document.getElementById('chartE').innerHTML = ''
      //       circlePie('chartE', res.data.data, e.name)
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message.warning(err)
      //   })
      // this.chartnameC = e.name

      // loading.close()
    // },
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
