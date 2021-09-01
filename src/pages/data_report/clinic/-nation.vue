<template>
  <el-row :gutter="20" style="margin: 0">
    <el-col :span="12">
      <div class="ml-8px text-lg">
        国家限制类医疗技术指标
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
        :data="tableData"
        height="calc(100vh - 150px)"
        stripe
        highlight-current-row
        @row-click="handletablerow"
      >
        <el-table-column
          prop="name"
          label="指标名称"
          width="40%"
        ></el-table-column>
        <el-table-column
          prop="aval"
          label="备案完成率（%）"
          width="15%"
        ></el-table-column>
        <el-table-column
          prop="bval"
          label="系统填报率（%）"
          width="15%"
        ></el-table-column>
        <el-table-column
          prop="cval"
          label="死亡率（%）"
          width="15%"
        ></el-table-column>
        <el-table-column
          prop="dval"
          label="并发症发生率 （%）"
          width="15%"
        ></el-table-column>
      </el-table>
    </el-col>
    <el-col
      :span="12"
      style="max-height: calc(100vh - 120px); overflow-y: scroll"
    >
      <div v-show="chartname" class="ml-8px text-lg">{{ chartname }}分析</div>
      <el-popover
        placement="bottom-start"
        title="备案完成率"
        width="300"
        trigger="hover"
      >
        <div>
          <b>【指标定义】</b
          ><br />医疗机构已完成备案的国家限制类医疗技术项目数占实际开展国家限制类医疗技术项目数的比例。<br /><b
            >【计算公式】</b
          ><br />备案完成率=实际开展国家限制类医疗技术项目数/医疗机构已完成备案国家限制类医疗技术项目数×100%
        </div>
        <template slot="reference"
          ><span style="cursor: pointer"
            >备案完成率 <i class="el-icon-warning-outline"></i></span
        ></template>
      </el-popover>
      <div id="charta" style="margin: 20px"></div>
      <el-popover
        placement="bottom-start"
        title="系统填报率"
        width="300"
        trigger="hover"
      >
        <div>
          <b>【指标定义】</b
          ><br />医疗机构在医疗技术临床应用管理信息系统上填报的所有国家限制类医疗技术病例总数占同期实际开展所有国家限制类医疗技术病例总数的比例。<br /><b
            >【计算公式】</b
          ><br />系统填报率=医疗机构在医疗技术临床应用管理信息系统上填报的所有国家限制类医疗技术病例总数/同期实际开展所有国家限制类医疗技术病例总数×100%
        </div>
        <template slot="reference"
          ><span style="cursor: pointer"
            >系统填报率 <i class="el-icon-warning-outline"></i></span
        ></template>
      </el-popover>
      <div id="chartb" style="margin: 20px"></div>
      <el-popover
        placement="bottom-start"
        title="死亡率"
        width="300"
        trigger="hover"
      >
        <div>
          <b>【指标定义】</b
          ><br />实施国家限制类医疗技术的患者死亡总人数占同期实施国家限制类医疗技术的患者出院总人数的比例。<br /><b
            >【计算公式】</b
          ><br />死亡率=实施国家限制类医疗技术的患者死亡总人数/同期实施国家限制类医疗技术的患者出院总人数×100%
        </div>
        <template slot="reference"
          ><span style="cursor: pointer"
            >死亡率 <i class="el-icon-warning-outline"></i></span
        ></template>
      </el-popover>
      <div id="chartc" style="margin: 20px"></div>
      <el-popover
        placement="bottom-start"
        title="并发症发生率"
        width="300"
        trigger="hover"
      >
        <div>
          <b>【指标定义】</b
          ><br />实施国家限制类医疗技术的患者发生并发症总人数与同期实施国家限制类医疗技术的患者出院总人数的比例。<br /><b
            >【计算公式】</b
          ><br />并发症发生率=实施国家限制类医疗技术的患者发生并发症总人数/同期实施国家限制类医疗技术的患者出院总人数×100%
        </div>
        <template slot="reference"
          ><span style="cursor: pointer"
            >并发症发生率 <i class="el-icon-warning-outline"></i></span
        ></template>
      </el-popover>
      <div id="chartd" style="margin: 20px"></div>
      <!-- <div id="chartB" style="margin: 20px"></div> -->
      <!-- <div id="chartC" style="margin: 20px"></div> -->
    </el-col>
  </el-row>
</template>

<script type="text/javascript">
// import { MultiView, Bar } from '@antv/g2plot'
// import { TransDateToYearMonth } from '../search-bar/util'
import api from '@/plugins/api'
import func from '@/plugins/func'
import comchart from '@/components/chart/column_line'

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
      api.nation('listReport',func.getyearmonth(this.searchModel)).then(res => {
        if(res.data.data){
          that.tableData = res.data.data
        }
      }).catch(err=>{
        this.$message.warning(err)
      })
      document.getElementById('charta').innerHTML = ''
      document.getElementById('chartb').innerHTML = ''
      document.getElementById('chartc').innerHTML = ''
      document.getElementById('chartd').innerHTML = ''
      that.chartname = ''
    },
    deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    api
      .nation('listReport', func.getyearmonth(this.searchModel))
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
            '国家限制类医疗技术指标',
            document.querySelector('#printObj')
          )
        })
      } else {
        this.$message.error('表格暂无数据')
      }
    },

    // 点击表格行
    async handletablerow(e) {
      const that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const arrobj = ['a', 'b', 'c', 'd']
      await arrobj.forEach(function (v) {
        const opt = {
          chapterId: e[v + 'chapterId'],
          month: func.getyearmonth(that.searchModel).month,
          targetId: e[v + 'targetId'],
          year: func.getyearmonth(that.searchModel).year,
        }
        api
          .nation('listTrend', opt)
          .then((res) => {
            if (res.data.data) {
              document.getElementById('chart' + v).innerHTML = ''
              comchart('chart' + v, res.data.data.counts, res.data.data.rates)
            }
          })
          .catch((err) => {
            that.$message.warning(err)
          })
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
