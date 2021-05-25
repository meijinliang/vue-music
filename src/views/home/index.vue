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
    <!-- <swiper>
      <div slot="content">
        <img class="pointer" :src="item.imageUrl">
      </div>
    </swiper> -->
    <Swiper :bannerList="bannerList" />
    <!-- discover-module -->
    <div class="discover-module">
      <el-row>
        <el-col :span="18" class="discover-module-left">
          <!-- 热门推荐 -->
          <HotRecommend />
          <!-- 新碟上架 -->
          <NewDisc />
          <!-- 榜单 -->
          <SongList />
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <!-- 登录弹框 -->
    <Login :visible.sync="dialogVisible" @click="dialogVisible = true" />
  </div>
</template>
<script>
import TopBar from '../../components/TopBar.vue'
import Swiper from '../../components/swiper'
import HotRecommend from './comonents/HotRecommend'
import NewDisc from './comonents/NewDisc'
import SongList from './comonents/SongList'
import Login from './comonents/login/index.vue'
// import Login from './comonents/login'
import { loginCellPhone, getBanner } from '@/api/index.js'
export default {
  components: { TopBar, Swiper, HotRecommend, NewDisc, SongList, Login },
  data () {
    return {
      discoverItem: ['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架'],
      selectSubIndex: 0,
      bannerList: [],
      dialogVisible: false
    }
  },
  created () {
    this.getBannerData()
  },
  methods: {
    handleSelectSub (index) {
      this.selectSubIndex = index
    },
    // 获取banner
    getBannerData () {
      getBanner().then(res => {
        this.bannerList = res.banners
      })
    },
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
.banner {
  .banenr-container {
    width: 982px;
    margin: 0 auto;
  }
}
.discover-module {
  // @extend .banenr-container;
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  .discover-module-left {
    padding: 20px 20px 40px;
  }
}
.login-model {
  text-decoration: underline;
}
</style>