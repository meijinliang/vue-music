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