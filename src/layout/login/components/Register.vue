<template>
  <div>
    <el-form :model="registerParams" class="phone-register-content">
      <el-form-item label="手机号：">
        <el-input v-model="registerParams.phone" placeholder="请输入手机号码">
          <el-select v-model="select" slot="prepend">
            <el-option v-for="(item, index) in preList" :label="item.name" :value="item.name" :key="index"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="registerParams.password" show-password placeholder="设置登录密码，不少于8位"/>
      </el-form-item>
      <el-form-item>
        <el-button class="w-100" type="primary">下一步</el-button>
      </el-form-item>
    </el-form>
    <div class="bottem">
      <span class="pointer" @click="$emit('update:type', 3)"> 返回登录 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      registerParams: {},
      select: '+86',
      preList:[{name: '+86'}],
    }
  },
}
</script>

<style scoped lang="scss">
.phone-register-content {
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
}
</style>