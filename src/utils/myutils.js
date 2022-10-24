/**
 * 构造函数、原型、原型链
 *
 *  */
function myConstraction() {
  function Person(name, age) {
    this.name = name
    this.age = age
    this.say = function() {
      console.log('hello Father')
    }
  }
  Person.prototype.sing = function(song) {
    console.log('我喜欢唱' + song)
  }
  const far = new Person('ly', '25')
  far.say()
  far.sing('好汉歌')
  // 构造函数实例化一个对象
  // const obj = {}
  // eslint-disable-next-line no-proto
  // console.log(far, far.__proto__, Person.prototype, far.__proto__ === Person.prototype)
  // eslint-disable-next-line no-proto
  // console.log(far.__proto__.__proto__, Person.prototype.__proto__)
}

// 防抖
function debounce(func, wait, immediate) {
  // debugger
  // 定义定时器，入参，上下文，时间戳，抛出内容
  let timeout, args, context, timestamp, result

  const later = function() {
    // 距上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate === true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) { // 这个是用来接收函数的入参
    // debugger
    context = this // 定时器的this指向的是window，需要在定时器中改变this的指向需要在定时器外用临时变量存储当前this
    timestamp = +new Date()
    // 立即执行
    const callNow = immediate && !timeout
    // 如果延时不存在s，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait) // 定时器的返回值是个数字值的id，可以由clearInterval(id)或clearTimeout(id)来实现对对应定时器的清除。
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

// 防抖版本1（简单版）
function debounce1(func, wait) {
  let timeout, context
  return function(...args) {
    context = this
    timeout && clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait)
  }
  // return () => {
  //   console.log(this) // 不能使用箭头函数，箭头函数捕获的是当前this和return外一层的this是同一个
  // }
}
// 防抖版本2（进阶版）
function debounce2(func, wait, immediate) {
  let timeout, context
  return function(...args) {
    context = this
    console.log(timeout)
    clearTimeout(timeout)
    if (immediate) { // 节流阀
      let callNow = !timeout

      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      // 立即执行
      if (callNow) func.apply(context, args)
    } else {
      // 不会立即执行
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

// 防抖（优化最终版）
function debounce3(func, wait, immediate) {
  let timeout, context, result
  return function(...args) {
    context = this
    if (timeout) clearTimeout(timeout)
    if (immediate) { // 节流阀
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      // 立即执行
      if (callNow) result = func.apply(context, args)
    } else {
      // 不会立即执行
      timeout = setTimeout(function() {
        result = func.apply(context, args)
      }, wait)
    }
    return result
  }
}

// 节流 (使用时间戳) 触发立刻执行 (顾头不顾尾)
function throttle(func, wait) {
  let context
  let old = 0
  return function(...args) {
    context = this
    // 获取当前时间戳
    let now = +new Date()
    if (now - old > wait) {
      // 立即执行
      func.apply(context, args)
      old = now
    }
  }
}

// 节流（使用定时器），触发会在结束的时候触发
function throttle1(func, wait) {
  let context, timeout
  return function(...args) {
    context = this
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args)
        timeout = null
      }, wait)
    }
  }
}

function throttle2(func, wait) {
  let context, timeout, args
  let old = 0

  const later = function() {
    func.apply(context, args)
    old = +new Date()
    timeout = null
  }
  return function(...args) {
    context = this

    let now = +new Date()
    if (now - old > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(context, args)
      old = now
    } else if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }
}

// 手写instanceof
function myInstanceof() {
  function _instanceof(left, right) {
    // 原理右边构造函数的原型是否出现在左边实例的__proto__上，右边的构造函数
    // debugger
    console.log(left, right.prototype)
    let prototype = right.prototype // 获取构造函数的原型
    let __proto__ = left.__proto__
    while (true) {
      if (__proto__ === null) {
        return false
      }
      if (__proto__ === prototype) {
        return true
      }
      __proto__ = __proto__.__proto__
    }
  }
  console.log(_instanceof({}, Object))
  // console.log(_instanceof(1, Number))
  // console.log(_instanceof('1', String))
}

function factorial() {
  function _factorial(arr, item) {
    while (arr.indexOf(item) !== -1) {
      arr.splice(arr.indexOf(item), 1)
    }
    return arr
  }
  console.log(_factorial([2, 3, 1, 3, 2], 2))
}

// 手写apply方法
function myApply() {
  function say(age, sex) {
    console.log('大家好我是' + this.name, age, sex)
  }
  const obj = {
    name: 'gvsd'
  }
  // say.apply(obj, [])
  // 改变this指向的可以看作是
  // const obj = {
  //   name: 'gvsd',
  //   say() {
  //     console.log('大家好' + this.name)
  //   }
  // }
  // obj.say()
  // eslint-disable-next-line no-extend-native
  Function.prototype._apply = function(context, args) {
    // 改变this指向的方法简单的说就是把要调用的函数加到调用对象中临时使用
    context = context || window
    args = args || []
    const key = Symbol() // 创建一个唯一属性以免覆盖原有属性
    context[key] = this
    const result = context[key](...args)
    delete context[key]
    return result
  }
  say._apply(obj, ['20', 'nan'])
}

export default {
  myConstraction, debounce, debounce1, debounce2, debounce3, throttle, throttle1, throttle2, myInstanceof, factorial, myApply
}
