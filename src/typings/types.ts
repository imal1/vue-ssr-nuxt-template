export const DataReportMenu = [
  {
    id: 1,
    index: "resource",
    name: "资源配置与运行",
    route: '/data_report/resource',
    children: [
      {
        id: 11,
        index: "record",
        name: "病案科",
        route: '/data_report/resource/record',
      },
      {
        id: 12,
        index: "personnel",
        name: "人事科",
        route: '/data_report/resource/personnel',
      },
      {
        id: 13,
        index: "finance",
        name: "财务科",
        route: '/data_report/resource/finance',
      },
      {
        id: 14,
        index: "science&education",
        name: "科教科",
        route: '/data_report/resource/science&education',
      },
    ]
  },
  {
    id: 2,
    index: "service&quality",
    name: "服务能力与质量安全",
    route: '/data_report/service&quality',
    children: [
      {
        id: 21,
        index: "service",
        name: "医疗服务能力",
        route: '/data_report/service&quality/service',
      },
      {
        id: 22,
        index: "quality",
        name: "医疗质量指标",
        route: '/data_report/service&quality/quality',
      },
      {
        id: 23,
        index: "security",
        name: "医疗安全指标",
        route: '/data_report/service&quality/security',
      },
    ]
  },
  {
    id: 3,
    index: "profession",
    name: "重点专业质量控制",
    route: '/data_report/profession',
    children: [
      {
        id: 31,
        index: "anesthesia",
        name: "麻醉专业",
        route: '/data_report/profession/anesthesia',
      },
      {
        id: 32,
        index: "severe",
        name: "重症医学专业",
        route: '/data_report/profession/severe',
      },
      {
        id: 33,
        index: "emergency",
        name: "急诊专业",
        route: '/data_report/profession/emergency',
      },
      {
        id: 34,
        index: "clinic",
        name: "临床检验专业",
        route: '/data_report/profession/clinic',
      },
      {
        id: 35,
        index: "pathology",
        name: "病理专业",
        route: '/data_report/profession/pathology',
      },
      {
        id: 36,
        index: "infection",
        name: "医院感染管理",
        route: '/data_report/profession/infection',
      },
      {
        id: 37,
        index: "blood",
        name: "临床用血管理",
        route: '/data_report/profession/blood',
      },
      {
        id: 38,
        index: "respiratory",
        name: "呼吸内科专业",
        route: '/data_report/profession/respiratory',
      },
      {
        id: 39,
        index: "obstetrics",
        name: "产科专业",
        route: '/data_report/profession/obstetrics',
      },
      {
        id: 310,
        index: "nervous",
        name: "神经系统疾病",
        route: '/data_report/profession/nervous',
      },
      {
        id: 311,
        index: "nephrology",
        name: "肾病专业",
        route: '/data_report/profession/nephrology',
      },
      {
        id: 312,
        index: "nursing",
        name: "护理专业",
        route: '/data_report/profession/nursing',
      },
      {
        id: 313,
        index: "pharmacy",
        name: "药事管理专业",
        route: '/data_report/profession/pharmacy',
      },
    ]
  },
  {
    id: 4,
    index: "drg",
    name: "单病种质量控制",
    route: '/data_report/drg'
  },
  {
    id: 5,
    index: "clinic",
    name: "重点医疗技术临床应用",
    route: '/data_report/clinic',
    children: [
      {
        id: 51,
        index: "nation",
        name: "国家限制类医疗技术",
        route: '/data_report/clinic/nation',
      },
      {
        id: 52,
        index: "province",
        name: "省级限制类医疗技术",
        route: '/data_report/clinic/province',
      },
      {
        id: 53,
        index: "transplantation",
        name: "人体器官捐献、获取与移植技术",
        route: '/data_report/clinic/transplantation',
      },
    ]
  },
]

export enum DateType {
  year = '年',
  quarter = '季',
  month = '月',
  day = '日'
}
