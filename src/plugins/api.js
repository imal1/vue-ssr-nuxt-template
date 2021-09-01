import request from './request'

// 病案科
export function bed(x, y) {
  return request({
    url: '/grade/report/bed/' + x,
    method: 'post',
    data: y,
  })
}
// 病案科_手术
export function surgery(x, y) {
  return request({
    url: '/grade/surgery/' + x,
    method: 'post',
    data: y,
  })
}
// 人员管理
export function personnel(x, y) {
  return request({
    url: '/grade/report/person/' + x,
    method: 'post',
    data: y,
  })
}
// 财务管理
export function finance(x, y) {
  return request({
    url: '/grade/report/expenditure/' + x,
    method: 'post',
    data: y,
  })
}
// 科教室
export function science(x, y) {
  return request({
    url: '/grade/report/scientific/' + x,
    method: 'post',
    data: y,
  })
}
// 服务能力与质量安全
// 科教室
export function service(x, y) {
  return request({
    url: '/grade/report/service/' + x,
    method: 'post',
    data: y,
  })
}
// 质量
export function quality(x, y) {
  return request({
    url: '/grade/report/quality/' + x,
    method: 'post',
    data: y,
  })
}
// 安全
export function safe(x, y) {
  return request({
    url: '/grade/report/safe/' + x,
    method: 'post',
    data: y,
  })
}

// 麻醉
export function anesthesia(x, y) {
  return request({
    url: '/grade/anesthesia/' + x,
    method: 'post',
    data: y,
  })
}
// 麻醉
export function severe(x, y) {
  return request({
    url: '/grade/critical/' + x,
    method: 'post',
    data: y,
  })
}
// 急诊
export function emergency(x, y) {
  return request({
    url: '/grade/emergency/' + x,
    method: 'post',
    data: y,
  })
}
// 临床
export function clinic(x, y) {
  return request({
    url: '/grade/clinical/' + x,
    method: 'post',
    data: y,
  })
}
// 病理
export function pathology(x, y) {
  return request({
    url: '/grade/pathology/' + x,
    method: 'post',
    data: y,
  })
}
// 感染管理
export function infection(x, y) {
  return request({
    url: '/grade/hospitalnfection/' + x,
    method: 'post',
    data: y,
  })
}
// 血液管理
export function blood(x, y) {
  return request({
    url: '/grade/blood/' + x,
    method: 'post',
    data: y,
  })
}
// 呼吸内科
export function respiratory(x, y) {
  return request({
    url: '/grade/medicine/' + x,
    method: 'post',
    data: y,
  })
}
// 产科
export function obstetrics(x, y) {
  return request({
    url: '/grade/Obstetrics/' + x,
    method: 'post',
    data: y,
  })
}
// 神经系统
export function nervous(x, y) {
  return request({
    url: '/grade/report/epilepsy/' + x,
    method: 'post',
    data: y,
  })
}
// 肾病
export function nephrology(x, y) {
  return request({
    url: '/grade/report/nephropathy/' + x,
    method: 'post',
    data: y,
  })
}
// 护理
export function nursing(x, y) {
  return request({
    url: '/grade/nursing/' + x,
    method: 'post',
    data: y,
  })
}
// 药师管理
export function pharmacy(x, y) {
  return request({
    url: '/grade/pharmacy/' + x,
    method: 'post',
    data: y,
  })
}
// 单项病
export function drg(x, y) {
  return request({
    url: '/grade/drgs/' + x,
    method: 'post',
    data: y,
  })
}
// 国家级
export function nation(x, y) {
  return request({
    url: '/grade/countryLimit/' + x,
    method: 'post',
    data: y,
  })
}
// 省级
export function province(x, y) {
  return request({
    url: '/grade/provinceLimit/' + x,
    method: 'post',
    data: y,
  })
}
// 器官捐献
export function transplantation(x, y) {
  return request({
    url: '/grade/organ/' + x,
    method: 'post',
    data: y,
  })
}

export default {
  bed,
  surgery,
  personnel,
  finance,
  science,
  service,
  quality,
  safe,
  anesthesia,
  severe,
  emergency,
  clinic,
  pathology,
  infection,
  blood,
  respiratory,
  obstetrics,
  nervous,
  nephrology,
  nursing,
  pharmacy,
  drg,
  nation,
  province,
  transplantation,
}
