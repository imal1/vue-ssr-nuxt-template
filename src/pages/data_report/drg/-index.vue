<template>
  <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
    <div class="ml-8px text-lg">
      单病种（术种）质量控制指标
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
        highlight-current-row
        border
        @row-click="handletablerow"
      >
        <el-table-column type="index" width="6%">
          <template slot-scope="scope">
            <div>{{ pagesize * nowpage + scope.$index + 1 - pagesize }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="单病种名称"
          width="24%"
        ></el-table-column>
        <el-table-column
          prop="aval"
          label="单病种例数（例）"
          sortable
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="bval"
          label="病例上报率（%）"
          sortable
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="cval"
          label="平均住院日（天）"
          sortable
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="dval"
          label="次均费用（元）"
          sortable
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="eval"
          label="死亡人数（人）"
          sortable
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="fval"
          label="病死率（%）"
          sortable
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="gval"
          label="手术患者并发症率（%）"
          sortable
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
    <!-- <template v-show="chartname"> -->
    <div v-show="chartname" class="ml-8px text-lg" style="margin: 10px 0">
      {{ chartname }} 分析
    </div>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="病例上报率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />年度内符合单病种纳入条件的某病种上报至国家单病种质量监测平台的病例数占同期符合单病种纳入条件的同病种病例数累加求和的比例。<br /><b
              >【计算公式】</b
            ><br />病例上报率=年度内符合单病种纳入条件的某病种上报至国家单病种质量监测平台的病例数/同期符合单病种纳入条件的该病种出院人数累加求和×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >病例上报率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="charta" style="margin: 10px"></div>
      </el-col>
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="病例上报率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />年度内符合单病种纳入条件的某病种上报至国家单病种质量监测平台的病例数占同期符合单病种纳入条件的同病种病例数累加求和的比例。<br /><b
              >【计算公式】</b
            ><br />病例上报率=年度内符合单病种纳入条件的某病种上报至国家单病种质量监测平台的病例数/同期符合单病种纳入条件的该病种出院人数累加求和×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >病例上报率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartb" style="margin: 10px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="平均住院日"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />年度内符合单病种纳入条件的某病种出院患者平均住院时间。<br /><b
              >【计算公式】</b
            ><br />平均住院日=某病种出院患者占用总床日数/同期某病种例数
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >平均住院日 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartc" style="margin: 10px"></div>
      </el-col>
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="次均费用"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />年度内符合单病种纳入条件的某病种出院患者平均住院费用。<br /><b
              >【计算公式】</b
            ><br />次均费用=某病种总出院费用/同期某病种例数
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >次均费用 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartd" style="margin: 10px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="病死率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />年度内符合单病种纳入条件的某病种出院患者死亡人数占同期同病种出院人数的比例。<br /><b
              >【计算公式】</b
            ><br />病死率=某病种死亡人数/同期某病种例数×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >病死率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="charte" style="margin: 10px"></div>
      </el-col>
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="病死率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />年度内符合单病种纳入条件的某病种出院患者死亡人数占同期同病种出院人数的比例。<br /><b
              >【计算公式】</b
            ><br />病死率=某病种死亡人数/同期某病种例数×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >病死率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartf" style="margin: 10px"></div>
      </el-col>
    </el-row>
    <!-- </template> -->
  </div>
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
      return data
    },
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api.drg('listReport',func.getyearmonth(this.searchModel)).then(res => {
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
      document.getElementById('charte').innerHTML = ''
      document.getElementById('chartf').innerHTML = ''
      that.chartname = ''
    },
    deep:true// 深度监听父组件传过来对象变化
    }
  },

  mounted() {
    const that = this
    api
      .drg('listReport', func.getyearmonth(this.searchModel))
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
            '单病种（术种）质量控制指标',
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
      const that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const arrobj = ['a', 'b', 'c', 'd', 'e', 'f']
      await arrobj.forEach(function (v) {
        const opt = {
          chapterId: e[v + 'chapterId'],
          month: func.getyearmonth(that.searchModel).month,
          targetId: e[v + 'targetId'],
          year: func.getyearmonth(that.searchModel).year,
        }
        api
          .drg('listTrend', opt)
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
      await loading.close()
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
