<template>
  <div class="basic-container play-list">
    <div class="list-title">
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-row type="flex">
            <span style="font-size: 24px">全部</span>
            <el-popover placement="bottom-start" popper-class="popover-class" width="700" trigger="click">
              <div>
                <el-row class="popover-class-title">
                  <el-button plain>全部风格</el-button>
                </el-row>
                <el-row>
                  <div class="categories">
                    <dl v-for="(item, index) in catObj.categories" :key="index">
                      <dt>
                        <!-- <i class="categories-icon" /> -->
                        {{ item }}
                      </dt>
                      <dd :class="{mb24: Object.keys(catObj.categories).length - 1 == index}">
                        <span v-for="(subItem, subIndex) in catObj.sub[index]" :key="subIndex">
                          <a class="hover-underline" :class="$route.query.cat === subItem.name ? 'isSelected' : ''" @click="choiceCategory(subItem)">{{ subItem.name }}</a>
                          <span class="line">|</span>
                        </span>
                      </dd>
                    </dl>
                  </div>
                </el-row>
              </div>
              <el-button slot="reference" class="ml20" plain>
                <span>选择分类</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </el-popover>
          </el-row>
        </el-col>

        <el-col align="right">
          <el-button size="mini" style="backgroundColor: #b70a0b; color: #fff; border-radius: 5px">热门</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="list-container">
      <div v-for="item in playListData" :key="item.id" class="list-item">
        <play-list-item :item-obj="item">
          <template slot="title">
            <div class="hover-underline ellipsis" @click="gotoPlayDetail(item)">{{ item.name }}</div>
            <div class="play-creator">
              <span>by </span>
              <a class="hover-underline ellipsis" :title="item.creator.nickname">{{ item.creator.nickname }}</a>
              <img
                v-if="item.creator.avatarDetail"
                class="inline-block"
                :src="item.creator.avatarDetail.identityIconUrl"
                alt=""
              >
            </div>
          </template>
        </play-list-item>
      </div>
      <el-pagination
        class="pagination"
        small
        background
        layout="prev, pager, next"
        :page-size="pageParams.pageSize"
        :current-page.sync="pageParams.currentPage"
        :total="pageParams.total"
        prev-text="< 上一页"
        next-text="下一页 >"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import PlayListItem from '@/views/components/PlayListItem'
import { getCatList, topPlayList } from '@/api'
export default {
  name: '',
  components: { PlayListItem },
  data() {
    return {
      // 选择分类的数据
      catObj: {
        all: {},
        categories: {},
        sub: {}
      },
      // 歌单数据
      playListData: [],
      pageParams: {
        currentPage: 1,
        pageSize: 50,
        total: 0
      }
    }
  },
  watch: {
    '$route.query'(val, oldVal) {
      // 监听$route.query 点击同一个的话会出现控制台报错
      let isChange = false
      for (const k in val) {
        if (val[k] !== oldVal[k]) {
          isChange = true
        }
      }
      if (isChange) {
        // this.getplayListData(val)
        this.$router.go(0)
      }
      console.log(isChange)
    }
  },
  created() {
    this.getInitData()
    this.getplayListData()
  },
  methods: {
    // 获取分类数据
    async getInitData() {
      // eslint-disable-next-line no-debugger
      debugger
      const res = await getCatList()
      this.catObj.all = res.all
      this.catObj.categories = res.categories
      for (const k in res.categories) {
        this.catObj.sub[k] = res.sub.filter(x => x.category === Number(k))
      }
    },
    // 获取歌单数据
    getplayListData(params) {
      topPlayList(params).then(res => {
        this.pageParams.total = res.total
        this.playListData = res.playlists.map(x => {
          return {
            ...x,
            picUrl: x.coverImgUrl,
            playCount: (x.playCount / 10000).toFixed(1)
          }
        })
      })
    },
    handleCurrentChange(val) {
      const params = {
        offset: val * 50
      }
      this.getplayListData(params)
    },
    // 选择分类
    choiceCategory(item) {
      this.$router.push({
        name: 'discover-playlist',
        query: {
          cat: item.name,
          order: 'hot'
        }
      })
    },
    // 跳转歌单详情
    gotoPlayDetail(item) {
      this.$router.push(
        {
          name: 'playlist',
          query: {
            id: item.id
          },
          params: {
            pageTitle: item.name
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
.play-list {
  border: 1px solid #ccc;
  border-top: 0px;
  padding: 40px;
  padding-bottom: 100px;
  .list-title {
    padding-bottom: 8px;
    border-bottom: 2px solid #c20c0c;
  }
  .list-item {
    width: 20%;
    display: inline-block;
  }
  .play-creator {
    span {
      color: #999;
      vertical-align: bottom;
    }
    a {
      display: inline-block;
      max-width: 90px;
      vertical-align: middle;
      margin-right: 3px;
    }
    img {
      width: 13px;
      height: 13px;
      vertical-align: middle;
    }
  }
  .pagination {
    text-align: center;
  }
}
.popover-class {
  padding: 0;
  &-title {
    padding: 30px 20px 15px 26px;
    border-bottom: 1px solid #ccc;
  }
  .categories {
    &-icon {
      display: inline-block;
      width: 23px;
      height: 23px;
      background-position: -20px -735px;
    }
    dt {
      float: left;
      display: inline;
      text-align: center;
      width: 70px;
      margin: 0 -100px 0 26px;
      padding-top: 15px;
      border-right: 1px solid #e6e6e6;
      font-weight: bold;
    }
    dd {
      margin-left: 96px;
      padding: 16px 15px 0 15px;
      border-left: 1px solid #e6e6e6;
      line-height: 24px;
      font-size: 12px;
      .line {
        margin: 0 8px 0 10px;
        color: #d8d8d8;
      }
    }
    .isSelected {
      background: #a7a7a7;
      color: #fff;
      padding: 2px 6px;
    }
  }
}
</style>
