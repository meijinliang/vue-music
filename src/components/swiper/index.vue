<template>
  <div>
    <!-- <swiper :slides-per-view="3" :space-between="50">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper> -->
  </div>
</template>
<script>
// import { Swiper, SwiperSlide } from 'swiper/vue';
import { mixins } from './mixins'
export default {
  mixins: [mixins],
  props: {
    bannerList: {
      type: Array,
      required: true
    },
  },
  // components: {
  //   Swiper,
  //   SwiperSlide,
  // },
}
</script>