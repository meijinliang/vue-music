
# ES6特性
# 1.let、const指令
  1.let 不存在变量提升 2.块级作用域 3.暂时性死区（赋值必须在声明之后，申明变量之前都属于变量的死区在死区内使用变量就会报错）
  2.const 申明一个只读常量，一旦申明就不能改变否则就会报错
  const 定义变量不能改动的其实是变量指向的内存地址  
  例如:

        const obj = {}
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
# 1.盒模型*
margin 清除边框外的区域，外边距是透明的； border（边框）围绕在内边距与外边距的边框； padding（内边距）清除边框内的区域，内边距透明；content（内容）显示文本和图像
box-sizing: content-box|border-box;
content-box：标准盒模型的宽高不包含内边距和边框；     border-box：IE盒模型的宽高包含内边距与边框

# 2.元素居中
块元素 1.margin：auto 2.定位 1）top结合margin-top 2）top结合transform：translate 3.flex布局 justify-content: center; align-items: center;
行内元素和行内块元素： 文本水平居中+行高（text-algin：center;line-height: xx）
# 3. 箭头函数与普通函数的区别
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

# 4.Object.create
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

# 5.浅拷贝与深拷贝
浅拷贝
1.Object.assign（目标对象，源对象）
缺点：1）只能拷贝源对象的自身属性（不拷贝继承属性，也不拷贝不可枚举的属性）；2）如果源对象的某个值也是对象的话，目标对象拷贝得到的是这个对象的引用
2.对象的扩展运算符（。。。）浅拷贝
缺点：得到的对象的属性也是对象的话，这里得到的也是对象的引用
深拷贝
1.JSON.parse(JSON.stringfy(object))该方法忽略掉undefined，symbol，和function
2.手写递归实现 实现思路先判断是不是对象 不是的话直接赋值 是的话for in循环判断属性是否是对象是的话调用原函数赋值，不是的话直接属性赋值

# 6.防抖与节流
实例：input输入框绑定输入事件 每次输入都会触发事件
防抖：输入框输入在n秒内没有继续输入就触发事件，在n秒内有输入那么n秒重新计时 （n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效）

    function debounce(fn,delay){
      let timer = null;
      var delay = delay || 2000;
      return function(e){
        let that = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
          fn.apply(that,arguments)
        },delay)
      }
    }

** 有个问题就是fn执行的时候要改变this的指向(为了使this指向函数的调用者)
节流：n秒内只执行一次，稀释函数的执行频率

    function throttle(fn,delay){
      let flag= true;		//开关标记
      var delay = delay || 2000;
      return function(){
        if(!flag) return
        flag = false;
        let that = this;
        setTimeout(()=>{
          fn.apply(that,arguments);
          flag = true;
        },delay)
      }
    }





# 7.http 2.0 与http 1.1的区别
  http2.0采用二进制格式而非文本格式
  http2.0完全多路复用的而非有序并阻塞的-只需一个链接就可以实现并行
  使用报头压缩http2.0降低开销（数据压缩）
  http2.0让服务器可以将响应主动“推送”到客户端缓存中（服务器推送）

# 8. 原型/构造函数/实例
  构造函数 的 prototype -->实例原型   实例原型的 constructor --> 构造函数 
  构造函数实例化出来的实例的 __proto__ --> 实例原型（构造函数.prototype）
  原型链： 当我们访问对象的属性或者方法时，它会先在对象自身查找，如果有则直接调用，如果没有则会去原型对象中去查找，如果找到直接使用，没有接着
  到原型的原型中寻找 直到找到Object对象，如果还是没有直接返回undefined

# 9.Promise链式调用及优点
  优点特性：1.promise解决回调地狱的问题 2.状态一旦改变，就不会再变（pending、fulfilled、rejected）

  promise可以链式调用的原因是Promise定义在原型链上的方法than catch返回的是个promise
  - Promise.all ：所有的状态都变成fufilled 包装的状态才会变成fufilled 如果有一个状态变成rejected 包装的状态就会变成rejected
  - Promise.allSetted 参数数组所有promise对象的状态发生改变，包装promise
  - Promise.race 第一个状态发生改变 包装的状态就跟着改变
  - Promise.any  只要有一个的状态改变成fufilled 包装的状态就会改变成fufilled
  - Promise.resolve 处理成promise对象 状态fufilled
  - Promise.reject 处理成promise对象 状态rejected

        function red() {
          console.log('red');
        }
        function green() {
          console.log('green');
        }
        function yellow() {
          console.log('yellow');
        }

        var light = function (timmer, cb) {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              cb();
              resolve();
            }, timmer);
          });
        };

        var step = function () {
          Promise.resolve().then(function () {
            return light(3000, red);
          }).then(function () {
            return light(2000, green);
          }).then(function () {
            return light(1000, yellow);
          }).then(function () {
            step();
          });
        }

        step();

