<template>
  <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
    <div class="ml-8px text-lg">医疗服务能力指标全院概况</div>

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

    <div style="margin: 10px 0 5px 10px; color: #666; font-size: 12px">
      收治病种数量：<br />【指标定义】医院收治病种（ICD-10四位亚目数量）数量。<br />【计算公式】根据ICD-10四位亚目，从病案首页中统计主要诊断数量。
    </div>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <div class="ml-8px text-lg">收治病种数量变动趋势</div>
        <div id="chartA" style="margin: 20px"></div>
      </el-col>
      <el-col :span="12">
        <div class="ml-8px text-lg">科室比较</div>
        <div
          id="chartB"
          style="margin: 0 20px;"
        ></div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <div class="ml-8px text-lg">各科室CMI和DRG组数分布</div>
        <div class="poptips">
          <el-popover
            placement="bottom-end"
            title="说明"
            width="300"
            trigger="hover"
          >
            <div>
              CMI（病例组合指数）代表技术难度。<br />DRG组数代表专业覆盖度（广度）。<br />第一象限：高难度、高广度。<br />第二象限：低难度、高广度。<br />第三象限：低难度、低光度。<br />第四象限：高难度、低光度。
            </div>
            <span slot="reference" style="float: right"> 图例说明 </span>
          </el-popover>
        </div>
        <div id="chartC" style="margin: 20px"></div>
      </el-col>
      <el-col :span="12">
        <div class="ml-8px text-lg">各科室时间消耗指数和费用消耗指数分布</div>
        <div class="poptips">
          <el-popover
            placement="bottom-end"
            title="说明"
            width="300"
            trigger="hover"
          >
            <div>
              时间消耗指数代表治疗同类疾病所花费的时间。大于1，表示住院时间超过平均水平；小于1，表示住院时间低于平均水平。<br />费用消耗指数代表治疗同类疾病所花费的费用。大于1，表示住院费用超过平均水平；小于1，表示住院费用低于平均水平。<br />第一象限：住院时间长，费用高。（效率低）<br />第二象限：住院时间短、费用高。（效率一般，需关注住院费用）<br />第三象限：住院时间短、费用低。（效率高）<br />第四象限：住院时间长、费用低。（效率一般，需关注住院时
            </div>
            <span slot="reference" style="float: right"> 图例说明 </span>
          </el-popover>
        </div>
        <div id="chartD" style="margin: 20px"></div>
      </el-col>
    </el-row>

    <el-tabs v-model="tabActive" type="card" style="margin: 20px">
      <el-tab-pane label="按科室" name="按科室">
        <el-table
          v-if="tableData.length > 0"
          :data="tableData"
          stripe
          highlight-current-row
        >
          <el-table-column type="index" width="10%"></el-table-column>
          <el-table-column
            prop="allNum"
            label="病例数"
            width="20%"
          ></el-table-column>
          <el-table-column
            prop="drgNum"
            label="DRG组数"
            width="15%"
          ></el-table-column>
          <el-table-column
            prop="cmiRate"
            label="CMI"
            width="15%"
          ></el-table-column>
          <el-table-column
            prop="timeRate"
            label="时间消耗指数"
            width="20%"
          ></el-table-column>
          <el-table-column
            prop="amountRate"
            label="费用消耗指数"
            width="20%"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="按疾病(DRG组)" name="按疾病"> </el-tab-pane>
    </el-tabs>

    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <div class="ml-8px text-lg">收住病种病例数占比排名</div>
        <div
          id="chartE"
          style="margin: 0 20px; max-height: 250px; overflow-y: scroll"
        ></div>
      </el-col>
      <el-col :span="12">
        <div class="ml-8px text-lg">收治术种病例数占比排名</div>
        <div
          id="chartF"
          style="margin: 0 20px; max-height: 250px; overflow-y: scroll"
        ></div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script type="text/javascript">
