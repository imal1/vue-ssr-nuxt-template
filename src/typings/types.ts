export const DataReportMenu = [
  {
    id: 1,
    index: "resource",
    name: "资源配置与运行",
    route: 'resource',
    children: [
      {
        id: 11,
        index: "record",
        name: "病案科",
        route: 'resource-record',
      },
      {
        id: 12,
        index: "personnel",
        name: "人事科",
        route: 'resource-personnel',
      },
      {
        id: 13,
        index: "finance",
        name: "财务科",
        route: 'resource-finance',
      },
      {
        id: 14,
        index: "science",
        name: "科教科",
        route: 'resource-science',
      },
    ]
  },
  {
    id: 2,
    index: "quality",
    name: "服务能力与质量安全",
    route: 'quality',
    children: [
      {
        id: 21,
        index: "service",
        name: "医疗服务能力",
        route: 'quality-service',
      },
      {
        id: 22,
        index: "quality",
        name: "医疗质量指标",
        route: 'quality-quality',
      },
      {
        id: 23,
        index: "security",
        name: "医疗安全指标",
        route: 'quality-security',
      },
    ]
  },
  {
    id: 3,
    index: "profession",
    name: "重点专业质量控制",
    route: 'profession',
    children: [
      {
        id: 31,
        index: "anesthesia",
        name: "麻醉专业",
        route: 'profession-anesthesia',
      },
      {
        id: 32,
        index: "severe",
        name: "重症医学专业",
        route: 'profession-severe',
      },
      {
        id: 33,
        index: "emergency",
        name: "急诊专业",
        route: 'profession-emergency',
      },
      {
        id: 34,
        index: "clinic",
        name: "临床检验专业",
        route: 'profession-clinic',
      },
      {
        id: 35,
        index: "pathology",
        name: "病理专业",
        route: 'profession-pathology',
      },
      {
        id: 36,
        index: "infection",
        name: "医院感染管理",
        route: 'profession-infection',
      },
      {
        id: 37,
        index: "blood",
        name: "临床用血管理",
        route: 'profession-blood',
      },
      {
        id: 38,
        index: "respiratory",
        name: "呼吸内科专业",
        route: 'profession-respiratory',
      },
      {
        id: 39,
        index: "obstetrics",
        name: "产科专业",
        route: 'profession-obstetrics',
      },
      {
        id: 310,
        index: "nervous",
        name: "神经系统疾病",
        route: 'profession-nervous',
      },
      {
        id: 311,
        index: "nephrology",
        name: "肾病专业",
        route: 'profession-nephrology',
      },
      {
        id: 312,
        index: "nursing",
        name: "护理专业",
        route: 'profession-nursing',
      },
      {
        id: 313,
        index: "pharmacy",
        name: "药事管理专业",
        route: 'profession-pharmacy',
      },
    ]
  },
  {
    id: 4,
    index: "drg",
    name: "单病种质量控制",
    route: 'drg'
  },
  {
    id: 5,
    index: "clinic",
    name: "重点医疗技术临床应用",
    route: 'clinic',
    children: [
      {
        id: 51,
        index: "nation",
        name: "国家限制类医疗技术",
        route: 'clinic-nation',
      },
      {
        id: 52,
        index: "province",
        name: "省级限制类医疗技术",
        route: 'clinic-province',
      },
      {
        id: 53,
        index: "transplantation",
        name: "人体器官捐献、获取与移植技术",
        route: 'clinic-transplantation',
      },
    ]
  },
]
