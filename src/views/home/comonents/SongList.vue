<template>
  <div class="song-list">
    <SeriesHeader title="榜单" />
  </div>
</template>

<script>
// import { getTopList } from '@/api/index'
import SeriesHeader from '../../../components/SeriesHeader'
export default {
  name:  'SongList',
  components: { SeriesHeader },
  data () {
    return {

    }
  },
}
</script>

<style scoped lang="scss">

</style>