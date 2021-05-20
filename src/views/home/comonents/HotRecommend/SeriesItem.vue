<template>
  <div>
    <el-row class="card-item">
      <el-col v-for="item in recommendedSongList" :key="item.id">
        <el-card>
          <div class="img-container pr">
            <img :src="item.picUrl" :alt="item.name">
            <a href="javascript:void(0)" :title="item.name"></a>
            <div class="bottom">
              <span class="headset"></span>
              <span class="nb">{{ item.playCount }}万</span>
              <span></span>
            </div>
          </div>
          <span>{{item.name}}</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    recommendedSongList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created () {
    console.log(this.recommendedSongList);
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .el-col {
    width: 174px;
    .el-card {
      border: none;
      .img-container {
        width: 140px;
        height: 140px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 27px;
          background: rgba(0, 0, 0, 0.3);
          .headset {
            float: left;
            width: 14px;
            height: 11px;
          }
        }
      }
      &span {
        font-size: 14px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>