<template>
  <div class="swiper-bg">
    <div class="swiper-box">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item,index) in bannerList" :key="index">
          <!-- <img :src="item.imageUrl"> -->
          {{item.typeTitle}}
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    ``</swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { mixins } from './mixins'
export default {
  mixins: [mixins],
  props: {
    bannerList: {
      type: Array,
      required: true
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
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
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    console.log(this.bannerList);
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  }
  // directives: {
  //   swiper: directive
  // }
}
</script>
<style lang="scss" scoped>
.swiper-box {
  width: 1100px;
  margin: 0 auto;
}
</style>