# 1. 箭头函数与普通函数的区别
箭头函数： 1）this的作用域不同，箭头函数不绑定this，会捕获其所在的上下文的this 作为自己的this（this的指向是 定义时所在的对象，而不是使用时所在的对象）
            var obj = {
              a: 10,
              b: () => {
                console.log(this.a); // undefined
                console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
              },
              c: function() {
                console.log(this.a); // 10
                console.log(this); // {a: 10, b: ƒ, c: ƒ}
              }
            }
            obj.b(); 
            obj.c();
          2）不能够用作构造函数，不能够使用new命令否则会抛出错误 （index.js:12 Uncaught TypeError: a(是一个箭头函数) is not a constructor）
          3）不能够使用arguments对象，取而代之用rest...(扩展运算符)参数解决
          4）箭头函数没有原型属性 xx.prototype是undefined
普通函数： 1）this总是指向它的直接调用者
          2）没有找到直接调用者，默认情况下this指向的是window，严格情况下this指向的是undefined
          3）使用call，bind，apply绑定，this指的是绑定的对象
          4）能够使用arguments对象，有原型属性

# 2.Object.create
new Object() 通过构造函数来创建对象，添加的属性实在自身实例下
Object.create() es6创建对象的另一种方式，可以理解为继承一个对象，添加的属性实在原型下
new Object() 方式创建
  var a = {  rep : 'apple' }
  var b = new Object(a)
  console.log(b) // {rep: "apple"}
  console.log(b.__proto__) // {}
  console.log(b.rep) // {rep: "apple"}

Object.create() 方式创建
  var a = { rep: 'apple' }
  var b = Object.create(a)
  console.log(b)  // {}
  console.log(b.__proto__) // {rep: "apple"}
  console.log(b.rep) // {rep: "apple"}

# 3.浅拷贝与深拷贝
浅拷贝
1.Object.assign（目标对象，源对象）
缺点：1）只能拷贝源对象的自身属性（不拷贝继承属性，也不拷贝不可枚举的属性）；2）如果源对象的某个值也是对象的话，目标对象拷贝得到的是这个对象的引用
2.对象的扩展运算符（。。。）浅拷贝
缺点：得到的对象的属性也是对象的话，这里得到的也是对象的引用
深拷贝
1.JSON.parse(JSON.stringfy(object))该方法忽略掉undefined，symbol，和function
2.手写递归实现 实现思路先判断是不是对象 不是的话直接赋值 是的话for in循环判断属性是否是对象是的话调用原函数赋值，不是的话直接属性赋值

# 4.防抖与节流


# *表示本次面试透题
# 5.盒模型*
margin 清除边框外的区域，外边距是透明的； border（边框）围绕在内边距与外边距的边框； padding（内边距）清除边框内的区域，内边距透明；content（内容）显示文本和图像
box-sizing: content-box|border-box;
content-box：标准盒模型的宽高不包含内边距和边框；     border-box：IE盒模型的宽高包含内边距与边框

# 6.元素居中
块元素 1.margin：auto 2.定位 1）top结合margin-top 2）top结合transform：translate 3.flex布局 justify-content: center; align-items: center;
行内元素和行内块元素： 文本水平居中+行高（text-algin：center;line-height: xx）



## ES6特性
# 1.let、const指令
  1.let 不存在变量提升 2.块级作用域 3.暂时性死区（赋值必须在声明之后，申明变量之前都属于变量的死区在死区内使用变量就会报错）
  2.const 申明一个只读常量，一旦申明就不能改变否则就会报错
  const 定义变量不能改动的其实是变量指向的内存地址  
  例如: const obj = {}
        obj.name = 'zhangsan' //obj不会报错，没有修改内存地址，就可以改变对象的内容

        const obj1 = {} // obj1会报错 应为变量obj1的内存地址发生改变指向了赋值的内存地址
        obj1 = {
          sex: 'nan'
        }
# 2.变量的解构赋值、模板字符串、属性简写、扩展运算符
  字符串的新增方法：includes()：返回布尔值，表示是否找到了参数字符串。
                  startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
                  endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

# 3.运算符的扩展
  1.指数运算符 （**）注意：这个运算符的特点是右结合，从最右边开始计算 例如： 2**3**4 等于 2**（3**4）
  2.链判断运算符 （?.） 用于读取对象内部的某个属性 如果读取过程中没有的话就会返回undefined不会继续往下读取
  3.Null运算符 （??） 它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。 可以避免空字符串、false、0取运算符右边的默认值 
  例：const headerText = response.settings.headerText ?? 'Hello, world!';
  4.逻辑赋值运算符 （||=、&&=、??=）这三个逻辑赋值运算符相当于先进行了逻辑运算，然后根据运算结果，再视情况进行赋值
  例如： user.id = user.id ||(&&、??) 1;
        // 新的写法
        user.id ||=(&&=、??=) 1;

# 7.http 2.0 与http 1.1的区别
  http2.0采用二进制格式而非文本格式
  http2.0完全多路复用的而非有序并阻塞的-只需一个链接就可以实现并行
  使用报头压缩http2.0降低开销（数据压缩）
  http2.0让服务器可以将响应主动“推送”到客户端缓存中（服务器推送）