// import { MultiView, Bar } from '@antv/g2plot'
// import { TransDateToYearMonth } from '../search-bar/util'
import api from '@/plugins/api'
import func from '@/plugins/func'
import comchart from '@/components/chart/column_line'
import rankchart from '@/components/chart/column_rank'
// import scatchart from '@/components/chart/scat_point'

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
      tabActive: '按科室',
    }
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api
        .service('listReport', func.getyearmonth(this.searchModel))
        .then((res) => {
          if (res.data.data) {
            that.cardData = res.data.data
          }
        })
        .catch((err) => {
          this.$message.warning(err)
        })
      // api
      //   .service('listHashCmiAndDrg', func.getyearmonth(this.searchModel))
      //   .then((res) => {
      //     if (res.data.data) {
      //       const x = res.data.data
      //       x.forEach(function (item) {
      //         item.CMI = Number(item.xvalue)
      //         item.DRG = Number(item.yvalue)
      //         delete item.xvalue
      //         delete item.yvalue
      //       })
      //       document.getElementById('chartC').innerHTML = ''
      //       scatchart('chartC', x, 'CMI', 'DRG')
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message.warning(err)
      //   })
      // api
      //   .service('listHashTimeAndAmount', func.getyearmonth(this.searchModel))
      //   .then((res) => {
      //     if (res.data.data) {
      //       const x = res.data.data
      //       x.forEach(function (item) {
      //         item.时间消耗 = Number(item.xvalue)
      //         item.费用消耗 = Number(item.yvalue)
      //         delete item.xvalue
      //         delete item.yvalue
      //       })
      //       document.getElementById('chartD').innerHTML = ''
      //       scatchart('chartD', x, '时间消耗', '费用消耗')
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message.warning(err)
      //   })
      // api
      //   .service('listReportDetail', func.getyearmonth(this.searchModel))
      //   .then((res) => {
      //     if (res.data.data) {
      //       that.tableData = res.data.data
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message.warning(err)
      //   })
      // document.getElementById('chartE').innerHTML = ''
      // document.getElementById('chartF').innerHTML = ''
      that.chartname = ''
    },
    deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    api
      .service('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.cardData = res.data.data
        }
      })
      .catch((err) => {
        this.$message.warning(err)
      })
    // api
    //   .service('listHashCmiAndDrg', func.getyearmonth(this.searchModel))
    //   .then((res) => {
    //     if (res.data.data) {
    //       const x = res.data.data
    //       x.forEach(function (item) {
    //         item.CMI = Number(item.xvalue)
    //         item.DRG = Number(item.yvalue)
    //         delete item.xvalue
    //         delete item.yvalue
    //       })
    //       document.getElementById('chartC').innerHTML = ''
    //       scatchart('chartC', x, 'CMI', 'DRG')
    //     }
    //   })
    //   .catch((err) => {
    //     this.$message.warning(err)
    //   })
    // api
    //   .service('listHashTimeAndAmount', func.getyearmonth(this.searchModel))
    //   .then((res) => {
    //     if (res.data.data) {
    //       const x = res.data.data
    //       x.forEach(function (item) {
    //         item.时间消耗 = Number(item.xvalue)
    //         item.费用消耗 = Number(item.yvalue)
    //         delete item.xvalue
    //         delete item.yvalue
    //       })
    //       document.getElementById('chartD').innerHTML = ''
    //       scatchart('chartD', x, '时间消耗', '费用消耗')
    //     }
    //   })
    //   .catch((err) => {
    //     this.$message.warning(err)
    //   })
      // api
      //   .service('listReportDetail', func.getyearmonth(this.searchModel))
      //   .then((res) => {
      //     if (res.data.data) {
      //       that.tableData = res.data.data
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message.warning(err)
      //   })
    // 最下面两个我还没找到api
    // api.service('',func.getyearmonth(this.searchModel)).then(res => {
    // 	if(res.data.data){
    //            document.getElementById('chartE').innerHTML = ''
    //            rankchart('chartE', res.data.data, '例数')
    // 	}
    // }).catch(err=>{
    // 	this.$message.warning(err)
    // })
    // api.service('',func.getyearmonth(this.searchModel)).then(res => {
    // 	if(res.data.data){
    //            document.getElementById('chartF').innerHTML = ''
    //            rankchart('chartE', res.data.data, '例数')
    // 	}
    // }).catch(err=>{
    // 	this.$message.warning(err)
    // })
  },

  methods: {
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
        .service('listTrend', opt)
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
        .service('listHistogram', opt2)
        .then((res) => {
          if (res.data.data) {
            document.getElementById('chartB').innerHTML = ''
            rankchart('chartB', res.data.data, '本期值')
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

.poptips {
  font-size: 12px;
  text-align: right;
  color: #666;
}
.poptips span {
  display: inline-block;
  cursor: pointer;
}
.poptips span:hover {
  color: #0080ff;
}
</style>

<style type="text/css">
.el-table__body,
.el-table__header {
  width: 100% !important;
}
.el-table th.gutter {
  display: table-cell !important;
}
.el-table th.gutter,
  colgroup.gutter {
    display: block !important;
    width: 4px !important
  }

</style>
