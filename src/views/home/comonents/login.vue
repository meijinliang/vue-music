<template>
  <el-dialog title="登录" :visible.sync="show" width="30%">
      <el-form :model="loginParam">
        <el-form-item>
          <el-input v-model="loginParam.pbone" placeholder="请输入手机号码" prefix-icon="el-icon-phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginParam.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <el-checkbox v-model="loginParam.checked">记住我</el-checkbox>
            </el-col>
            <el-col :span="6" align="right">
              <span class="login-model pointer">忘记密码？</span>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>
</template>
><script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loginParam: {},
      dialogVisible: false
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible',val)
      }
    }
  },
  methods: {
    login() {
      
    }
  }
}
</script>