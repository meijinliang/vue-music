<template>
  <div class="album-comment">
    <div class="album-comment-header">
      <h1>评论</h1>
      <span class="tc-6">共{{ detail.total }}条评论</span>
    </div>
    <div class="album-comment-content clearfix">
      <span class="fl">
        <img :src="avatarUrl" alt="">
      </span>
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
      <h3 v-if="detail.hotComments.length">精彩评论</h3>
      <comment-item v-if="detail.hotComments.length" :comment-list="detail.hotComments" />
      <h3 v-if="detail.comments.length && currentPage == 1">最新评论({{ detail.total }})</h3>
      <comment-item :comment-list="detail.comments" />
    </div>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :total="detail.total"
      prev-text="< 上一页"
      next-text="下一页 >"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import CommentItem from './commentItem'
export default {
  name: '',
  components: { CommentItem },
  props: {
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // 分页条数
      pageSize: 20,
      currentPage: 1
    }
  },
  computed: {
    avatarUrl() {
      return this.$store.state.user.profile?.avatarUrl || '../../../assets/img/default_avatar.jpg'
    }
  },
  created() {
    // console.log(this.detail)
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('page', val)
    }
  }
}
</script>

<style lang='scss' scoped>
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
</style>
