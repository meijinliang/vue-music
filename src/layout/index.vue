<template>
  <div class="app-wrapper">
    <!-- 顶部导航栏 -->
    <el-header class="header-wrapper" height="100%">
      <top-bar @login="dialogVisible = true" />
    </el-header>
    <!-- 内容部分 -->
    <el-main class="container">
      <router-view :key="key" />
    </el-main>
    <!-- 登录弹框 -->
    <login :visible.sync="dialogVisible" />

    <!-- 播放器 进度条 -->
    <play-process-bar />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Login from './login/index.vue'
import PlayProcessBar from './components/playProcessBar.vue'
export default {
  name: '',
  components: { TopBar, Login, PlayProcessBar },
  data() {
    return {
      // 登录弹框
      dialogVisible: false
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.app-wrapper {
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .header-wrapper {
    padding: 0;
  }
  .container {
    padding: 0;
    height: 100%;
  }
}
</style>
