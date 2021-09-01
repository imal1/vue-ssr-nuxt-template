/* eslint-disable no-eval */
/* eslint-disable eqeqeq */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

// 切换年月的转换
export function getyearmonth(p) {
  const x = new Date(p.date)
  // const mm = x.getMonth() + 1
  if (p.type == 'year') {
    return { year: x.getFullYear(), month: 0 }
  } else {
    return { year: x.getFullYear(), month: x.getMonth() + 1 }
  }
}

// 打印表格
export function printTable(name, obj) {
  /* 从表生成工作簿对象 */
  const wb = XLSX.utils.table_to_book(obj)
  /* 获取二进制字符串作为输出 */
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array',
  })
  try {
    FileSaver.saveAs(
      // Blob 对象表示一个不可变、原始数据的类文件对象。
      // Blob 表示的不一定是JavaScript原生格式的数据。
      // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      new Blob([wbout], { type: 'application/octet-stream' }),
      // 设置导出文件名称
      name + '.xlsx'
    )
  } catch (e) {
    // if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}

// 处理表单纵向合并单元格的方式
export function spanTable(data, obj) {
  // const result = []
  obj.forEach(function (objname, n) {
    const keys = 'span' + n
    const groupArr = []
    let peopobj = 'Null'
    data.forEach(function (v, i) {
      v[keys] = 0
      if (i == 0) {
        peopobj = v[objname]
      } else if (v[objname] == peopobj && i != data.length - 1) {
        // count++
      } else if (i != data.length - 1) {
        peopobj = v[objname]
        groupArr.push(i)
      }
    })
    if (groupArr.length < 1) {
      data[0][keys] = data.length
    } else {
      groupArr.forEach(function (v, i) {
        if (i == 0) {
          data[0][keys] = v
        }
        if (i != groupArr.length - 1) {
          data[v][keys] = eval(groupArr[i + 1]) - eval(v)
        } else {
          data[v][keys] = data.length - eval(v)
        }
      })
    }
  })
  return data
}

// 表格数据横向纵向转换
export function tabledataTransform(data, arr) {
  const result = []
  const numarr = ['a','b','c','d','e','f','g','h','i','j']
  arr.forEach(function (v, i) {
    const nowobj = {'name': v}
    data.forEach(function (item, index) {
      nowobj['val' + index] = item[numarr[i] + 'val']
    })
    result.push(nowobj)
  })
  return result
}

export default {
  getyearmonth,
  printTable,
  spanTable,
  tabledataTransform
}
