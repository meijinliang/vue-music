<template>
  <div class="list-warpper">
    <ul v-for="item in commentList" :key="item.commentId">
      <li class="list-item clearfix">
        <img class="list-item-img fl pointer" :src="item.user.avatarUrl" alt="">
        <div class="content-wrapper">
          <div class="user">
            <span class="user-name link-span">{{ item.user.nickname }}</span>
            <img v-if="item.user.avatarDetail && item.user.avatarDetail.identityIconUrl" :src="item.user.avatarDetail.identityIconUrl" alt="">
            :
            <span class="pre-wrap">{{ item.content ? item.content : '该评论已经删除' }}</span>
          </div>
          <div v-for="subItem in item.beReplied" :key="subItem.beRepliedCommentId" class="reply">
            <span class="user-name link-span">{{ subItem.user.nickname }}</span>
            :
            <span class="pre-wrap">{{ subItem.content ? subItem.content : '该评论已经删除' }}</span>
          </div>
          <div class="zan">
            <a class="tc-6">{{ formaterTime(item.time, item.timeStr) }}</a>
            <a>
              <svg-icon icon-class="zan" />
              <span v-if="item.likedCount"> ({{ item.likedCount }}) </span>
              |
              <span>回复</span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
export default {
  name: '',
  props: {
    commentList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    formaterTime(time, timeStr) {
      const arr = timeStr.split('-')
      return arr.length === 3
        ? parseTime(time, '{y}年{m}月{d}日 {h}:{i}:{s}')
        : arr.length === 2
          ? parseTime(time, '{m}月{d}日 {h}:{i}:{s}')
          : timeStr
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  padding: 15px 0;
  border-top: 1px solid #DCDFE6;
  &-img {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }
  .content-wrapper {
    // height: 50px;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    margin-left: 62px;
    .user {
      line-height: 20px;
      img {
        width: 13px;
        height: 13px;
        margin: 0 5px;
        vertical-align: -2px;
      }
    }
    .reply {
      margin-top: 10px;
      padding: 8px 19px;
      border: 1px solid #dedede;
      background-color: #f4f4f4;
    }
    .zan {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .svg-icon {
        font-size: 15px;
      }
    }
  }
}
</style>
