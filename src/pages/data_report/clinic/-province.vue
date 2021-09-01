<template>
  <div style="max-height: calc(100vh - 120px); overflow-y: scroll">
    <div class="ml-8px text-lg">
      省级限制类医疗技术
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
        :data="tableData"
        stripe
        highlight-current-row
      >
      <el-table-column
          prop="name"
          label="监测指标"
          width="20%"
        ></el-table-column>
        <template v-for="(v, i) in tabledataold">
          <el-table-column
            :key="v.id"
            :prop="'val'+i"
            width="10%"
            sortable
          >
            <template slot="header">
              <span class="tableheada" @click="handletablerow(v)">{{v.name}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!-- <el-table
        v-if="tableData.length > 0"
        id="printObj"
        :data="tableData"
        stripe
        highlight-current-row
        border
        @row-click="handletablerow"
      >
        <el-table-column type="index" width="6%"> </el-table-column>
        <el-table-column
          prop="name"
          label="监测指标"
          width="20%"
        ></el-table-column>
        <el-table-column
          prop="aval"
          label="冠心病介入诊疗技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="bval"
          label="先天性心脏病介入诊疗技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="cval"
          label="心脏导管消融技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="dval"
          label="起搏器介入诊疗技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="eval"
          label="神经血管介入诊疗技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="fval"
          label="人工膝关节置换技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="gval"
          label="人工髋关节置换技术"
          width="10%"
        ></el-table-column>
        <el-table-column
          prop="hval"
          label="儿科呼吸内镜诊疗技术"
          width="10%"
        ></el-table-column>
      </el-table> -->
    </div>

    <!-- <template v-show="chartname"> -->
    <div v-show="chartname" class="ml-8px text-lg" style="margin: 10px 0">
      {{ chartname }} 分析
    </div>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="备案完成率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />医疗机构已完成备案的省限制类医疗技术项目数（按二级目录）占实际开展省限制类医疗技术项目数（按二级目录）的比例。<br /><b
              >【计算公式】</b
            ><br />备案完成率=医疗机构已完成备案的省限制类医疗技术项目数/实际开展的省限制类医疗技术项目数×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >备案完成率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="charta" style="margin: 10px"></div>
      </el-col>
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="出院患者出院后0-31天非预期再住院率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />实施某项限制类医疗技术（按一级目录）的住院患者出院后31天内非预期再住院患者人数占同期实施同项限制类医疗技术的出院患者人数的比例。<br /><b
              >【计算公式】</b
            ><br />住院患者出院后0-31天非预期再住院率=实施某项限制类医疗技术的住院患者出院后31天内非预期再住院患者人数/同期实施同项限制类医疗技术的出院患者人数×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >出院患者出院后0-31天非预期再住院率
              <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartb" style="margin: 10px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="死亡率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />实施某项限制类医疗技术（按一级目录）的住院患者死亡人数占实施同项限制类医疗技术的患者出院人数的比例。<br /><b
              >【计算公式】</b
            ><br />死亡率=实施某项限制类医疗技术的住院患者死亡人数/同期实施同项限制类医疗技术的患者出院人数×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >死亡率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartc" style="margin: 10px"></div>
      </el-col>
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="并发症发生率"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />实施某项限制类医疗技术的患者发生并发症总人数与同期实施同项限类医疗技术的患者出院总人数的比例。<br /><b
              >【计算公式】</b
            ><br />并发症发生率=实施某项限制类医疗技术的患者发生并发症总人数/同期实施同项限制类医疗技术的患者出院总人数×100%
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >并发症发生率 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="chartd" style="margin: 10px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0">
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="平均住院费用"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />实施某项限制类医疗技术（按一级目录）的出院患者平均住院费用。<br /><b
              >【计算公式】</b
            ><br />平均住院费用=实施某项限制类医疗技术的患者住院总费用/同期实施同项限制类医疗技术的患者出院人数
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >平均住院费用 <i class="el-icon-warning-outline"></i></span
          ></template>
        </el-popover>
        <div id="charte" style="margin: 10px"></div>
      </el-col>
      <el-col :span="12">
        <el-popover
          placement="bottom-start"
          title="平均住院日"
          width="300"
          trigger="hover"
        >
          <div>
            <b>【指标定义】</b
            ><br />实施某项限制类医疗技术（按一级目录）的出院患者平均住院时间。<br /><b
              >【计算公式】</b
            ><br />平均住院日=实施某项限制类医疗技术的出院患者占用总床日数/同期实施同项限制类医疗技术的患者出院人数
          </div>
          <template slot="reference"
            ><span style="cursor: pointer"
              >平均住院日 <i class="el-icon-warning-outline"></i></span
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
      tabledataold: [],
      tablearr: ['备案完成率（%）','出院患者出院后0-31天非预期再住院率（%）','死亡率（%）','并发症发生率（%）','平均住院费用（元）','平均住院日（天）']
    }
  },
  watch: {
    searchModel:{
    handler(){
      // this.$forceUpdate()
      const that = this
      api.province('listReport',func.getyearmonth(this.searchModel)).then(res => {
        if(res.data.data){
          that.tabledataold = res.data.data
          that.tableData = func.tabledataTransform(res.data.data, that.tablearr)
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
      .province('listReport', func.getyearmonth(this.searchModel))
      .then((res) => {
        if (res.data.data) {
          that.tabledataold = res.data.data
          that.tableData = func.tabledataTransform(res.data.data, that.tablearr)
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
            '省级限制类医疗技术',
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
      const arrobj = ['a', 'b', 'c', 'd', 'e', 'f']
      await arrobj.forEach(function (v) {
        const opt = {
          chapterId: e[v + 'chapterId'],
          month: func.getyearmonth(that.searchModel).month,
          targetId: e[v + 'targetId'],
          year: func.getyearmonth(that.searchModel).year,
        }
        api
          .province('listTrend', opt)
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

<style type="text/css" scoped>
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
