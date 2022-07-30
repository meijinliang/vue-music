<template>
  <div class="login-content">
    <el-row :gutter="30">
      <el-col :span="11" class="left">
        <div class="code-phone-guide fr" />
      </el-col>
      <el-col :span="13" class="right">
        <span>扫码登录</span>
        <div class="code-box pr">
          <img :src="qrimg" alt="">
          <div v-if="isOver" class="cover-box h-100 w-100">
            <div class="cover-box-inner">
              <p>二维码已失效</p>
              <span class="code-overdue pointer" @click="getQrCode">点击刷新</span>
            </div>
          </div>
        </div>
        <div>使用<span class="link-span">网易云音乐APP</span>扫码登录</div>
      </el-col>
    </el-row>
    <div class="bottom">
      <button class="btn pointer" @click="$emit('update:type', 2)">选择其他登录方式</button>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { loginQrKey, loginQrCreate, loginQrCheck } from '@/api/login'
import { setToken } from '@/utils/auth'
export default {
  data() {
    return {
      qrimg: '',
      // 二维码是否过期
      isOver: false,
      // 定时器
      timer: null
    }
  },
  created() {
    this.getQrCode()
  },
  beforeDestroy() {
    // 销毁组件之前先清除定时器
    clearInterval(this.timer)
  },
  methods: {
    getQrCode() {
      this.isOver = false
      clearInterval(this.timer)
      loginQrKey().then(res1 => {
        loginQrCreate({ key: res1.data.unikey, qrimg: true }).then(res2 => {
          this.qrimg = res2.data.qrimg
          this.checkQrStatu(res1.data.unikey)
        })
      })
    },
    // 定时器轮询检测二维码扫码状态
    checkQrStatu(key) {
      this.timer = setInterval(() => {
        loginQrCheck({ key }).then(res => {
          if (res.code === 800) {
            this.isOver = true
          } else if (res.code === 803) {
            setToken(res.cookie)
            console.log(this.$store)
            this.$store.commit('SET_TOKEN', res.cookie)
            clearInterval(this.timer)
            console.log(this.$store)
            this.$store.dispatch('loginByQrcode')
          }
        })
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
.login-content {
  padding: 20px;
  .code-phone-guide {
    width: 125px;
    height: 220px;
    background: url("../../../assets/img/phone-guide.png");
    background-size: contain;
  }
  .right {
    > span {
      display: block;
      font-size: 20px;
      width: 150px;
      text-align: center;
    }
    .code-box {
      width: 150px;
      img {
        width: 150px;
        height: 150px;
        margin: 10px 0;
      }
      .cover-box {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.8);
        .cover-box-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          p {
            text-align: center;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .code-overdue {
            background: green;
            padding: 5px 10px;
            border-radius: 5px;
            color: #fff;
          }
        }
      }
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
