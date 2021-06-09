<template>
  <div class="app-wrapper">
    <!-- 顶部导航栏 -->
    <el-header class="header-wrapper" height="70px">
      <top-bar @login="dialogVisible = true" />
    </el-header>
    <!-- 内容部分 -->
    <el-main class="container">
      <router-view :key="key" />
    </el-main>
    <!-- 登录弹框 -->
    <login :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Login from './login/index.vue'
export default {
  components: { TopBar, Login },
  name: '',
  data () {
    return {
      // 登录弹框
      dialogVisible:false
    }
  },
  mounted() {
    console.log(this.key);
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
$headerHeight: 70px;  
.app-wrapper {
  // @include clearfix;
  // position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .header-wrapper {
    height: $headerHeight;
    padding: 0;
  }
  .container {
    padding: 0;
    height: 100%;
  }
}
</style>