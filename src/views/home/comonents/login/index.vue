<template>
  <div :class="className" :style="{width:width}" v-show="show">
    <div class="login-header">
      <span>登录</span>
      <i class="el-icon-close pointer" @click="handleClose"></i>
    </div>
    <div class="login-content">
      <div v-show="flag" class="login-content-1">
        <el-row :gutter="30">
          <el-col :span="11" class="left">
            <div class="code-phone-guide fr"></div>
          </el-col>
          <el-col :span="13" class="right">
            <span>扫码登录</span>
            <img :src="qrimg" alt="">
            <div>使用<span class="tip">网易云音乐APP</span>扫码登录</div>
          </el-col>
        </el-row>
      </div>
      <div v-show="!flag" class="login-content-2">
        <el-row>
          <el-col :span="13" class="left">
            <img src="" alt="">
            <el-row>
              <el-button type="primary" style="width:100%">手机号码登陆</el-button>
            </el-row>
            <el-row>
              <el-button style="width:100%">注 册</el-button>
            </el-row>
          </el-col>
          <el-col :span="11" class="right"></el-col>
        </el-row>
      </div>
    </div>
    <div class="login-footer">
      <div v-show="flag" class="login-footer-1">
        <button class="btn pointer" @click="changeLoginMehtod">选择其他登录方式</button>
      </div>
      <div v-show="!flag">

      </div>
    </div>
  </div>
</template>
<script>
import { loginQrKey, loginQrCreate, loginQrCheck } from '@/api/login'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'login'
    },
    width: {
      type: String,
      default: '500px'
    },
  },
  data () {
    return {
      loginParam: {},
      dialogVisible: false,
      flag: true,
      qrimg: ''
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  created () {
    this.getQrCode()
  },
  methods: {
    getQrCode () {
      loginQrKey().then(res1 => {
        loginQrCreate({ key: res1.data.unikey, qrimg: true }).then(res2 => {
          this.qrimg = res2.data.qrimg
        })
      })
    },
    handleClose () {
      this.show = false
      this.flag = true
      loginQrCreate, loginQrCheck

    },
    changeLoginMehtod () {
      this.flag = !this.flag
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9998;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
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
  .login-content-1 {
    padding: 20px;
    .left {
      .code-phone-guide {
        width: 125px;
        height: 220px;
        background: url("../../../../assets/img/phone-guide.png");
        background-size: contain;
      }
    }
    .right {
      > span {
        display: block;
        font-size: 20px;
        width: 150px;
        text-align: center;
      }
      img {
        width: 150px;
        height: 150px;
        margin: 10px 0;
      }
      .tip {
        color: #105cdd;
      }
    }
  }
  .login-content-2 {
    .left {
      padding: 0 30px;
      margin: 20px 0;
      text-align: center;
      img {
        width: 100%;
        height: 100px;
      }
    }
  }
}
.login-footer {
  background: #fff;
  padding: 0 20px 20px;
  .login-footer-1 {
    text-align: center;
    .btn {
      border: 1px solid #ccc;
      border-radius: 15px;
      background: #fff;
      padding: 5px 10px;
      outline: none;
    }
  }
}
</style>