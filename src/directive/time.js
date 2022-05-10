/**
 * 格式化歌曲的时长，总毫秒数转化为分秒
 * 自定义指令 的钩子函数 1.bind 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次行的初始化设置
 *                     2.unbind 只调用一次，指令与元素解绑时调用
 *                     3.inserted 被绑定的元素插入父节点时使用（仅保证父节点存在，但不一定已被插入文档中）
 * 钩子函数中的参数
 *  1.el 指令所绑定的元素，可以用来直接操作dom
 *  2.binding 一个对象
 * {
 *    name： 指令名 不包含v-前缀
 *    value：指令绑定的值
 *    oldValue： 指令绑定的前一个值，仅在update和componentUpdate中可用，无论值是否改变都可以使用
 *    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
 *    arg：传给指令的参数，可选。例如v-my-directive：foo中，foo就是参数
 *    modifiers：一个包含修饰符的对象。例如v-my-directive.foo.bar中，修饰符对象为 { foo：true，bar：true}
 * }
 *
*/

export default {
  inserted(el, binding) {
    const value = Number(el.innerText)
    let m, s
    m = Math.floor(value / 1000 / 60) < 10 ? '0' + Math.floor(value / 1000 / 60) : Math.floor(value / 1000 / 60)
    s = value % 60 < 10 ? '0' + value % 60 : value % 60
    el.innerText = `${m} : ${s}`
  }
}
