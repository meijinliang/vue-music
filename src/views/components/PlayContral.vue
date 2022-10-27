<template>
  <div class="opration-btn">
    <span class="play mr8">
      <a
        title="播放"
        @click="handleOprate('play')"
      >
        <svg-icon
          class="icon"
          icon-class="play"
        />
        播放
      </a>
      <a
        class="plus"
        title="添加到播放列表"
        @click="handleOprate('plus')"
      >
        +
      </a>
    </span>
    <span class="button mr8">
      <a @click="handleOprate('collecte')">
        <svg-icon
          class="icon"
          icon-class="file"
        />
        ({{ data.subscribedCount }})
      </a>
    </span>
    <span class="button mr8">
      <a @click="handleOprate('share')">
        <svg-icon
          class="icon"
          icon-class="share"
        />
        ({{ data.shareCount }})
      </a>
    </span>
    <span class="button mr8">
      <a @click="handleOprate('download')">
        <svg-icon
          class="icon"
          icon-class="download"
        />
        下载
      </a>
    </span>
    <span class="button mr8">
      <a @click="handleOprate('message')">
        <svg-icon
          class="icon"
          icon-class="chat-dot-square"
        />
        ({{ data.commentCount }})
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PlayContral',
  props: {
    type: {
      // play - 歌单 song - 歌曲
      type: String,
      default: 'play'
    },
    data: {
      // 传递歌单歌曲的信息
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    handleOprate(type) {
      switch (type) {
        // 播放
        case 'play':
          break
        // 添加到播放列表
        case 'plus':
          break
        // 收藏
        case 'collecte':
          break
        // 分享
        case 'share':
          break
        // 下载
        case 'download':
          break
        // 评论
        case 'message':
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.opration-btn {
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
.icon {
  font-weight: 600;
  font-size: 16px;
  vertical-align: -5px;
}
</style>
