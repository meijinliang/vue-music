<template>
  <!-- 歌单详情 -->
  <div class="basic-container album">
    <el-row>
      <!-- 左侧歌单详情 -->
      <el-col
        v-loading="loading"
        :span="18"
        class="album-left"
      >
        <div class="cnt clearfix">
          <div class="cnt-img ">
            <img
              :src="albumDetail.coverImgUrl"
              :alt="albumDetail.description"
            >
            <span class="cover-bg" />
          </div>

          <div class="cnt-detail">
            <div class="cnt-detail-title">
              <i class="icon-bg fl" />
              <div class="tit">
                <h2>{{ albumDetail.name }}</h2>
              </div>
            </div>
            <div class="cnt-detail-creator">
              <img
                class="inline-block pointer"
                :src="albumDetail.creator.avatarUrl"
                alt=""
              >
              <span class="cnt-detail-creator-name">
                <a> {{ albumDetail.creator.nickname }} </a>
                <img
                  v-if="albumDetail.creator.avatarDetail"
                  class="inline-block"
                  :src="albumDetail.creator.avatarDetail.identityIconUrl"
                  alt=""
                >
              </span>
              <span class="cnt-detail-creator-time">
                {{ parseTime(albumDetail.createTime, '{y}-{m}-{d}') }} 创建
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="cnt-detail-opration-btn">
              <span class="play mr8">
                <a title="播放">
                  <svg-icon
                    class="icon"
                    icon-class="play"
                  />
                  播放
                </a>
                <a
                  class="plus"
                  title="添加到播放列表"
                >
                  +
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon
                    class="icon"
                    icon-class="file"
                  />
                  ({{ albumDetail.subscribedCount }})
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon
                    class="icon"
                    icon-class="share"
                  />
                  ({{ albumDetail.shareCount }})
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon
                    class="icon"
                    icon-class="download"
                  />
                  下载
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon
                    class="icon"
                    icon-class="chat-dot-square"
                  />
                  ({{ albumDetail.commentCount }})
                </a>
              </span>
            </div>

            <!-- 歌单标签 -->
            <div class="cnt-detail-tags">
              <span>标签：</span>
              <a
                v-for="(item, index) in albumDetail.tags"
                :key="index"
                class="cnt-detail-tags-item mr8"
              > {{ item }}</a>
            </div>

            <!-- 歌单描述 -->
            <shrink-wrap
              :value="albumDetail.description"
              :height="72"
            />
          </div>
        </div>

        <!-- 歌曲列表 -->
        <div class="album-list mt20">
          <!-- 歌曲列表 头部 -->
          <div class="album-list-header">
            <div class="left">
              <h1>歌曲列表</h1>
              <span class="tc-6">{{ albumDetail.trackCount }} 首歌</span>
            </div>
            <div class="right">
              播放：{{ albumDetail.playCount }}次
            </div>
          </div>
          <!-- 具体歌曲 -->
          <div class="album-list-content">
            <!-- 歌单歌曲列表 -->
            <el-table
              class="my-table"
              :data="albumDetail.tracks"
              stripe
              :header-row-class-name="headerClassName"
            >
              <el-table-column
                type="index"
                width="80"
              >
                <template v-slot="{row, $index}">
                  <span class="index">{{ $index + 1 }}</span>
                  <svg-icon
                    class="icon fr pointer a-icon"
                    icon-class="play-black"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="歌曲标题"
                prop="name"
              >
                <template v-slot="{row}">
                  <div class="ellipsis">
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
                    >
                      +
                    </a>
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
                width="90"
              >
                <template v-slot="{row}">
                  <div class="ellipsis">
                    <span :title="row.ar.map(x => x.name).join('/')">{{ row.ar.map(x => x.name).join('/') }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="专辑"
                width="130"
              >
                <template v-slot="{row}">
                  <div class="ellipsis">
                    <a
                      class="hover-underline"
                      :title="row.al.name"
                    >{{ row.al.name }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 歌曲列表尾部 -->
          <div class="album-list-footer">
            <!-- <p class="text-center">查看更多内容，请下载客户端</p> -->
            <a>查看更多内容，请下载客户端</a>
            <a class="download">立即下载</a>
          </div>

        </div>

        <!-- 评论 -->
        <comment
          v-if="JSON.stringify(commentDetail) != '{}'"
          :detail="commentDetail"
          @page="handleCurrentChange"
        />
      </el-col>
      <el-col
        :span="6"
        class="album-right"
      >
        <!-- 喜欢歌单的用户 -->
        <div class="users">
          <h5 class="right-title">喜欢这个歌单的人</h5>
          <div class="users-wrapper">
            <a
              v-for="item in albumDetail.subscribers"
              :key="item.userId"
            >
              <img
                :src="item.avatarUrl"
                :title="item.nickname"
              >
            </a>
          </div>
        </div>

        <!-- 热门歌单 -->
        <div class="hot-play">
          <h5 class="right-title">热门歌单</h5>
          <ul class="hot-play-wrapper">
            <li
              v-for="(item, index) in topPlayList"
              :key="index"
              class="item"
            >
              <a :title="item.name">
                <img :src="item.coverImgUrl">
              </a>
              <a class="title">
                <span
                  class="ellipsis"
                  :title="item.name"
                >{{ item.name }}</span>
                <span class="tc-6">
                  by -{{ item.creator.nickname }}
                  <img
                    v-if="item.creator.avatarDetail"
                    :src="item.creator.avatarDetail.identityIconUrl"
                  >
                </span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 网易云多端下载 -->
        <div class="download">
          <h5 class="right-title mb20">网易云多端下载</h5>
          <ul class="download-bg">
            <li>
              <a class="ios" />
            </li>
            <li>
              <a class="pc" />
            </li>
            <li>
              <a class="aos" />
            </li>
          </ul>
          <p class="tc-9">同步歌单，随时畅听320k好音乐</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { topPlayList } from '@/api/index'
import { playListDetail, playListComment } from '@/api/music'
import { parseTime } from '@/utils/index'
import ShrinkWrap from '@/views/components/ShrinkWrap'
import Comment from '@/views/components/comment'
export default {
  components: { Comment, ShrinkWrap },
  data() {
    return {
      // 专辑顶部详情
      albumDetail: {
        creator: {
          avatarUrl: ''
        }
      },
      commentDetail: {},
      // 热门歌单
      topPlayList: [],
      loading: false
    }
  },
  created() {
    this.getAlbumDetail()
  },
  methods: {
    parseTime,
    // 获取歌单详情
    async getAlbumDetail() {
      try {
        this.loading = true
        const res = await playListDetail(this.$route.query.id)
        this.albumDetail = res.playlist
        const result = await topPlayList()
        this.topPlayList = result.playlists.slice(0, 5)
        await this.gtePlayListComment()
      } finally {
        this.loading = false
      }
    },

    // 获取歌单评论
    gtePlayListComment(offset) {
      // limit 默认取20条评论
      const params = {
        id: this.$route.query.id,
        offset
      }
      playListComment(params).then((res) => {
        this.commentDetail = res
      })
    },
    // 分页切换
    handleCurrentChange(val) {
      val = val === 1 ? undefined : (val - 1) * this.pageSize
      this.gtePlayListComment(val)
    },
    // 设置表头顶部边框颜色
    headerClassName() {
      return 'header-class'
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
    }
  }
}
</script>
<style lang="scss" scoped>
.album {
  &-left {
    padding: 47px 30px 40px 39px;
    border-right: 1px solid #d3d3d3;
    .cnt {
      // display: flex;
      &-img {
        float: left;
        width: 208px;
        height: 208px;
        img {
          width: 100%;
          height: 100%;
        }
        .cover-bg {
          display: block;
          width: 208px;
          height: 208px;
          position: absolute;
          top: 47px;
          background-position: 0 -1285px;
        }
      }
      &-detail {
        margin-left: 240px;
        // 歌单标题
        &-title {
          .tit {
            position: relative;
            margin-left: 68px;
          }
          i {
            width: 54px;
            height: 24px;
            background-position: 0 -243px;
            vertical-align: bottom;
          }
          h2 {
            font-size: 20px;
            line-height: 24px;
            font-weight: normal;
          }
        }

        // 创建者信息
        &-creator {
          margin: 15px 0 20px;
          line-height: 35px;
          > img {
            width: 35px;
            height: 35px;
            vertical-align: bottom;
          }
          &-name {
            padding: 0 10px;
            color: #0c73c2;
            img {
              width: 13px;
              height: 13px;
            }
          }
          &-time {
            color: #999;
          }
        }

        // 操作按钮
        &-opration-btn {
          display: flex;
          height: 31px;
          .play {
            line-height: 31px;
            display: flex;
            a {
              color: #fff;
              background-color: #1e6fbf;
              padding: 0 8px;
              border-radius: 5px 0 0 5px;
            }
            .plus {
              font-size: 20px;
              margin-left: 1px;
              border-radius: 0 5px 5px 0;
            }
          }
        }

        // 歌单标签
        &-tags {
          margin: 25px 0 5px 0;
          color: #666;
          &-item {
            border: 1px solid #dcdfe6;
            border-radius: 10px;
            padding: 2px 10px;
            background-color: #f5f5f5;
          }
          &-item:hover {
            background-color: #fff;
          }
        }

        // 歌单描述
        &-description {
          color: #666;
          white-space: pre-wrap;
          line-height: 18px;
        }
      }
    }
    .album-list {
      &-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .left {
          h1 {
            font-weight: 400;
            display: inline-block;
            margin-right: 20px;
          }
        }
        .right {
          line-height: 31px;
        }
      }
      &-footer {
        margin: 30px 0 10px 0;
        font-size: 13px;
        height: 66px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .download {
          padding: 7px 35px;
          border-radius: 15px;
          color: #fff;
          background-color: #ff1d12;
        }
      }
    }
  }
  &-right {
    padding: 20px;
    .users {
      img {
        width: 40px;
        height: 40px;
      }
      &-wrapper {
        padding: 20px 0;
        display: flex;
        flex-wrap: wrap;
        a {
          // width: 25%;
          padding: 0 0 10px 10px;
        }
      }
    }
    .hot-play {
      &-wrapper {
        padding: 20px 0;
        .item {
          display: flex;
          height: 50px;
          margin-bottom: 15px;
          img {
            width: 50px;
            height: 50px;
          }
          .title {
            width: 140px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            img {
              width: 13px;
              height: 13px;
            }
          }
        }
      }
    }

    .download ul {
      height: 65px;
      margin-bottom: 10px;
      background-position: 0 -392px;
      li {
        float: left;
        a {
          display: block;
          width: 42px;
          height: 48px;
          text-indent: -9999px;
        }
        .pc {
          width: 68px;
          margin: 0 26px;
        }
        .ios:hover {
          background-position: 0 -472px;
        }
        .pc:hover {
          background-position: -68px -472px;
        }
        .aos:hover {
          background-position: -162px -472px;
        }
      }
    }
  }
}
.icon {
  font-weight: 600;
  font-size: 16px;
  vertical-align: -5px;
}
.index {
  padding-left: 8px;
  color: #999;
}
.table-oprate-btn {
  height: 23px;
  a {
    font-size: 20px;
    .svg-icon {
      margin-right: 3px;
    }
  }
}
.right-title {
  padding: 5px 0;
  border-bottom: 1px solid #d3d3d3;
}
// 分页选中背景颜色
.el-pagination.is-background {
  text-align: center;
  /deep/.el-pager li:not(.disabled).active {
    background-color: #c20c0c;
  }
}
</style>
