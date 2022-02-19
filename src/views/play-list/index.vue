<template>
  <div class="album">
    <el-row>
      <!-- 左侧歌单详情 -->
      <el-col v-if="JSON.stringify(albumDetail) != '{}'" :span="18" class="album-left">
        <div class="cnt clearfix">
          <div class="cnt-img ">
            <img :src="albumDetail.coverImgUrl" :alt="albumDetail.description">
            <span class="cover-bg"></span>
          </div>

          <div class="cnt-detail">
            <div class="cnt-detail-title">
              <i class="icon-bg inline-block"></i>
              <h2 class="inline-block">{{ albumDetail.name }}</h2>
            </div>
            <div class="cnt-detail-creator">
              <img class="inline-block pointer" :src="albumDetail.creator.avatarUrl" alt="">
              <span class="cnt-detail-creator-name">
                <a> {{ albumDetail.creator.nickname }} </a>
                <img v-if="albumDetail.creator.avatarDetail" class="inline-block" :src="albumDetail.creator.avatarDetail.identityIconUrl" alt="">
              </span>
              <span class="cnt-detail-creator-time">
                {{ parseTime(albumDetail.createTime, '{y}-{m}-{d}')}} 创建
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="cnt-detail-opration-btn">
              <span class="play mr8">
                <a title="播放">
                  <svg-icon class="icon" icon-class="play" />
                  播放
                </a>
                <a class="plus" title="添加到播放列表">
                  +
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon class="icon" icon-class="file" />
                  ({{ albumDetail.subscribedCount }})
                </a>
              </span>
              <span class="button mr8">
                <a>
                  <svg-icon class="icon" icon-class="share" />
                  ({{ albumDetail.shareCount }})
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
                  ({{ albumDetail.commentCount }})
                </a>
              </span>
            </div>

            <!-- 歌单标签 -->
            <div class="cnt-detail-tags">
              <span>标签：</span>
              <a v-for="(item, index) in albumDetail.tags" :key="index" class="cnt-detail-tags-item mr8"> {{ item }}</a>
            </div>

            <!-- 歌单描述 -->
            <p class="cnt-detail-description">
              介绍：{{ albumDetail.description }}
            </p>
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
            <el-table class="my-table" :data="albumDetail.tracks" stripe :header-row-class-name="headerClassName">
              <el-table-column type="index" width="80">
                <template v-slot="{row, $index}">
                  <span class="index">{{ $index + 1 }}</span>
                  <svg-icon class="icon fr pointer a-icon" icon-class="play-black" />
                </template>
              </el-table-column>
              <el-table-column label="歌曲标题" prop="name">
                <template v-slot="{row}">
                  <div class="ellipsis">
                    <a class="hover-underline" :title="row.name">{{ row.name }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="时长" width="110">
                <template v-slot="{row}">
                  <span v-time class="table-oprate-time"> {{ row.dt }} </span>
                  <div class="table-oprate-btn">
                    <a class="a-icon" title="添加到播放列表">
                      +
                    </a>
                    <a class="a-icon" title="收藏">
                      <svg-icon icon-class="file" />
                    </a>
                    <a class="a-icon" title="分享">
                      <svg-icon icon-class="share" />
                    </a>
                    <a class="a-icon" title="下载">
                      <svg-icon icon-class="download" />
                    </a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="歌手" width="90">
                <template v-slot="{row}">
                  <div class="ellipsis">
                    <span v-for="(item, index) in row.ar" :key="item.id">{{ item.name }}
                      <span v-if="index !== row.ar.length - 1"> / </span>
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="专辑" width="130">
                <template v-slot="{row}">
                  <div class="ellipsis">
                    <a class="hover-underline" :title="row.al.name">{{ row.al.name }}</a>
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
        <div class="album-comment">
          <div class="album-comment-header">
            <h1>评论</h1>
            <span class="tc-6">共{{ albumDetail.commentCount }}条评论</span>
          </div>
          <div class="album-comment-content clearfix">
            <a class="fl">
              <img src="../../assets/img/default_avatar.jpg" alt="">
            </a>
            <div class="comment">
              <!-- <input type="textarea"> -->
              <el-input class="pr" type="textarea" placeholder="评论" :maxlength="140" show-word-limit :rows="3" />
              <div class="mt8">
                <a class="submmit fr">提交</a>
              </div>
            </div>
          </div>
          <!-- 评论 -->
          <div>
            <h3 v-if="hotComment.length">精彩评论</h3>
            <comment-item v-if="hotComment.length" :comment-list="hotComment" />
            <h3 v-if="comments.length && currentPage == 1">最新评论({{ commentDetail.total }})</h3>
            <comment-item :comment-list="comments" />
          </div>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            :total="commentDetail.total"
            prev-text="< 上一页"
            next-text	="下一页 >"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { playListDetail, playListComment } from '@/api/index'
import { parseTime } from '@/utils/index'
import CommentItem from '@/views/components/commentItem'
export default {
  data () {
    return {
      // 专辑顶部详情
      albumDetail: {},
      commentDetail: {},
      // 评论
      comments: [],
      // 热门评论
      hotComment: [],
      // 分页条数
      pageSize: 20,
      currentPage: 1
    }
  },
  components: { CommentItem },
  created () {
    this.getAlbumDetail()
    this.gtePlayListComment()
  },
  methods: {
    parseTime,
    // 获取歌单详情
    getAlbumDetail () {
      playListDetail(this.$route.query.id).then(res => {
        this.albumDetail = res.playlist
      })
    },

    // 获取歌单评论
    gtePlayListComment(offset) {
      // limit 默认取20条评论
      const params = {
        id: this.$route.query.id,
        offset
      }
      playListComment(params).then(res => {
        this.commentDetail = res
        this.comments = res.comments || []
        this.hotComment = res.hotComments || []
      })
    },
    // 分页切换
    handleCurrentChange(val) {
      val = val == 1 ? undefined : (val - 1) * this.pageSize
      this.gtePlayListComment(val)
    },
    // 设置表头顶部边框颜色
    headerClassName () {
      return 'header-class'
    },

  }
}

</script>
<style lang="scss" scoped>
.album {
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  &-left {
    padding: 40px;
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
          top: 40px;
          background-position: 0 -1285px;
        }
      }
      &-detail {
        margin-left: 240px;
        // 歌单标题
        &-title {
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
            margin-left: 10px;
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
    .album-comment {
      &-header {
        border-bottom: 2px solid #c20c0c;
        padding-bottom: 5px;
        h1 {
          font-weight: 400;
          display: inline-block;
          margin-right: 20px;
        }
      }
      &-content {
        margin: 20px 0;
        img {
          width: 50px;
          height: 50px;
        }
        .comment {
          margin-left: 62px;
          .submmit {
            display: block;
            margin-top: 8px;
            background-color: #297ac7;
            color: #fff;
            border-radius: 2px;
            padding: 4px 11px;
          }
          .submmit:hover {
            color: #297ac7;
          }

          .el-textarea::before,.el-textarea::after {
            content: ' ';
            position: absolute;
            right: 100%;
            width: 0;
            height: 0;
            border: solid transparent;
          }
          .el-textarea::before {
            top:14px;
            border-width:10px;
            border-right-color:#DCDFE6;
          }
          .el-textarea:hover:before {
            border-right-color:#C0C4CC;
          }
          .el-textarea::after {
            top:16px;
            border-width:8px;
            border-right-color:#fff;
          }
        }
      }

    }
  }
}
.icon {
  font-weight: 600;
  font-size: 20px;
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

// 分页选中背景颜色
.el-pagination.is-background {
  text-align: center;
  /deep/.el-pager li:not(.disabled).active {
    background-color: #c20c0c;
  }
}
</style>