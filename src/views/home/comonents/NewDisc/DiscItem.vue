<template>
  <div class="item-box">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,index) in swiperData" :key="index">
        <template>
          <div class="inner-box">
            <ul>
              <li class="li-item" v-for="(subItem, index) in item" :key="index">
                <div class="cover pr">
                  <img :src="subItem.picUrl" alt="">
                  <a href="javascript:;" class="msk "></a>
                  <!-- <div class="cover"></div> -->
                </div>
                <p class="ellipsis">{{ subItem.name }}</p>
                <p class="ellipsis">{{ subItem.artist.name}}</p>
              </li>
            </ul>
          </div>
        </template>
      </swiper-slide>
    </swiper>
    <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <div class="swiper-button-prev" />
    <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <div class="swiper-button-next" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// swiper6的版本 功能组件需要按需导入并注册才能使用
import Swiper2, { Autoplay, Pagination, Navigation } from 'swiper'
Swiper2.use([Autoplay, Pagination, Navigation])
import 'swiper/swiper-bundle.css'
export default {
  props: {
    swiperData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  watch: {
    swiperData: {
      handler (val) {
        console.log(val);
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        loop: true,
        speed: 1000,
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.item-box {
  height: 186px;
  margin: 20px 0 20px;
  .inner-box {
    width: 696px;
    padding-left: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    ul {
      display: flex;
      justify-content: space-around;
      margin: 28px 0 0;
      width: 645px;
      .li-item {
        .cover {
          img {
            width: 100px;
            height: 100px;
          }
          .msk {
            position: absolute;
            top: 0;
            left: 0;
            width: 118px;
            height: 100px;
            background: url("../../../../assets/img/cover-disc.png") no-repeat;
            background-position: 0 -570px;
            // background-image: url("../../../../assets/img/cover-disc.png");
          }
          // background:url("../../../../assets/img/cover-disc.png") 和 background-position: 0 -570px;后者会失效是因为前者是后者的简写样式覆盖问题
        }
        > p {
          width: 100px;
        }
      }
    }
  }
}
</style>