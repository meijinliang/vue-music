<template>
  <div ref="login" class="login" :style="{width:width}" v-show="show">
    <div class="login-header" @mousedown="move">
      <span>{{ loginTitle }}</span>
      <i class="el-icon-close pointer" @click="handleClose"></i>
    </div>
    <div class="login-content h-100">
      <component :is="currentComponent" :type.sync="type"></component>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '550px'
    },
  },
  data () {
    return {
      type: 1, //用于区分登录类型
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (val) {
        console.log(val);
        this.$emit('update:visible', val)
      }
    },
    currentComponent() {
      switch (this.type) {
        case 1 :
          return () => import('./components/QrcodeLogin')
        case 2 :
          return () => import('./components/ChooseLogin')
        case 3 :
          return () => import('./components/PhoneLogin')
        case 4 : 
          return () => import('./components/Register')
        default :
          return () => import('./components/QrcodeLogin')
      }
    },
    loginTitle() {
      switch(this.type) {
        case 3 :
          return '手机号登录'
        case 4: 
          return '手机号注册'
        default :
          return '登录'
      }
    }
  },
  methods: {
    handleClose () {
      this.show = false
      this.type = 1
    },
    move() {
      console.log(this.$el);
      // let loginBox = document.querySelector('#login')
      // console.log(e,loginBox);
      // 获取鼠标的位置
      // let disX = e.clientX - loginBox.offsetLeft;
      // let disY = e.clientY - loginBox.offsetTop;
      // console.log(document);
      // document.onmousemove = e => {
      //   //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      //   let left = e.clientX - disX;
      //   let top = e.clientY - disY;
      //   //移动当前元素
      //   loginBox.style.left = left + "px";
      //   loginBox.style.top = top + "px";
      // };
      // document.onmouseup = () => {
      //   //鼠标弹起来的时候不再移动
      //   document.onmousemove = null;
      //   //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
      //   document.onmouseup = null;
      // };

    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .login-header {
    cursor: move;
    position: relative;
    background: #000;
    padding: 8px 0 8px 15px;
    span {
      color: #fff;
      font-size: 18px;
    }
    i {
      position: absolute;
      right: 13px;
      top: 12px;
      color: #ccc;
      font-size: 14px;
    }
  }
  .login-content {
    background: #fff;
  }
}
</style>