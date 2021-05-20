<template>
  <div ref="swiperBg" class="swiper-bg" :class="swiperBg">
    <div class="swiper-box">
      <div class="swiper-box-left">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item,index) in bannerList" :key="index">
            <template>
              <img class="pointer" :src="item.imageUrl">
            </template>
            
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" />
        </swiper>
        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div :class="classPrev" />
        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div :class="classNext" />
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// swiper6的版本 功能组件需要按需导入并注册才能使用
import Swiper2, { Autoplay, Pagination, Navigation } from 'swiper'
Swiper2.use([Autoplay, Pagination, Navigation])
import 'swiper/swiper-bundle.css'
import { mixins } from './mixins'
let vm = null
export default {
  mixins: [mixins],
  props: {
    bannerList: {
      type: Array,
      required: true
    },
    hiddenPagination: {
      type: Boolean,
      default: false
    },
    classPrev: {
      type: String,
      default: 'swiper-button-prev'
    },
    classNext: {
      type: String,
      default: 'swiper-button-next'
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      activeSlide: 0,
      swiperOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        speed: 1000,
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange () {
            vm.activeSlide = this.activeIndex
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  watch: {
    activeSlide: {
      handler (val) {
        this.$refs.swiperBg.style.background = `url(${this.bannerbgList[val - 1]})`
      }
    }
  },
  created () {
    vm = this
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  // directives: {
  //   swiper: directive
  // }
  methods: {
    swiperBg () {
      // console.log(this.activeSlide);
      return 'bg'
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-bg {
  // background: #333;
  background-size: 6000px !important;
  background-position: center center !important;
}
.swiper-box {
  width: 982px;
  margin: 0 auto;
  .swiper-box-left {
    width: 730px;
    img {
      width: 730px;
    }
    .swiper-pagination {
      /deep/.swiper-pagination-bullet {
        background: #fff;
      }
    }

    .swiper-button-prev {
      left: 395px;
      top: 240px;
      color: #fff;
    }
    .swiper-button-next {
      right: 650px;
      top: 240px;
      color: #fff;
    }
  }
}
</style>