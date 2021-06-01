<template>
  <div >
    <el-form :model="loginParams" :rules="rules" ref="loginRef" label-width="80px" class="phone-login-content">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="loginParams.phone" prefix-icon="el-icon-phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginParams.password" prefix-icon="el-icon-lock" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button class="w-100" type="primary" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
    <div class="bottem">
      <span class="pointer" @click="$emit('update:type', 2)">返回选择登录方式</span>
    </div>
  </div>
</template>

<script>
import { loginCellPhone } from '@/api/login'
export default {
  name: '',
  data () {
    var validatePhone = (rule, value, callback) => {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else {
        if (!reg.test(value)) {
          callback(new Error('请正确输入手机号码'));
        }
        callback();
      }
    }
    return {
      loginParams: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [{
          required: true, validator: validatePhone, trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          loginCellPhone(this.loginParams).then(res => {
            console.log(res);
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.phone-login-content {
  padding: 20px 30px 10px;
}
.bottem {
  padding: 10px 30px;
    border-top: 1px solid #ccc;
  }
</style>