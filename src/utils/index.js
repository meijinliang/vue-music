/**四舍五入
 * @param {Number} number
 *   */
export function toFixed(number,m) {
  if (typeof number !== 'number') {
    throw new Error(`${number}不是数字`)
  }
  let result = Math.round(number * Math.pow(10, m) / Math.pow(10, m))
  result = String(result)
  if (result.indexOf('.') === -1) {
    if (m != 0) {
      result += '.'
      // join 方法将数组内容拼接成字符串 拼接在内容之间
      result += new Array(m + 1).join('0')
    }
  }else {
    let arr = result.split('.')
    // 小数点后面的数小于需要保留的小数点位数才会执行if判断
    if (arr[1].length < m) {
      arr[1] += new Array(m - arr[1].length + 1 ).join('0')
    }
    result = arr.join('.')
  }
  return result
}

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 手写深拷贝
export function deepClone(obj) {
  let cloneObj
  // 判断当前传入的数据是不是简单数据类型 是的话直接赋值就可以
  if ( obj && typeof obj !== 'object') {
    cloneObj = obj
  }
  // 当输入的数据是数组或对象的时候 
  else if (obj && typeof obj === 'object') {
    cloneObj = Array.isArray(obj) ? [] : {}
    // 遍历数据对象
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, 'key')) {
        if (obj[key] && typeof obj[key] === 'object') {
          // 若当前元素类型是对象时，递归调用
          cloneObj[key] = deepClone(obj[key])
        } else {
           // 若当前元素类型为基本数据类型 
          cloneObj[key] = obj[key]
        }
      }
    }
  }
  return cloneObj
}

/**
 * 下载二进制流文件
 * @param {arraybuffer} data
 * @param {String} fileName
 */

export function extendDownload(data, fileName) {
  const url = window.URL.createObjectURL(new Blob([data], { type: 'application/xls;charset=UTF-8' }))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link)
}

/**
 * 歌曲的总毫秒数转换成分秒
 * @param val 总毫秒数
 * */ 
export function formatTime (val) {
  let m, s
  m = Math.floor(val / 1000 / 60) < 10 ? '0' + Math.floor(val / 1000 / 60) : Math.floor(val / 1000 / 60)
  s = val % 60 < 10 ? '0' + val % 60 : val % 60
  return m + ':' + s
}

// 字符传换行\n
export function lineFeed(str) {
  console.log(str);
  return str.replace(/\\n/g, '<br>')
}
