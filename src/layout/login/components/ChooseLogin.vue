<template>
  <div class="login-content h-100">
    <el-row>
      <el-col :span="14" class="left">
        <div class="platform" />
        <el-row>
          <el-button size="medium" type="primary" class="btn w-100 mt20" @click="$emit('update:type', 3)">手机号登陆</el-button>
        </el-row>
        <el-row>
          <el-button size="medium" class="btn w-100 mt16" @click="$emit('update:type', 4)">注 册</el-button>
        </el-row>
      </el-col>
      <el-col :span="10" class="right">
        <ul class="right-box">
          <li v-for="(item,index) in loginMethods" :key="index" class="pl24">
            <i class="icon" />
            <span class="title ml24 pointer">{{ item }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div class="bottom">
      <el-checkbox v-model="checked">
        同意
        <span class="link-span">《服务条款》 </span>
        <span class="link-span">《隐私政策》 </span>
        <span class="link-span">《儿童隐私政策》</span>
      </el-checkbox>
      <div class="to-qrcode pointer" @click="changeLoginMehtod" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      loginMethods: ['微信登录', 'QQ登录', '微博登录', '网易邮箱账号登录'],
      checked: true
    }
  },
  methods: {
    changeLoginMehtod() {
      if (this.checked) {
        this.$emit('update:type', 1)
      } else {
        this.$message.info('请同意协议')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-content {
  .left {
    padding: 0 30px;
    margin: 20px 0;
    text-align: center;
    border-right: 1px solid #ccc;
    .platform {
      width: 225px;
      height: 120px;
      margin: 0 auto;
      background: url("../../../assets/img/platform.png");
      background-size: contain;
    }
  }
  .right {
    .right-box {
      height: 220px;
      padding: 0 30px;
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // li {
      //   flex: 1;
      // }
      .icon {
        width: 20px;
        height: 20px;
      }
      .title {
        font-size: 16px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .bottom {
    padding: 10px 30px 20px;
    position: relative;
    .to-qrcode {
      position: absolute;
      bottom: 0;
      right: 0;
      background: url("../../../assets/img/qr_login_icon.png");
      background-size: contain;
      width: 52px;
      height: 52px;
    }
  }
}
</style>
