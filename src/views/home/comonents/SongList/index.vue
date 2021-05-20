<template>
  <div class="song-list">
    <SeriesHeader title="榜单" />
    <list-item :topList="detailList" />
  </div>
</template>

<script>
import { getTopList, playListDetail } from '@/api/index'
import SeriesHeader from '../../../../components/SeriesHeader'
import ListItem from './ListItem'
export default {
  name:  'SongList',
  components: { SeriesHeader, ListItem },
  data () {
    return {
      topList: [],
      detailList: []
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    // 获取榜单列表取目前取前三个展示
    async getTopList() {
      const res = await getTopList()
      this.topList = res.list.slice(0,3)
      // this.getListDetail()
       
    },
    getDetail() {
      this.topList.forEach(item => {
        playListDetail(item.id).then(res=> {
          // this.$set(item, 'tracks', res.playList.tracks.slice(0,20))
          // this.topList[index].tracks = res.playList.tracks.slice(0,20)
          // 数据格式：[[],[],[]] 目前暂取每个榜单的前20首歌
          this.detailList.push(res.playList.tracks.slice(0,20))
        })
      })
    },
    // 获取展示榜单的详情
    getListDetail() {
      return Promise.all(
        this.getDetail()
      )
    }
  }
}
</script>

<style scoped lang="scss">

</style>