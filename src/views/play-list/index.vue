<template>
  <div class="album">
    <el-row>
      <!-- 左侧歌单详情 -->
      <el-col v-if="JSON.stringify(albumDetail) != '{}'" :span="18" class="album-left">
        <div class="cnt">
          <div class="cnt-img">
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
                <img class="inline-block" :src="albumDetail.creator.avatarDetail.identityIconUrl" alt="">
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
              描述：{{ albumDetail.description }}
              <!-- <span>描述：</span>
              <span style="white-space: pre-wrap;">{{ albumDetail.description }}</span> -->
              <!-- <span v-html="albumDetail.description" style="white-space: pre-wrap;"></span> -->
            </p>
          </div>
        </div>
        <div class="album-list">

        </div>
        <div class="album-comment">

        </div>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { playListDetail } from '@/api/index'
import { parseTime } from '@/utils/index'
export default {
  data () {
    return {
      albumDetail: {}
    }
  },
  created () {
    this.getAlbumDetail()
  },
  methods: {
    parseTime,
    getAlbumDetail () {
      playListDetail(this.$route.query.id).then(res => {
        this.albumDetail = res.playlist
      })
    }
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
  }
}
.icon {
  font-weight: 600;
  font-size: 20px;
  vertical-align: -5px;
}
</style>