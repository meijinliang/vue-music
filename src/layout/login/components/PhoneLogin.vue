<template>
  <div >
    <el-form :model="loginParams" :rules="rules" ref="loginRef" class="phone-login-content">
      <el-form-item prop="phone">
        <el-input v-model="loginParams.phone" placeholder="请输入手机号码">
          <el-select v-model="select" slot="prepend">
            <el-option v-for="(item, index) in preList" :label="item.name" :value="item.name" :key="index"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginParams.password" show-password placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item>
        <el-button class="w-100" type="primary" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
    <div class="bottem">
      <span class="pointer" @click="$emit('update:type', 2)"> 返回选择登录方式 </span>
      <span class="pointer" @click="$emit('update:type', 4)">没有账号？免费注册</span>
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
      select: '+86',
      preList:[{name: '+86'}],
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
  padding: 20px 20% 10px;
}
::v-deep .el-select .el-input {
    width: 70px;
  }
::v-deep .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.bottem {
  padding: 10px 30px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
</style>