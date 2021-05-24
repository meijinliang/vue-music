<template>
  <div>
    <el-card v-for="item in detailList" :key="item.id">
      <div class="item-header">
        <img src="item.coverImgUrl" alt="">
        <div>
          <span>{{item.name}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { playListDetail } from '@/api/index'
export default {
  name: 'listitem',
  props: {
    topList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    console.log(this.topList);
    this.getListDetail()
  },
  data () {
    return {
      detailList: []
    }
  },
  methods: {
    getListDetail() {
      return Promise.all(
        [this.topList.forEach(item => {
          playListDetail(item.id).then(res=> {
            this.detailList.push(res.playlist.tracks.slice(0,20))
          })
        })]
      )
    }
  }
}
</script>

<style scoped lang="scss">

</style>