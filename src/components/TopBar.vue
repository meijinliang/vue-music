<template>
  <div>
    <div class="header">
      <div class="header-container">
        <h1 class="logo m-top">
          <a href="/">网易云音乐</a>
        </h1>
        <ul class="fl">
          <li class="fl pr top-item pointer" :class="slectItemIndex == index ? 'active' : ''" v-for="(item, index) in topItems" :key="index" @click="handleChange(index)">
            <span>{{item}}</span>
            <sub v-show="slectItemIndex == index" class="col"></sub>
            <i v-if="index == topItems.length-1" class="hot m-top"></i>
          </li>
        </ul>
      </div>
      <div class="fl top-login">
        <el-input class="top-input mr16" v-model="serachValue" placeholder="音乐/视频/电台/用户" p prefix-icon="el-icon-search" />
        <!-- <el-button>创作者中心</el-button> -->
        <button class="top-btn pointer">创作者中心</button>
        <el-button type="text" style="margin-left:16px;" @click="handleClickLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      topItems: ['发现音乐', '我的音乐', '朋友', '商城', '音乐人', '下载客户端'],
      slectItemIndex: 0,
      serachValue:''
    }
  },
  methods: {
    handleChange (index) {
      this.slectItemIndex = index
    },
    handleClickLogin() {
      this.$parent.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 70px;
  // line-height: 70px;
  box-sizing: border-box;
  background: #242424;
  border-bottom: 1px solid #000;
  .header-container {
    width: 1100px;
    margin: 0 auto;
    .logo {
      float: left;
      width: 176px;
      height: 69px;
      background-position: 0 0;

      a {
        float: left;
        width: 157px;
        height: 100%;
        padding-right: 20px;
        text-indent: -9999px;
      }
    }
    .top-item {
      line-height: 70px;
      text-align: center;
      padding: 0 19px;
      font-size: 14px;
      color: #ccc;
      .hot {
        display: block;
        position: absolute;
        top: 21px;
        left: 88px;
        width: 28px;
        height: 19px;
        background-position: -190px 0;
      }
      .col {
        display: block;
        position: absolute;
        left: 50%;
        top: 56px;
        width: 0;
        height: 0;
        margin-left: -5px;
        border-left: 5px solid transparent;
        border-top: 7px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 7px solid #c20c0c;
      }
    }
    .top-item:hover {
      @extend .active;
    }
  }
  .top-login {
    position: relative;
    top: 18px;
    right: -60px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    .top-input {
      width: 180px;
      ::v-deep .el-input__inner {
        border-radius: 16px;
      }
    }
    .top-btn {
      border: 1px solid #4f4f4f;
      color: #ccc;
      border-radius: 20px;
      background: none;
      padding: 0 20px;
    }
    .top-btn:hover {
      color: #fff;
      border-color: #fff;
    }
  }
  .active {
    background: #000;
    color: #fff;
  }
}
</style>