<template>
  <div class="hot-recmend">
    <series-header title="热门推荐">
      <div slot="items">
        <ul>
          <li v-for="(item,index) in hotRecmendItem" :key="index">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </series-header>
    <series-item :recommendedSongList="recommendedSongList" />
  </div>
</template>
<script>
import {personalized} from '@/api/index.js'
// import { toFixed } from '@/utils/index'
import SeriesHeader from '../../../components/SeriesHeader'
import SeriesItem from './SeriesItem'
export default {
  components: { SeriesHeader, SeriesItem },
  data() {
    return {
      hotRecmendItem: ['华语', '流行', '摇滚', '民谣', '电子'],
      recommendedSongList: []
    }
  },
  created() {
    this.getpersonalized()
  },
  methods: {
    // 获取推荐歌单
    async getpersonalized () {
      const params = 8
      const res = await personalized(params)
      this.recommendedSongList = res.result
      this.recommendedSongList.forEach(item => {
        item.playCount = (item.playCount/10000).toFixed(1)
      })
      console.log(this.recommendedSongList);
    },
  }
}
</script>
<style lang="scss" scoped>
.hot-recmend {
  margin-bottom: 10px;
  li {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    span {
      padding: 0 10px;
      border-right: 1px solid #ccc;
    }
  }
  li:first-child {
    span {
      padding-left: 0;
    }
  }
  li:last-child {
    span {
      border-right: none;
    }
  }
}

</style>