--------
# 10.在浏览器输入 URL 回车之后发生了什么
## 10.1 DNS解析（获取真实IP）
  DNS的作用就是通过域名查询到及具体的IP （两种查询方式：1.递归查询，2.迭代查询）
  在TCP握手之前就已经进行了 DNS查询，这个查询是操作系统自己做的
  NDS解析的步骤：
  1. 操作系统首先会在本地缓存中查询 
  2. 如果没有的话会去系统配置的DNS服务器中查询
  3. 如果还没有的话，会直接去DNS根服务器查询，这一步查询会找出负责.com这个一级域名的服务器
  4. 然后去该服务器查询google这个二级域名


## 10.2 TCP三次握手（建立连接）
  1. 第一次握手：客户端向服务器端发起链接请求 传送SYN=1包，自身的序列号，服务器响应返回SYN和ACK包 客户端连接建立，客户端收到返回一包ACK 服务端连接建立
  2. 第二次握手：服务器段收到SYN包，发送ACK包（确认客户端的SYN包）并发送自己的SYN包
  3. 第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认ACK包，此包发送完毕，客户端和服务器进入链接成功状态，完成三次握手

  **为什么要有三次握手**
  防止服务端开启无用的链接。因为网络传输是有延时的，可以规避网络延时导致服务器额外的开销

## 10.3 发送http请求
  完整的HTTP请求包含请求起始行、请求头部、请求主体三部分。
## 10.4 渲染页面

## 10.5 四次挥手
  1. 第一次挥手：客户端向服务器发送FIN包，表示要关闭连接自己进入终止等待状态1
  2. 第二次挥手：服务器收到FIN包，发送一份ACK包到客户端，表示自己进入关闭等待状态，客户端进入终止等待状态2 （服务器还能继续发送未发送完的数据，客户端还可以继续接收数据）
  3. 第三次挥手：服务器发送完数据之后给客户端发送一份FIN包，服务器进入最后确认状态
  4. 第四次挥手：客户端收到FIN包后给服务器发送一份ACK包，客户端进入超时等待，超时等待结束，关闭连接。

### 10.5.1 为什么建立连接的时候只需要三次关闭连接的时候却要四次？
  当服务端收到客户端的SYN连接请求报文后，可以直接发送一个SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，服务端收到FIN报文，很可能不会立即关闭SOCKET，所以只能先回复一个ACK报文，告诉客户端：‘你发的FIN报文我已经收到了’，只有等数据发送完了才能发送FIN报文给客户端 因此不能一起发送 需要四次。
  
### 10.5.2 为什么关闭连接的时候客户端收到FIN报文发送ACK 需要进入超时等待状态？
  防止最后一个ACK包丢失，服务端未收到ACK包会重新发送FIN包给客户端，如果没有超时等待直接关闭的话这时客户端就收不到服务端发送的FIN包，服务端就会一直处在等待关闭状态

# 11.伪类和伪元素的区别
  - 伪类： 用于选择Dom树上元素不同的状态  (:hover 选择被鼠标悬浮着元素, :link 选择未被访问的元素, :active 选择正在被激活的元素 等等 )
  -  伪元素： DOM树上看不到的元素 (::before, ::after, ::first-letter 将特殊的样式添加到文本的首字母， ::first-line 将特殊的样式添加到文本的首行)
  css3规定 伪类用单冒号， 伪元素使用双冒号 

# 12.cookie sessionStorage localStorage 区别
  **相同点：** 都是浏览器存储
  **不同：** 
  **1.存储位置不同：** cookie由服务器写入，sessionStorage以及localStorage都是由前端写入
  **2. 生命周期：**cookie的生命周期由服务器在写入的时候就设置的，LocalStorage写入就一直存在，是长期有效的，除非手动清除，sessionStorage是页面关闭（浏览器关闭）的时候就会自动清除。
  **3.存储大小：** Cookie的存储大小约为4kb，sessionStorage及localStorage存储空间大小约5M
  **4.发送请求时是否携带：** 在前端给后端发送请求的时候自动携带Cookie中的数据，但是sessionStorage、localStorage不会
  **5.作用域不同：** Cookie和localStorage在所偶有同源窗口中都是共享的 sessionStorage限制必须在同一个页面

# 13.Cookie和session的区别
  **1.存储位置不同：** Cookie数据存放在客户的浏览器上，session数据放在服务器上
  **2.存储容量不同：** 单个Cookie保存的数据不能超过4k，很多浏览器都限制一个站点最多保存20个cookie，而session存储在服务端，浏览器对其没有限制。
  **3.存储方式不同：** Cookie中通常保存的是字符串；session中能存储任何类型的数据
  **4.有效时间不同：** Cookie可以设置保存时间，会在有效期内一直保存；session是会话级别，会话结束，session也相应被清除
  **5.隐私策略不同：** Cookie保存在客户端，有可能被人篡改或者窃取，它存在一定的安全隐患（一般情况下，浏览器会对Cookie进行一些限制，提高cookie的安全性）；session是保存在服务器端的所以安全性更高一些。
