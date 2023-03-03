/**
 *  Eslint校验规则
 * 'off' 或者 0  --关闭规则
 * 'warn' 或者 1 -- 将规则打开为警告（不影响退出代码）
 * 'error' 或者 2 -- 将规则打开为错误（出发时退出代码）
 *  */
module.exports = {
  root: true,
  env: {
    node: true
  },
  // 默认使用plugin:vue/essential来校验代码也可以使用最严格的 plugin:vue/recommended
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中禁止使用debugger调试器
    // 'no-unused-vars': 'off', // 关闭声明未使用的校验
    'for-direction': 2, // 禁止for无限循环
    'vue/html-self-closing': 'off', // 关闭标签自闭合校验<img /> <img>
    // 'vue/html-self-closing': [
    //   'error',
    //   {
    //     html: {
    //       void: 'never',
    //       normal: 'always',
    //       component: 'always'
    //     },
    //     svg: 'always',
    //     math: 'always'
    //   }
    // ],
    // 设置每行最大属性数
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10, // 标签为单行时，每行最大属性数为4 默认为1
        multiline: {
          max: 1, // 标签为多行时，每行最大属性数为1，默认值1
          allowFirstLine: false // 不允许属性与该标记名称位于同一行，默认值为false
        }
      }
    ],
    'vue/singleline-html-element-content-newline': 'off', // 禁用单行标签内容需换行的校验 打开校验标签内容需要换行
    'vue/multiline-html-element-content-newline': 'off', // 禁用多行标签内容需换行的校验
    'vue/name-property-casing': ['error', 'PascalCase'], // 组件name属性值必须使用帕斯卡命名（单词首字母大写）
    'vue/no-v-html': 'off', // 禁用禁止使用v-html的校验
    'accessor-pairs': 2, // 对象必须使用getter/setter对，即：每个已定义setter属性都需要一个getter属性
    //箭头函数 => 前后必需有空格
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'], // 单行代码块花括号打开块之后和关闭块之前至少有一个空格 {{ mag }}
    // 强制执行标准大括号风格样式（关键字要与花括号保持在同一行）
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true // 允许同一行上打开和关闭括号
      }
    ],
    // 关闭驼峰命名规则校验（变量命名时，名称之间不允许下划线，常量（全部大写）除外）
    camelcase: [
      0,
      {
        properties: 'always' // 属性名称强制执行驼峰命名法样式
      }
    ],
    // 在对象或数组中不允许尾随逗号
    // 数组和对象键值对最后一个逗号，never参数：不能带末尾的逗号， always参数：必须带末尾的逗号
    // always-multiline： 多行模式必须带逗号，单行模式不能带逗号
    // only-mulitiline： 都行
    'comma-dangle': [2, 'never'],
    // 变量声明、数组文字、对象文字、函数参数和序列中的逗号前后加上一致的间距
    'comma-spacing': [
      2,
      {
        before: false, // 在逗号前不允许有逗号
        after: true // 在逗号后需要一个或多个逗号
      }
    ],
    'comma-style': [2, 'last'], // 使用标准逗号样式，逗号位于当前行的末尾，在数组元素，对象属性或变量声明在同一行之后和和同一行需要逗号
    'constructor-super': 2, // 子类构造函数必须使用super（）调用父类构造函数，非子类的构造函数不得调用
    curly: [2, 'multi-line'], // 当一个块只包含一个语句的时候，允许省略花括号
    'dot-location': [2, 'property'], // 表达式中'.'要求与属性位于同一行
    'eol-last': 2, //  强制文件以换行符结束（文件以一空行结束）
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 强制使用=== 和 !== 但不将此规则应用于null
    // 使用两个空格进行缩进
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'], // 回调模式需要处理err 或 error，报告所有未处理的错误
    // 关键字前后必须有一个空格
    indent: [
      2,
      2,
      {
        SwitchCase: 1 // case 针对 switch语句使用 2 个空格缩进
      }
    ],
    'jsx-quotes': [2, 'prefer-single'], // 在jsx属性中强制使用单引号
    // 对象字面量属性中强制冒号后放置空格，冒号前不允许空格
    'key-spacing': [
      2,
      {
        beforeColon: false, // 不允许在对象文字中的键和冒号之间使用空格
        afterColon: true // 需要在冒号和对象文字中的值之间至少有一个空格
      }
    ],
    // 关键字前后必须有一个空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 构造函数名必须以大写字母开头
    'new-cap': [
      2,
      {
        newIsCap: true, // new方式调用的函数需以大写开头
        capIsNew: false // 允许直接调用大写开头的函数，无需使用new
      }
    ],
    'new-parens': 2, // 使用new关键字调用无参构造函数 ，函数名后强制使用括号
    'no-array-constructor': 2, // 禁止使用数组构造函数
    'no-caller': 2, // 禁止使用agruments.caller 和 agruments.callee
    'no-console': 'off', // 关闭console校验规则
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件语句中使用赋值运算符
    'no-const-assign': 2, // 禁止修改const关键字声明的变量
    'no-control-regex': 0, // 关闭正则表达式中的控制字符校验规则
    'no-delete-var': 2, // 不允许对变量使用delete操作符
    'no-dupe-args': 2, // 不允许在函数声明或者表达式中使用重复的参数名称
    'no-dupe-class-members': 2, // 不允许在类的声明中出现重复名称
    'no-dupe-keys': 2, // 不允许在对象中使用重复键
    'no-duplicate-case': 2, // 不允许在switch语句的case子句中使用重复的case分支
    'no-empty-character-class': 2, // 不允许在正则表达式中使用空字符串
    'no-empty-pattern': 2, // 对象和数组解构时，不允许空模式
    'no-eval': 2, // 禁止使用eval函数
    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 2, // 不允许直接修改内置原生对象
    'no-extra-bind': 2, // 避免不必要的函数绑定bind（）
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
    'no-extra-parens': [2, 'functions'], // 在使用函数表达式时，禁止使用不必要的括号
    'no-fallthrough': 2, // 禁止使用switch穿透，需使用break中断
    'no-floating-decimal': 2, // 禁止省略浮点数中的0
    'no-func-assign': 2, // 不允许重新分配function声明
    'no-implied-eval': 2, // 禁止使用隐式eval（），即：始终使用函数作为setTimeOut（）、setInterval（）和execScript的第一个参数
    'no-inner-declarations': [2, 'functions'], // 禁止在块中声明函数
    'no-invalid-regexp': 2, // 不允许regexp构造函数中使用无效的正则表达式字符串
    'no-irregular-whitespace': 2, // 禁止使用无效空格（不是正常的制表符和空格），但允许在字符串中使用任何空字符串
    'no-iterator': 2, // 禁止使用__iterator__属性
    'no-label-var': 2, // label标签名不能与变量名相同
    // 禁止使用标签语句
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2, // 禁止使用不必要的代码块
    'no-mixed-spaces-and-tabs': 2, // 不允许使用混合空格和制表符进行缩进
    'no-multi-spaces': 2, // 禁止在逻辑表达式，条件表达式、声明、数组元素、对象属性、序列和函数参数周围使用多个空格
    'no-multi-str': 2, // 禁止使用斜线(\)
    // 禁止多个连续空行，最大连续空行数为1
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    'no-native-reassign': 2, // 不允许修改只读全局变量
    'no-negated-in-lhs': 2, // 不允许否定 in 表达式中的左操作
    'no-new-object': 2, // 不允许使用Object 构造函数
    'no-new-require': 2, // 不允许使用new require
    'no-new-symbol': 2, // 禁止使用symbol构造器
    'no-new-wrappers': 2, // 禁止使用原始包装器，new String new Number 或 new boolean
    'no-obj-calls': 2, // 禁止将全局对象作为函数调用，即不允许调用Math，json或reflect对象作为函数
    'no-octal': 2, // 不允许使用八进制
    'no-octal-escape': 2, // 不允许字符串中的八进制转义序列
    'no-path-concat': 2, // node中避免使用 __dirname  和 filename全局变量进行路径字符串拼接
    'no-proto': 2, // 使用方法getPerototypeOf代替 __proto__属性
    'no-redeclare': 2, // 不允许同一作用域中使用相同的变量名
    'no-regex-spaces': 2, // 正则表达式文字中不允许多个空格
    'no-return-assign': [2, 'except-parens'], // return 语句中的赋值必须有括号包裹
    'no-self-assign': 2, // 不允许将变量自我赋值
    'no-self-compare': 2, // 禁止变量与自己进行比较操作
    'no-sequences': 2, // 禁止使用逗号分隔符，除非在for语句的初始化或更新部分，表达式序列显示包含在圆括号中
    'no-shadow-restricted-names': 2, // 禁止对全局变量赋值
    'no-spaced-func': 2, // 功能标识符与其应用程序之间不允许有间距
    'no-sparse-arrays': 2, // 禁止使用稀疏数组，不适用于最后一个元素之后的尾随逗号
    'no-this-before-super': 2, // 使用this前 请确保super（）已调用
    'no-throw-literal': 2, // 用throw抛错时，抛出error对象而不是字符串
    'no-trailing-spaces': 2, // 禁止在行尾添加尾随空白（空格，制表符和其他unicode空白字符串）
    'no-undef': 2, // 禁止引用未声明的变量
    'no-undef-init': 2, // 禁止使用undefined初始化变量
    'no-unexpected-multiline': 2, // 禁止混淆多行表达式
    'no-unmodified-loop-condition': 2, // 检查循环条件内的引用是否在循环中被修改
    // 当存在更简单的选择时，此规则不允许三元运算符
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false // 不允许将条件表达式作为默认的分配模式
      }
    ],
    'no-unreachable': 2, // return ,throw,break和continue语句后不允许跟代码
    'no-unsafe-finally': 2, // 不允许return，throw，break和continue语句使用finally块，即：finally代码块中不要再改变程序执行流程但它允许间距
    // 不允许存在声明但未使用的变量，函数和函数的参数
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2, // 禁止使用 .call() .apply()
    'no-useless-computed-key': 2, // 禁止不必要计算属性键作对象属性
    'no-useless-constructor': 2, // 禁止不必要的构造函数
    'no-useless-escape': 0, // 关闭不必要的转义检测规则
    'no-whitespace-before-property': 2, // 对象的属性在同一行上时禁止在属性前使用空格，当对象和属性位于单独的行上时，此规则允许使用空格，因为通常在较长的属性链中添加
    'no-with': 2, // 禁止使用with
    // 一个变量关键字（var const let）只能声明一个变量
    'one-var': [
      2,
      {
        initialized: 'never' // 每个作用要求多个变量声明用于初始化变量
      }
    ],
    // 使用一致的换行符样式，将换行符放置在运算符之间
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before', // 三元运算换行符置于 ？ 前
          ':': 'before' // 三元运算换行符置于 ： 前
        }
      }
    ],
    'padded-blocks': [2, 'never'], // 在block 语句和类的开头和结尾处不允许出现空行
    // 字符串仅可能使用单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true, // 允许字符串使用单引号或者双引号，只要字符串包含被转义的引号即可
        allowTemplateLiterals: true // 允许字符串使用反引号
      }
    ],
    semi: [2, 'never'], // 禁止使用分号结尾
    // 分号后强制使用空格，并在分号前禁止使用空格
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': [2, 'always'], // 代码块前必须有一个空格
    'space-before-function-paren': [2, 'never'], // 函数名称或function关键字与开头括号之前不允许有空格
    'space-in-parens': [2, 'never'], // 禁止在括号内使用空格
    'space-infix-ops': 2, // 中缀运算符周围需有空格
    // 一元运算词后须有空格， 一元运算符后不允许有空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    // 注释 // 和 /* 后必须有一个空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    'template-curly-spacing': [2, 'never'], // 模板字符串${}中不允许有空格
    'use-isnan': 2, // 不允许NaN 值直接比较， 需使用isNaN（）
    'valid-typeof': 2, // typeof比较需使用有效字符串（'undefined', 'object', 'number', 'boolean', 'string', 'function', 'symbol', 'bigint'）
    'wrap-iife': [2, 'any'], // 自调用匿名函数（IIFEs）使用括号包裹
    'yield-star-spacing': [2, 'both'], // yield表达式前后都要有空格
    yoda: [2, 'never'], // 禁止yoda条件（条件的字面值排在第一，而变量排在第二）
    'prefer-const': 2, // 使用const声明初始赋值后永远不重新赋值的变量
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 花括号内需要空格（{}除外）
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false // 以对象元素开始或结束的花括号间不允许有空格
      }
    ],
    'array-bracket-spacing': [2, 'never'] // 数组方括号内不允许使用空格
  }
}
