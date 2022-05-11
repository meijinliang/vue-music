<template>
  <div class="basic-container song">
    <el-row>
      <!-- 左侧歌单详情 -->
      <el-col v-loading="loading" :span="18" class="song-left">
        <div class="cnt clearfix">
          <div class="fl pr">
            <div class="cnt-img">
              <img :src="songDetail.al.picUrl" :alt="songDetail.al.name">
              <span class="cover-bg" />
            </div>
            <div class="mt20 text-center">
              <svg-icon style="font-size: 14px; margin-right: 2px" icon-class="music" />
              <a class="link">生成外链播放器</a>
            </div>
          </div>

          <div class="cnt-detail">
            <div class="cnt-detail-title">
              <i class="icon-bg inline-block" />
              <h2 class="inline-block">{{ songDetail.name }}</h2>
            </div>
            <p class="tc-9 mtb10">
              歌手: <span class="link-span">{{ songDetail.ar[0].name }}</span>
            </p>
            <p class="tc-9 mtb10">
              所属专辑: <span class="link-span">{{ songDetail.al.name }}</span>
            </p>

            <!-- 操作按钮 -->
            <div class="cnt-detail-opration-btn">
              <span class="play mr8">
                <a title="播放">
                  <svg-icon class="icon" icon-class="play" />
                  播放
                </a>
                <a class="plus" title="添加到播放列表"> + </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon class="icon" icon-class="file" />
                  (收藏)
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon class="icon" icon-class="share" />
                  (分享)
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon class="icon" icon-class="download" />
                  下载
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon class="icon" icon-class="chat-dot-square" />
                  ({{ commentDetail.total }})
                </a>
              </span>
            </div>

            <!-- 歌词 -->
            <shrink-wrap :value="songDetail.lyric" />
          </div>
        </div>

        <!-- 评论 -->
        <comment v-if="JSON.stringify(commentDetail) != '{}'" :detail="commentDetail" @page="handleCurrentChange" />
      </el-col>
      <el-col :span="6" class="album-right">
        <!-- 喜欢歌单的用户 -->
        <!-- <div class="users">
          <h5 class="right-title">喜欢这个歌单的人</h5>
          <div class="users-wrapper">
            <a v-for="item in songDetail.subscribers" :key="item.userId">
              <img :src="item.avatarUrl" :title="item.nickname">
            </a>
          </div>
        </div> -->

        <!-- 热门歌单 -->
        <!-- <div class="hot-play">
          <h5 class="right-title">热门歌单</h5>
          <ul class="hot-play-wrapper">
            <li class="item" v-for="(item, index) in topPlayList" :key="index">
              <a :title="item.name">
                <img :src="item.coverImgUrl">
              </a>
              <a class="title">
                <span class="ellipsis" :title="item.name">{{ item.name }}</span>
                <span class="tc-6">
                  by -{{ item.creator.nickname }}
                  <img v-if="item.creator.avatarDetail" :src="item.creator.avatarDetail.identityIconUrl" >
                </span>
              </a>
            </li>
          </ul>
        </div> -->

        <!-- 网易云多端下载 -->
        <!-- <div class="download">
          <h5 class="right-title mb20">网易云多端下载</h5>
          <ul class="download-bg">
            <li>
              <a class="ios"></a>
            </li>
            <li>
              <a class="pc"></a>
            </li>
            <li>
              <a class="aos"></a>
            </li>
          </ul>
          <p class="tc-9">同步歌单，随时畅听320k好音乐</p>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Comment from '@/views/components/comment'
import ShrinkWrap from '@/views/components/ShrinkWrap'
import { getSongDetail, getMusicComment, getLyric } from '@/api/music'
export default {
  name: '',
  components: { Comment, ShrinkWrap },
  data() {
    return {
      data: '',
      songDetail: {},
      commentDetail: {},
      isExpand: null,
      loading: false
    }
  },
  computed: {},
  created() {
    this.getMusicDetail()
  },
  methods: {
    // 获取歌曲详情
    async getMusicDetail() {
      this.loading = true
      try {
        const params = {
          ids: this.$route.query.id
        }
        // 获取歌曲详情
        const res = await getSongDetail(params)
        this.songDetail = res.songs[0]
        // 获取歌词
        const result = await getLyric({ id: this.$route.query.id })
        const lyric = result.lrc.lyric.replace(/\[.*?\]/g, '') // 正则表达式移除字符串中的所有【】（包括其内容）
        this.songDetail.lyric = lyric
        this.getMusicComment()
      } finally {
        this.loading = false
      }
    },
    // 获取歌曲评论
    async getMusicComment(offset) {
      const params = {
        id: this.$route.query.id,
        offset
      }
      this.commentDetail = await getMusicComment(params)
    },
    // 分页切换
    handleCurrentChange(val) {
      val = val === 1 ? undefined : (val - 1) * this.pageSize
      this.getMusicComment(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.song {
  &-left {
    padding: 47px 30px 40px 39px;
    border-right: 1px solid #d3d3d3;
    .cnt {
      &-img {
        width: 198px;
        height: 198px;
        img {
          margin: 34px;
          width: 130px;
          height: 130px;
        }
        .cover-bg {
          display: block;
          width: 206px;
          height: 205px;
          position: absolute;
          top: -4px;
          left: -4px;
          background-position: -140px -580px;
        }
      }
      &-detail {
        margin-left: 240px;
        // 歌单标题
        &-title {
          i {
            width: 54px;
            height: 24px;
            background-position: 0 -463px;
            vertical-align: bottom;
          }
          h2 {
            font-size: 20px;
            line-height: 24px;
            font-weight: normal;
            margin-left: 10px;
          }
        }

        // 操作按钮
        &-opration-btn {
          display: flex;
          height: 31px;
          margin-bottom: 25px;
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

        // 歌词
        &-lyric {
          color: #666;
          white-space: pre-wrap;
          line-height: 18px;
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
</style>
