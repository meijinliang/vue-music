<template>
  <div class="song-list">
    <series-header title="榜单" />
    <list-item v-if="topList.length !== 0" :top-list="topList" />
  </div>
</template>

<script>
import { getTopList } from '@/api/index'
import SeriesHeader from '../../../../components/SeriesHeader'
import ListItem from './ListItem'
export default {
  name: 'SongList',
  components: { SeriesHeader, ListItem },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    // 获取榜单列表取目前取前三个展示
    async getTopList() {
      const res = await getTopList()
      this.topList = res.list.slice(0, 3)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
