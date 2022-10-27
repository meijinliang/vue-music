<template>
  <!-- 发现音乐 - 排行榜 -->
  <div class="basic-container toplist">
    <!-- 左边榜单列表 -->
    <div class="toplist-left">
      <div class="g-sd">
        <div>
          <h2 class="g-sd-1">云音乐特色榜</h2>
          <list-item
            :data-source="musicFeaturelist"
            :current-list-id="currentListId"
            @choose="changeCurrentList"
          />
        </div>
        <div>
          <h2 class="g-sd-1 mt16">全球媒体榜</h2>
          <list-item
            :data-source="globalMediaList"
            :current-list-id="currentListId"
            @choose="changeCurrentList"
          />
        </div>
      </div>
    </div>
    <!-- 右边榜单详情 -->
    <div class="toplist-right">
      <div class="toplist-wrap1 clearfix">
        <div class="cover">
          <img
            :src="current.coverImgUrl"
            alt=""
          >
        </div>
        <div class="toplist-wrap1-detail">
          <h3>{{ current.name }}</h3>
          <div class="update-time">
            <i class="el-icon-time" />
            <span class="ml8">最近更新：{{ formatDate(current.updateTime) }}</span>
            <span class="tc-9">（{{ current.updateFrequency }}）</span>
          </div>
          <!-- 操作控制栏 -->
          <play-contral :data="playList" />
        </div>
      </div>
      <div class="toplist-wrap2">
        <!-- 表格顶部信息 -->
        <el-row
          class="toplist-wrap2-top"
          type="flex"
          justify="space-between"
        >
          <el-col>
            <h2 class="inline-block mr16">歌曲列表</h2>
            <span v-if="playList.tracks">
              {{ playList.tracks.length }}首歌</span>
          </el-col>
          <el-col align="right">
            <div class="play-count">
              播放：<span class="text-red">{{ playList.playCount }}</span> 次
            </div>
          </el-col>
        </el-row>
        <!-- 歌单列表 -->
        <el-table
          v-loading="loading"
          :data="tableData"
          class="my-table"
          stripe
        >
          <el-table-column
            type="index"
            width="100"
          >
            <template v-slot="{ row, $index }">
              <span>{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标题">
            <template v-slot="{ row, $index }">
              <div class="table-td">
                <img
                  v-if="$index < 3"
                  class="table-img"
                  :src="row.al.picUrl"
                >
                <link-to
                  type="song"
                  :title="row.name"
                  :data="{
                    query: {
                      id: row.id
                    },
                    params: {
                      pageTitle: `${row.name} - ${row.ar.map((x) => x.name).join('/')}`
                    }
                  }"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="时长"
            width="110"
          >
            <template v-slot="{row}">
              <span
                v-time
                class="table-oprate-time"
              > {{ row.dt }} </span>
              <div class="table-oprate-btn">
                <a
                  class="a-icon"
                  title="添加到播放列表"
                >+</a>
                <a
                  class="a-icon"
                  title="收藏"
                >
                  <svg-icon icon-class="file" />
                </a>
                <a
                  class="a-icon"
                  title="分享"
                >
                  <svg-icon icon-class="share" />
                </a>
                <a
                  class="a-icon"
                  title="下载"
                >
                  <svg-icon icon-class="download" />
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="歌手"
            width="180"
          >
            <template v-slot="{ row }">
              <div class="ellipsis">
                <span
                  v-for="(item, index) in row.ar"
                  :key="item.id"
                >{{ item.name }}
                  <span v-if="index !== row.ar.length - 1"> / </span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <comment
          v-if="JSON.stringify(commentDetail) != '{}'"
          :detail="commentDetail"
          @page="handleCurrentChange"
        />
      </div>
      <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { playListDetail, playListComment } from '@/api/music'
import { parseTime } from '@/utils/index'
import Comment from '@/views/components/comment'
import PlayContral from '@/views/components/PlayContral.vue'
export default {
  name: 'DiscoverToplist',
  components: {
    ListItem,
    Comment,
    PlayContral
  },
  data() {
    return {
      // 左边榜单栏
      topList: [],
      // 当前选中的榜单
      currentListId: -1,
      current: {},
      // 右边对应榜单的详情
      playList: {},
      // 加载表格列表
      loading: false,
      // 表格数据
      tableData: [],
      commentDetail: {}
    }
  },
  computed: {
    // 云音乐特色榜列表
    musicFeaturelist() {
      return this.topList.slice(0, 4).map((item) => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return { ...item }
      })
    },

    // 全球媒体榜列表
    globalMediaList() {
      return this.topList.slice(4).map((item) => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return { ...item }
      })
    }
  },
  watch: {
    '$route.query.id'(val, oldVal) {
      if (val && val !== oldVal) {
        this.currentListId = Number(val)
        this.getPlayDetailAndComment()
      }
    }
  },
  async created() {
    await this.getTopList()
  },
  methods: {
    formatDate(val) {
      return parseTime(new Date(val), '{y}年{m}月{d}日')
    },
    // 发现音乐-排行榜-各榜单列表
    async getTopList() {
      const res = await this.$store.dispatch('getToplist')
      this.topList = res.list || []
      this.currentListId = res.list[0]?.id
      this.current = res.list[0]
      console.log(this.current)
      this.getPlayDetailAndComment()
    },
    // 切换排行榜榜单
    changeCurrentList(row) {
      this.current = row
      this.$router.push({
        path: '/discover/toplist',
        query: {
          id: row.id
        }
      })
    },
    // 跳转歌曲详情页
    checkSongDetail(row) {
      this.$router.push({
        name: 'song',
        query: {
          id: row.id
        },
        params: {
          pageTitle: `${row.name} - ${row.ar.map((x) => x.name).join('/')}`
        }
      })
    },
    // 获取歌单详情和评论
    getPlayDetailAndComment(offset) {
      this.loading = true
      Promise.all([
        playListDetail(this.currentListId),
        playListComment({
          id: this.currentListId,
          offset
        })
      ])
        .then((res) => {
          this.playList = res[0]?.playlist
          this.tableData = res[0]?.playlist.tracks
          this.commentDetail = res[1]
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 分页切换
    handleCurrentChange(val) {
      val = val === 1 ? undefined : (val - 1) * this.pageSize
      this.gtePlayListComment(val)
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
      padding: 40px;
      .cover {
        float: left;
        box-sizing: border-box;
        width: 158px;
        height: 158px;
        padding: 3px;
        border: 1px solid #ccc;
        img {
          width: 150px;
          height: 150px;
        }
      }
      &-detail {
        margin-left: 187px;
        h3 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
          margin: 16px 0 4px;
        }
        .update-time {
          margin: 0 0 20px;
          line-height: 35px;
        }
      }
    }
    .toplist-wrap2 {
      padding: 0 30px 40px 40px;
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
      &-top {
        height: 33px;
        align-items: center;
      }
    }
  }
}
.el-table {
  // border: 1px solid #ccc;
  // border-top: 2px solid #c20c0c;
  margin-bottom: 40px;
  .table-oprate-btn {
    height: 23px;
    a {
      font-size: 20px;
      .svg-icon {
        margin-right: 3px;
      }
    }
  }
}
</style>
