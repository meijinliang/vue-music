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
    <Swiper :bannerList="bannerList" />

    <!-- discover-module -->
    <div class="discover-module">
      <el-row>
        <el-col :span="18" class="discover-module-left">
          <div class="hot-recmend">
            <div class="hot-header">
              <span>热门推荐</span>

            </div>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <!-- 登录弹框 -->
    <el-dialog title="登录" :visible.sync="dialogVisible" width="30%">
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
  </div>
</template>
<script>
import TopBar from '../../components/TopBar.vue'
import Swiper from '../../components/swiper'
import { loginCellPhone, getBanner } from '@/api/index.js'
export default {
  components: { TopBar, Swiper },
  data () {
    return {
      discoverItem: ['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架'],
      selectSubIndex: 0,
      // 登录弹框 
      dialogVisible: false,
      loginParam: {},
      bannerList: [],

    }
  },
  created () {
    this.getBannerData()
    // console.log(this.bannerbgList);
  },
  methods: {
    handleSelectSub (index) {
      this.selectSubIndex = index
    },
    getBannerData () {
      getBanner().then(res => {
        this.bannerList = res.banners
      })
    },
    login () {
      loginCellPhone(this.loginParam).then(res => {
        console.log(res);
      })
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
  .discover-module-left {
    padding: 20px 20px 40px;
    .hot-recmend {
      .hot-header {
        padding: 0 10px 0 34px;
        span {
          font-size: 20px;
        }
      }
    }
  }
}
.login-model {
  text-decoration: underline;
}
</style>