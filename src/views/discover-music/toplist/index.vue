<template>
  <div class="basic-container toplist">
    <div class="toplist-left">
      <div class="g-sd">
        <div>
          <h2 class="g-sd-1">云音乐特色榜</h2>
          <list-item :data-source="musicFeaturelist" :current-list-id="currentListId" @choose="changeCurrentListId" />
        </div>
        <div>
          <h2 class="g-sd-1 mt16">全球媒体榜</h2>
          <list-item :data-source="globalMediaList" :current-list-id="currentListId" @choose="changeCurrentListId" />
        </div>
      </div>
    </div>
    <div class="toplist-right">
      <div class="toplist-wrap1">
        <div class="cover text-center cover-bg">
          <!-- <img :src="playList.coverImgUrl" alt=""> -->
        </div>
        <div>

        </div>
      </div>
      <div class="toplist-wrap2">

      </div>
      <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { playListDetail } from '@/api/index'
export default {
  name: 'DiscoverToplist',
  components: {
    ListItem
  },
  data () {
    return {
      // 左边榜单栏
      topList: [],
      // 当前选中的榜单
      currentListId: -1,
      // 右边对应榜单的详情
      playList: {}
    }
  },
  computed: {
    musicFeaturelist () {
      return this.topList.slice(0, 4).map(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return { ...item }
      })
    },
    globalMediaList () {
      return this.topList.slice(4).map(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return { ...item }
      })
    }
  },
  async created () {
    await this.getTopList()
  },
  methods: {
    // 发现音乐-排行榜-各榜单列表
    async getTopList () {
      const res = await this.$store.dispatch('getToplist')
      this.topList = res.list || []
      this.currentListId = res.list[0]?.id
      this.getListDetail()
    },
    changeCurrentListId (id) {
      this.currentListId = id
      this.getListDetail()
    },
    // 获取榜单详情
    getListDetail () {
      playListDetail(this.currentListId).then(res => {
        this.playList = res?.playlist
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
    }
  }
  &-right {
    flex: 1;
    .toplist-wrap1 {
      padding: 40px;
      display: flex;
      .cover {
        width: 158px;
        height: 158px;
        background-position: -230px -380px;
        img {
          width: 150px;
          height: 150px;
          margin-top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>