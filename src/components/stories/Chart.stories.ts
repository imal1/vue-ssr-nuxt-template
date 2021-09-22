export default {
  title: '单一组件/图表',
  decorators: [() => ({ template: '<el-collapse :value="[1,2,3]"><story/></el-collapse>' })]
}

const ChartObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <Chart type="line" :data="data" />
  `
})

export const Chart = ChartObj.bind({})

Chart.storyName = '基础图表'

const args = {
  data: [
    {
      "name": "China",
      "xvalue": "2000",
      "yvalue": 1211346869605.24
    },
    {
      "name": "China",
      "xvalue": "2001",
      "yvalue": 1339395718865.3
    },
    {
      "name": "China",
      "xvalue": "2002",
      "yvalue": 1470550015081.55
    },
    {
      "name": "China",
      "xvalue": "2003",
      "yvalue": 1660287965662.68
    },
    {
      "name": "China",
      "xvalue": "2004",
      "yvalue": 1955347004963.27
    },
    {
      "name": "China",
      "xvalue": "2005",
      "yvalue": 2285965892360.54
    },
    {
      "name": "China",
      "xvalue": "2006",
      "yvalue": 2752131773355.16
    },
    {
      "name": "China",
      "xvalue": "2007",
      "yvalue": 3550342425238.25
    },
    {
      "name": "China",
      "xvalue": "2008",
      "yvalue": 4594306848763.08
    },
    {
      "name": "China",
      "xvalue": "2009",
      "yvalue": 5101702432883.45
    },
    {
      "name": "China",
      "xvalue": "2010",
      "yvalue": 6087164527421.24
    },
    {
      "name": "China",
      "xvalue": "2011",
      "yvalue": 7551500425597.77
    },
    {
      "name": "China",
      "xvalue": "2012",
      "yvalue": 8532230724141.76
    },
    {
      "name": "China",
      "xvalue": "2013",
      "yvalue": 9570405758739.79
    },
    {
      "name": "China",
      "xvalue": "2014",
      "yvalue": 10438529153237.6
    },
    {
      "name": "China",
      "xvalue": "2015",
      "yvalue": 11015542352468.9
    },
    {
      "name": "China",
      "xvalue": "2016",
      "yvalue": 11137945669350.6
    },
    {
      "name": "China",
      "xvalue": "2017",
      "yvalue": 12143491448186.1
    },
    {
      "name": "China",
      "xvalue": "2018",
      "yvalue": 13608151864637.9
    },
    {
      "name": "United States",
      "xvalue": "2000",
      "yvalue": 10252345464000
    },
    {
      "name": "United States",
      "xvalue": "2001",
      "yvalue": 10581821399000
    },
    {
      "name": "United States",
      "xvalue": "2002",
      "yvalue": 10936419054000
    },
    {
      "name": "United States",
      "xvalue": "2003",
      "yvalue": 11458243878000
    },
    {
      "name": "United States",
      "xvalue": "2004",
      "yvalue": 12213729147000
    },
    {
      "name": "United States",
      "xvalue": "2005",
      "yvalue": 13036640229000
    },
    {
      "name": "United States",
      "xvalue": "2006",
      "yvalue": 13814611414000
    },
    {
      "name": "United States",
      "xvalue": "2007",
      "yvalue": 14451858650000
    },
    {
      "name": "United States",
      "xvalue": "2008",
      "yvalue": 14712844084000
    },
    {
      "name": "United States",
      "xvalue": "2009",
      "yvalue": 14448933025000
    },
    {
      "name": "United States",
      "xvalue": "2010",
      "yvalue": 14992052727000
    },
    {
      "name": "United States",
      "xvalue": "2011",
      "yvalue": 15542581104000
    },
    {
      "name": "United States",
      "xvalue": "2012",
      "yvalue": 16197007349000
    },
    {
      "name": "United States",
      "xvalue": "2013",
      "yvalue": 16784849190000
    },
    {
      "name": "United States",
      "xvalue": "2014",
      "yvalue": 17521746534000
    },
    {
      "name": "United States",
      "xvalue": "2015",
      "yvalue": 18219297584000
    },
    {
      "name": "United States",
      "xvalue": "2016",
      "yvalue": 18707188235000
    },
    {
      "name": "United States",
      "xvalue": "2017",
      "yvalue": 19485393853000
    },
    {
      "name": "United States",
      "xvalue": "2018",
      "yvalue": 20544343456936.5
    },
    {
      "name": "United Kingdom",
      "xvalue": "2000",
      "yvalue": 1657816613708.58
    },
    {
      "name": "United Kingdom",
      "xvalue": "2001",
      "yvalue": 1640246149417.01
    },
    {
      "name": "United Kingdom",
      "xvalue": "2002",
      "yvalue": 1784473920863.31
    },
    {
      "name": "United Kingdom",
      "xvalue": "2003",
      "yvalue": 2053018775510.2
    },
    {
      "name": "United Kingdom",
      "xvalue": "2004",
      "yvalue": 2416931526913.22
    },
    {
      "name": "United Kingdom",
      "xvalue": "2005",
      "yvalue": 2538680000000
    },
    {
      "name": "United Kingdom",
      "xvalue": "2006",
      "yvalue": 2713749770009.2
    },
    {
      "name": "United Kingdom",
      "xvalue": "2007",
      "yvalue": 3100882352941.18
    },
    {
      "name": "United Kingdom",
      "xvalue": "2008",
      "yvalue": 2922667279411.76
    },
    {
      "name": "United Kingdom",
      "xvalue": "2009",
      "yvalue": 2410909799034.12
    },
    {
      "name": "United Kingdom",
      "xvalue": "2010",
      "yvalue": 2475244321361.11
    },
    {
      "name": "United Kingdom",
      "xvalue": "2011",
      "yvalue": 2659310054646.23
    },
    {
      "name": "United Kingdom",
      "xvalue": "2012",
      "yvalue": 2704887678386.72
    },
    {
      "name": "United Kingdom",
      "xvalue": "2013",
      "yvalue": 2786022872706.81
    },
    {
      "name": "United Kingdom",
      "xvalue": "2014",
      "yvalue": 3063803240208.01
    },
    {
      "name": "United Kingdom",
      "xvalue": "2015",
      "yvalue": 2928591002002.51
    },
    {
      "name": "United Kingdom",
      "xvalue": "2016",
      "yvalue": 2694283209613.29
    },
    {
      "name": "United Kingdom",
      "xvalue": "2017",
      "yvalue": 2666229179958.01
    },
    {
      "name": "United Kingdom",
      "xvalue": "2018",
      "yvalue": 2855296731521.96
    },
    {
      "name": "Russian",
      "xvalue": "2000",
      "yvalue": 259710142196.94
    },
    {
      "name": "Russian",
      "xvalue": "2001",
      "yvalue": 306602070620.5
    },
    {
      "name": "Russian",
      "xvalue": "2002",
      "yvalue": 345470494417.86
    },
    {
      "name": "Russian",
      "xvalue": "2003",
      "yvalue": 430347770731.79
    },
    {
      "name": "Russian",
      "xvalue": "2004",
      "yvalue": 591016690742.8
    },
    {
      "name": "Russian",
      "xvalue": "2005",
      "yvalue": 764017107992.39
    },
    {
      "name": "Russian",
      "xvalue": "2006",
      "yvalue": 989930542278.7
    },
    {
      "name": "Russian",
      "xvalue": "2007",
      "yvalue": 1299705764823.62
    },
    {
      "name": "Russian",
      "xvalue": "2008",
      "yvalue": 1660846387624.78
    },
    {
      "name": "Russian",
      "xvalue": "2009",
      "yvalue": 1222644282201.86
    },
    {
      "name": "Russian",
      "xvalue": "2010",
      "yvalue": 1524917468442.01
    },
    {
      "name": "Russian",
      "xvalue": "2011",
      "yvalue": 2051661732059.78
    },
    {
      "name": "Russian",
      "xvalue": "2012",
      "yvalue": 2210256976945.38
    },
    {
      "name": "Russian",
      "xvalue": "2013",
      "yvalue": 2297128039058.21
    },
    {
      "name": "Russian",
      "xvalue": "2014",
      "yvalue": 2059984158438.46
    },
    {
      "name": "Russian",
      "xvalue": "2015",
      "yvalue": 1363594369577.82
    },
    {
      "name": "Russian",
      "xvalue": "2016",
      "yvalue": 1282723881134.01
    },
    {
      "name": "Russian",
      "xvalue": "2017",
      "yvalue": 1578624060588.26
    },
    {
      "name": "Russian",
      "xvalue": "2018",
      "yvalue": 1657554647149.87
    },
    {
      "name": "Japan",
      "xvalue": "2000",
      "yvalue": 4887519660744.86
    },
    {
      "name": "Japan",
      "xvalue": "2001",
      "yvalue": 4303544259842.72
    },
    {
      "name": "Japan",
      "xvalue": "2002",
      "yvalue": 4115116279069.77
    },
    {
      "name": "Japan",
      "xvalue": "2003",
      "yvalue": 4445658071221.86
    },
    {
      "name": "Japan",
      "xvalue": "2004",
      "yvalue": 4815148854362.11
    },
    {
      "name": "Japan",
      "xvalue": "2005",
      "yvalue": 4755410630912.14
    },
    {
      "name": "Japan",
      "xvalue": "2006",
      "yvalue": 4530377224970.4
    },
    {
      "name": "Japan",
      "xvalue": "2007",
      "yvalue": 4515264514430.57
    },
    {
      "name": "Japan",
      "xvalue": "2008",
      "yvalue": 5037908465114.48
    },
    {
      "name": "Japan",
      "xvalue": "2009",
      "yvalue": 5231382674593.7
    },
    {
      "name": "Japan",
      "xvalue": "2010",
      "yvalue": 5700098114744.41
    },
    {
      "name": "Japan",
      "xvalue": "2011",
      "yvalue": 6157459594823.72
    },
    {
      "name": "Japan",
      "xvalue": "2012",
      "yvalue": 6203213121334.12
    },
    {
      "name": "Japan",
      "xvalue": "2013",
      "yvalue": 5155717056270.83
    },
    {
      "name": "Japan",
      "xvalue": "2014",
      "yvalue": 4850413536037.84
    },
    {
      "name": "Japan",
      "xvalue": "2015",
      "yvalue": 4389475622588.97
    },
    {
      "name": "Japan",
      "xvalue": "2016",
      "yvalue": 4926667087367.51
    },
    {
      "name": "Japan",
      "xvalue": "2017",
      "yvalue": 4859950558538.97
    },
    {
      "name": "Japan",
      "xvalue": "2018",
      "yvalue": 4971323079771.87
    }
  ]
}

Chart.args = args

Chart.decorators = [() => ({ template: '<el-collapse-item title="基础图表" :name="1"><story/></el-collapse-item>' })]
