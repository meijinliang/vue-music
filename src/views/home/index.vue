<template>
  <div>
    <!-- <swiper :bannerList="bannerList" /> -->
    <banner :bannerList="bannerList" />
    <!-- discover-module -->
    <div class="discover-module">
      <el-row>
        <el-col :span="18" class="discover-module-left">
          <!-- 热门推荐 -->
          <hot-recommend />
          <!-- 新碟上架 -->
          <NewDisc />
          <!-- 榜单 -->
          <SongList />
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// import Swiper from '../../components/swiper'
import Banner from './comonents/Banner'
import HotRecommend from './comonents/HotRecommend'
import NewDisc from './comonents/NewDisc'
import SongList from './comonents/SongList'
import { getBanner } from '@/api/index.js'
export default {
  components: { Banner, HotRecommend, NewDisc, SongList },
  data () {
    return {
      bannerList: [],
    }
  },
  created () {
    this.getBannerData()
  },
  methods: {
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
.banner {
  .banenr-container {
    width: 982px;
    margin: 0 auto;
  }
}
.discover-module {
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