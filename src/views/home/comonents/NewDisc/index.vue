<template>
  <div class="new-disc">
    <series-header
      title="新碟上架"
      type="discover-album"
    />
    <disc-item :swiper-data="swiperData" />
  </div>
</template>

<script>
import { getNewAblum } from '@/api/index'
import SeriesHeader from '../../../../components/SeriesHeader'
import DiscItem from './DiscItem'
export default {
  name: 'NewDisc',
  components: { SeriesHeader, DiscItem },
  data() {
    return {
      swiperData: []
    }
  },
  created() {
    this.getNewAblum()
  },
  methods: {
    getNewAblum() {
      getNewAblum().then((res) => {
        if (res.code === 200) {
          this.swiperData.push(res.albums.slice(0, 5))
          this.swiperData.push(res.albums.slice(5, 10))
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
