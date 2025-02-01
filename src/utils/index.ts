// 工具函数

export const formatMoney = (num: string | number) => {
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// export const formatNum = (num: string | number) => {
//   const a = num.toString()
//   if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
//   return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
// }

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
  if (rule === 'HH') return curDate.toTimeString()
  return curDate.toLocaleString()
}

export const formatDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())

  type Otype = {
    [key: string]: number
  }
  const o: Otype = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in o) {
    const val = o[k].toString()
    // fmt = fmt.replace(new RegExp(`(${k})`), o[k].toString())
    fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
  }
  return fmt
}
