<template>
  <div class="basic-container toplist">
    <div class="toplist-left">
      <div class="g-sd">
        <div>
          <h2 class="g-sd-1">云音乐特色榜</h2>
          <div v-for="item in musicFeaturelist" :key="item.id" class="g-sd-item">
            <div class="g-sd-item-left">
              <img :src="item.coverImgUrl" alt="">
            </div>
            <div class="g-sd-item-right">

            </div>
          </div>
        </div>
        <div>
          <h2>全球媒体榜</h2>
        </div>
      </div>
    </div>
    <div class="toplist-right">

    </div>
  </div>
</template>

<script>
import { getTopList } from '@/api/index'
export default {
  name: 'DiscoverToplist',
  data () {
    return {
      topList: []
    }
  },
  computed: {
    musicFeaturelist () {
      return this.topList.slice(0, 4).forEach(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
      })
    }
  },
  mounted () {
    console.log(this.musicFeaturelist);
  },
  created () {
    this.getTopList()
  },
  methods: {
    // 发现音乐-排行榜-各榜单列表
    getTopList () {
      getTopList().then(res => {
        console.log(res);
        this.topList = res.list || []
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.toplist {
  display: flex;
  &-left {
    width: 240px;
    border: 1px solid #ccc;
    .g-sd {
      margin-top: 20px;
      &-1 {
        padding: 0 10px 12px 15px;
      }
      &-item {
        display: flex;
        &-left {
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
  &-right {
    flex: 1;
  }
}
</style>