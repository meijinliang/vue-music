<template>
  <div class="login-content">
    <el-row :gutter="30">
      <el-col :span="11" class="left">
        <div class="code-phone-guide fr"></div>
      </el-col>
      <el-col :span="13" class="right">
        <span>扫码登录</span>
        <img :src="qrimg" alt="">
        <div>使用<span class="link-span">网易云音乐APP</span>扫码登录</div>
      </el-col>
    </el-row>
    <div class="bottom">
      <button class="btn pointer" @click="$emit('update:type', 2)">选择其他登录方式</button>
    </div>
  </div>
</template>

<script>
import { loginQrKey, loginQrCreate } from '@/api/login'
export default {
  data () {
    return {
      qrimg: '',
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
  }
}
</script>

<style scoped lang="scss">
.login-content {
  padding: 20px;
  .code-phone-guide {
    width: 125px;
    height: 220px;
    background: url("../../../../../assets/img/phone-guide.png");
    background-size: contain;
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
    
  }
  .bottom {
    text-align: center;
    margin-top: 20px;
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