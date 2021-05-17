<template>
  <div>
    <!-- 顶部导航栏 -->
    <top-bar />
    <!-- 发现音乐导航栏 -->
    <div class="top-subnav">
      <div class="wrap">
        <ul class="nav">
          <li class="fl pointer" v-for="(item,index) in discoverItem" :key="index" @click="handleSelectSub(index)">
            <span class="sub-item" :class="selectSubIndex === index ? 'active' : ''">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <div class="banenr-container">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from '../../components/TopBar.vue'
export default {
  components: { TopBar },
  data () {
    return {
      discoverItem: ['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架'],
      selectSubIndex: 0
    }
  },
  component: {
    TopBar
  },
  methods: {
    handleSelectSub (index) {
      this.selectSubIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.top-subnav {
  background: #c20c0c;
  height: 35px;
  box-sizing: border-box;
  border-bottom: 1px solid #a40011;
  .wrap {
    width: 1100px;
    height: 34px;
    margin: 0 auto;
    .nav {
      padding-left: 180px;
      li {
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        padding: 0 15px;
      }
      .sub-item {
        padding: 5px 15px;
        // background: #9b0909;
        border-radius: 12px;
      }
      .active {
        background: #9b0909;
      }
      .sub-item:hover {
        @extend .active;
      }
    }
  }
}
</style>