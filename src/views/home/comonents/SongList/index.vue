<template>
  <div class="song-list">
    <SeriesHeader title="榜单" />
    <list-item v-if="topList.length !== 0" :topList="topList" />
  </div>
</template>

<script>
import { getTopList } from '@/api/index'
import SeriesHeader from '../../../../components/SeriesHeader'
import ListItem from './ListItem'
export default {
  name:  'SongList',
  components: { SeriesHeader, ListItem },
  data () {
    return {
      topList: [],
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
    },
    // getDetail() {
    //   this.topList.forEach(item => {
    //     playListDetail(item.id).then(res=> {
    //       this.detailList.push(res.playList.tracks.slice(0,20))
    //     })
    //   })
    // },
    // // 获取展示榜单的详情
    // getListDetail() {
    //   return Promise.all(
    //     this.getDetail()
    //   )
    // }
  }
}
</script>

<style scoped lang="scss">

</style>