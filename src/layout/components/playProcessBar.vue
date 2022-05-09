<template>
  <div class="process-bar">
    <div class="m-playbar">
      <div class="updn">
        <div class="left playbar-bg">

        </div>
        <div class="right playbar-bg">

        </div>
      </div>
      <div class="bg playbar-bg">
        <!-- 播放栏主体 -->
        <div class="wrap">
          <!-- 播放按钮 -->
          <div class="btns">
            <a class="pointer" title="上一首">
              <svg-icon  icon-class="previous" />
            </a>
            <a class="pointer" title="播放/暂停">
              <svg-icon  icon-class="play" />
            </a>
            <a class="pointer" title="下一首">
              <svg-icon  icon-class="next" />
            </a>
          </div>
          <!-- 歌曲头像 -->
          <div class="heade">
            <div class="pr">
              <img src="../../assets/img/default_album.jpg" alt="">
              <a class="mask playbar-bg" @click="skipToMusic"></a>
            </div>
          </div>
          <!-- 歌曲播放进度 -->
          <div class="play">
            <div class="words"></div>
            <div class="m-pbar">

            </div>
          </div>
          <!-- 收藏分享 -->
          <div class="oper"></div>
          <div class="ctrl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
  computed:{
  },
  methods: {
    // 跳转歌曲详情
    skipToMusic() {}
  },
};
</script>

<style lang='scss' scoped>
// /* 从上到下，蓝色渐变到红色 */
// linear-gradient(blue, red);
 
// /* 渐变轴为45度，从蓝色渐变到红色 */
// linear-gradient(45deg, blue, red);
 
// /* 从右下到左上、从蓝色渐变到红色 */
// linear-gradient(to left top, blue, red);
 
// /* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
// linear-gradient(0deg, blue, green 40%, red);
.process-bar {
  position: fixed;
  zoom: 1;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  width: 100%;
  z-index: 1002;
  .m-playbar {
    position: absolute;
    zoom: 1;
    top: -53px;
    left: 0;
    width: 100%;
    height: 53px;
    margin: 0 auto;
    .updn {
      position: relative;
      .left {
        position: absolute;
        top: -14px;
        right: 15px;
        width: 52px;
        height: 67px;
        background-position: 0 -380px;
      }
      .right {
        position: absolute;
        top: -1px;
        right: 0;
        width: 15px;
        height: 54px;
        background-position: -52px -393px;
        pointer-events: none;
      }
    }
    .bg {
      height: 53px;
      zoom: 1;
      margin-right: 67px;
      background-position: 0 0;
      background-repeat: repeat-x;
      .wrap {
        position: absolute;
        top: 6px;
        width: 980px;
        height: 47px;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        .btns {
          line-height: 47px;
          width: 137px;
          a {
            display: inline-block;
            .svg-icon:hover {
              color: red;
            }
          }
          a:hover {
              color: red;
            }
          a:nth-child(odd) {
            font-size: 28px;
            .svg-icon {
              color: #c0c0c0;
              margin-bottom: 3px;
            }
          }
          a:nth-child(even) {
            font-size: 36px;
            margin: 0 8px;
          }
        }
        .heade {
          div {
            margin: 5px 18px 0 0;
            img {
              width: 34px;
              height: 34px;
            }
            a {
              width: 34px;
              height: 34px;
            }
            .mask {
              position: absolute;
              top: 0px;
              left: 0px;
              display: block;
              width: 34px;
              height: 35px;
              background-position: 0 -80px;
            }
          }
          
        }
        .play {
          .words {
            height: 28px;
          }
          .m-pbar {
            width: 493px;
          }
        }
      }
    }
  }
}
</style>
