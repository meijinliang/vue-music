<template>
  <!-- 发现音乐 - 排行榜 -->
  <div class="basic-container toplist">
    <!-- 左边榜单列表 -->
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
    <!-- 右边榜单详情 -->
    <div class="toplist-right">
      <div class="toplist-wrap1">
        <div class="cover-bg cover text-center">
          <img :src="playList.coverImgUrl" alt="">
        </div>
        <div>
          <h3>{{ playList.name }}</h3>
          <div>
            <i />
            <span>最近更新：{{ updateTime }}</span>
          </div>
        </div>
      </div>
      <div class="toplist-wrap2">
        <!-- 表格顶部信息 -->
        <el-row type="flex" justify="space-between">
          <el-col>
            <h2 class="inline-block mr16">歌曲列表</h2>
            <span v-if="playList.tracks"> {{ playList.tracks.length }}首歌</span>
          </el-col>
          <el-col align="right">
            <div class="play-count">
              播放：<span class="text-red">{{ playList.playCount }}</span> 次
            </div>
          </el-col>
        </el-row>
        <!-- 歌单列表 -->
        <el-table v-loading="loading" :data="tableData" stripe :header-row-class-name="headerClassName">
          <el-table-column type="index" width="100">
            <template v-slot="{row, $index}">
              <span>{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标题">
            <template v-slot="{row, $index}">
              <div class="table-td">
                <img v-if="$index < 3" class="table-img" :src="row.al.picUrl">
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="80">
            <template v-slot="{row}">
              <span> {{ formatTime(row.dt) }} </span>
            </template>
          </el-table-column>
          <el-table-column label="歌手" width="180">
            <template v-slot="{row}">
              <div class="ellipsis">
                <span v-for="(item, index) in row.ar" :key="item.id">{{ item.name }}
                  <span v-if="index !== row.ar.length - 1"> / </span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { playListDetail } from '@/api/music'
import { parseTime } from '@/utils/index'
export default {
  name: 'DiscoverToplist',
  components: {
    ListItem
  },
  data() {
    return {
      // 左边榜单栏
      topList: [],
      // 当前选中的榜单
      currentListId: -1,
      // 右边对应榜单的详情
      playList: {},
      // 榜单最近更新时间
      updateTime: '',
      // 加载表格列表
      loading: false,
      // 表格数据
      tableData: []
    }
  },
  computed: {
    // 云音乐特色榜列表
    musicFeaturelist() {
      return this.topList.slice(0, 4).map(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return { ...item }
      })
    },

    // 全球媒体榜列表
    globalMediaList() {
      return this.topList.slice(4).map(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return { ...item }
      })
    }
  },
  async created() {
    await this.getTopList()
  },
  methods: {
    // 发现音乐-排行榜-各榜单列表
    async getTopList() {
      const res = await this.$store.dispatch('getToplist')
      this.topList = res.list || []
      this.currentListId = res.list[0]?.id
      this.getListDetail()
    },
    // 切换排行榜榜单
    changeCurrentListId(id) {
      this.currentListId = id
      this.getListDetail()
    },
    // 获取榜单详情
    getListDetail() {
      this.loading = true
      playListDetail(this.currentListId).then(res => {
        this.playList = res?.playlist
        this.tableData = res?.playlist.tracks
        this.updateTime = parseTime(new Date(this.playList.trackUpdateTime), '{y}年{m}月{d}日')
      }).finally(() => {
        this.loading = false
      })
    },
    // 总毫秒处理成分秒
    formatTime(val) {
      let m, s
      m = Math.floor(val / 1000 / 60) < 10 ? '0' + Math.floor(val / 1000 / 60) : Math.floor(val / 1000 / 60)
      s = val % 60 < 10 ? '0' + val % 60 : val % 60
      return m + ':' + s
    },
    headerClassName() {
      return 'header-class'
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
    border-right: 1px solid #ccc;
    .toplist-wrap1 {
      padding: 24px;
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
    .toplist-wrap2 {
      padding: 0 24px;
      .play-count {
        line-height: 24px;
      }
      .table-td {
        display: flex;
        align-items: center;
        .table-img {
          width: 50px;
          height: 50px;
          margin-right: 15px;
        }
      }
    }
  }
}
// .el-table__header-wrapper {
//   /deep/ .header-class {
//     border: 1px solid #ccc;
//   }
// }
.el-table {
  border: 1px solid #ccc;
  border-top: 2px solid #c20c0c;
}
</style>
