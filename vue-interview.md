# vue面试题 
# 1.MVVM 和 MVC的区别？它和其它框加有什么区别（如jQuery）？适合哪些场景
  MVC：M(Model模型)、V(View视图)、C(Controller控制器) MVC的思想简单的说就是controller负责将Model的数据用View显示出来
  MVVM：vm(实例)做了两件事达到双向数据绑定，一是将【模型】转化成【视图】即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。
  二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。
  MVVM与MVC最大的区别：它实现了view 和 model的自动同步，也就是数据改变时不需要再手动操作dom元素
  vue侧重数据绑定，jquery侧重样式操作，动画效果等

# 2.v-model的实现原理
  v-model其实就是一个语法糖主要有两个步骤 1.绑定数据v-bind:value(:value) 2.触发事件input($event在vue里指的就是触发的事件)

# 3.在使用计算属性的时候，函数名和data中的数据可以同名吗
  严格模式下不可以，这些属性最后都会挂载到vm上 会有命名冲突 不在严格模式下可以但是会覆盖
  这些属性都是在initState函数里面初始化，执行的顺序为props、methods、data、computed、watch

# 4.为什么data是一个函数
  组件的data写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的data，类似与给每个组件实例创建一个私有的数据空间
  让各个组件实力维护各自的数据

# 5.和keep-alive有关的生命周期是哪些？
  1.) activated : 页面第一次进入的时候，钩子触发的顺序是created -> mounted -> activated
  2.) deactivated : 页面推出的时候会触发deactivated，当再次前进或者后退的时候只触发activated

# 6.怎样理解Vue的单向数据流（父组件与子组件）
  数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改，这样会防止从子组件以意外改变父级组件的状态
  如果需要改变父组件的prop值可以在data里定义一个变量并用prop的值初始化它之后用$emit通知父组件去修改

# 7.v-if和v-for为什么不能一起使用
  因为v-for的优先级比v-if更高，在解析的时候先解析v-for再解析v-if。如果遇到需要同时使用的时候可以考虑写成计算属性的方式
# 8.Vue中key的作用和原理
  作用：是为了在diff算法执行时更快的找到对应的节点，提高diff速度，高效的更新虚拟dom
  原理：vue在patch中的patchVnode下的updateChildren会处理新老子节点可以通过key精准判断两个节点是否是同一个，如果没有加key就会强应的更新，
  从而会有频繁的更新过程，性能会很差，加了key还会可以使整个patch 过程更加高效，减少dom 操作，提高性能

# 9.Vue双向数据绑定的原理(未完成)
  双向数据绑定通过数据劫持 结合 发布订阅者模式实现
  1.数据劫持3.0版本采用proxy 3.0之前采用object.defineProperty 将普通对象转换为响应式对象
  2.发布订阅模式
    1）Dep类：负责依赖收集，首先，需要一个数组专门用来存放所有的订阅信息；其次，还要提供一个向数组中追加订阅信息的方法；然后，还要提供一个循环，循环触发数组中的每个订阅信息

# 10.proxy与defeneProperty的区别
Object.defineProperty缺点：
  1.无法监控数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。vue内部通过一些方法来监听。
  2.只能劫持对象的属性，因此要对每个对象的属性进行遍历。vue2.x版本之后是通过递归和遍历实现对data对象的数据监控
proxy：
  1.可以劫持整个对象，并返回一个新的对象。
  2.有多种劫持操作

# 11.组件中name选项得作用？
  1.项目中使用keep-alive可以使用name进行过滤
  2.DOM做递归组件时需要调用自身name
  3.vue-devtools调试工具里显示得组件名称是由组件name决定得

# 12. $route 和 $router的区别
  $route是当前激活路由的对象包含当前路由的信息 $router是全局的路由对象（具有实现路由跳转的方法）

# 13 路由导航守卫
  1.全局守卫
  2.路由守卫
  3.组件守卫

# 14 vue渐进式理解
  声明式渲染->组件化应用->客户端路由->集中式状态管理->项目构建

# 15 定义vue使用的是构造函数而不是class
  这是因为我们往后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给Vue 
  的 prototype 上扩展一些方法，Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 
  难以实现的。

# 16 当style标签有scoped属性时，它的css只作用于当前组件中的元素



6. element的input输入框带图标  可以通过prefix-icon和suffix-icon属性在input组件首部和尾部增加显示图标，也可以通过slot来放置图标
<el-input>
   <i slot="prefix" class="el-icon-user"></i>
</el-input>
7.element表单校验动态校验 :prop="'thresholdList.'+ index +'.threshold'"   :rules="rules.threshold"
数据结构：{
    thresholdList: [{
	 ...，threshold, ...
	}{
	...，threshold, ...}]
}
8.表单验证在el-form上加验证与el-form-item上加验证的区别

vue源码解析 自我认识
1.createElemnet方法实际上是对-createElement方法的封装 真正创建虚拟dom vnode的函数是 _createElemnt函数
2.Vue.extend 的作用就是构造一个 Vue 的子类，它使用一种非常经典的原型继承的方式把一个纯对象转换一个继承于 Vue 的构造器 Sub
 并返回，然后对 Sub 这个对象本身扩展了一些属性，如扩展 options、添加全局 API 等；并且对配置中的 props 和 computed 
做了初始化工作；最后对于这个 Sub 构造函数做了缓存，避免多次执行 Vue.extend 的时候对同一个子组件重复构造。

3.beforeCreate 和 rreated 的钩子调用是在initState的作用初始化 props、data、methods、watch、computed等属性 所以在beforeCreate
的钩子函数中不能获取到props、打他、中定义的值，也不能调用methods中的函数
4.在执行vm._render()函数渲染vnode之前，执行了beforeMount钩子函数，在执行玩vm._update()把Vnode patch到真是DOM后执行mouted
钩子函数zhi'xing

# 17. Vue创建的整个过程（2.6.17版本）
## 17.1 初始化Vue(new Vue之前)
1. 在new Vue之前会给Vue的原型上加上实例方法，initMixin(_init)、stateMixin($set、$delete、$watch、$data、$prop)、eventsMixin($on、 $once、$off 、$emit)、lifecycleMixin(_update、$forceUpdate、$destory)、renderMixin($nextTick、_render)
2. 在导出Vue之前会对Vue添加全局方法在initGrobalApi的文件中（vue构造函数上的方法都是在该文件中执行）

## 17.2 new Vue
1. 