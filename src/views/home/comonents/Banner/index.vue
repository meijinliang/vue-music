<template>
  <div class="n-banner" :style="{ backgroundImage: 'url(' + bgImg2 + ')' }" @mouseover="moveIntoBanner" @mouseout="moveOutBanner">
    <div class="wrap">
      <div class="ban pr">
        <div class="ban-img">
          <img :src="bgImg1" alt="">
        </div>
        <a href="javascript:void(0)" class="btn-prve"></a>
        <a href="javascript:void(0)" class="btn-next"></a>
        <div class="dtos">
          <ul>
            <li v-for="(item, index) in bannerList" :key="index" class="dtos-item" :class="currentIndex === index ? 'active-item' : ''" @click="handleClick(index)"></li>
          </ul>
        </div>
      </div>
      <div class="download">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    bannerList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  computed: {
    bgImg1 () {
      const currentImg = this.bannerList[this.currentIndex]?.imageUrl
      return currentImg
    },
    bgImg2 () {
      const currentImg = this.bannerList[this.currentIndex]?.imageUrl + '?imageView&blur=40x20'
      return currentImg
    }
  },
  watch: {
    bannerList: {
      handler (val) {
        if (val.length) {
          this.timer = this.bannerSetTime()
          console.log(this.timer);
        }
      }
    }
  },
  methods: {
    // 点击切换li 小圆点
    handleClick (index) {
      this.currentIndex = index
    },
    // banner图定时器
    bannerSetTime () {
      return setInterval(() => {
        this.currentIndex >= this.bannerList.length - 1
          ? this.currentIndex = 0
          : this.currentIndex++
      }, 2000)
    },
    moveIntoBanner () {
      // debugger
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    moveOutBanner () {
      if (!this.timer) this.timer = this.bannerSetTime()
    }
  }
}

</script>
<style lang="scss" scoped>
.n-banner {
  background-size: 6000px;
  background-position: center center;
  background-color: sandybrown;
  .wrap {
    width: 982px;
    margin: 0 auto;
    .ban {
      .ban-img {
        img {
          width: 730px;
          height: 200px;
          display: block;
        }
      }
    }
    .dtos {
      position: absolute;
      bottom: 10px;
      width: 730px;
      text-align: center;
      .dtos-item {
        width: 6px;
        height: 6px;
        display: inline-block;
        background: #fff;
        border-radius: 50%;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          @extend .active-item;
        }
      }
      .active-item {
        background: #c20c0c;
      }
    }
  }
}
@keyframes fadeInOut {
    0% {
        opacity:1;
     }
    25% {
        opacity:0;
    }
    50% {
        opacity: 0;    
    }
    75% {
        opacity:1;
    }
}
.anim_fade_image {
    position:absolute;    
    animation-name: fadeInOut;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 12s;
    animation-direction: alternate;
}
</style>