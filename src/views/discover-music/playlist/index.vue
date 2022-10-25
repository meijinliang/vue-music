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
                  <div class="categories-left">
                    <ul>
                      <li v-for="(item, index) in catObj.categories" :key="index">
                        <i />
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                  <div class="categories-right" />
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
            <div class=" hover-underline pointer ellipsis" @click="gotoPlayDetail(item)">{{ item.name }}</div>
            <div class="hover-underline pointer">by</div>
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
  computed: {

  },
  created() {
    this.getInitData()
    this.getplayListData()
  },
  methods: {
    // 获取数据
    async getInitData() {
      const res = await getCatList()
      this.catObj.all = res.all
      this.catObj.categories = res.categories
      this.catObj.sub = res.sub
    },
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
    // 跳转歌单详情
    gotoPlayDetail(item) {
      this.$router.push(
        {
          path: '/playlist',
          query: {
            id: item.id,
            title: item.name
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
  .pagination {
    text-align: center;
    // /deep/.el-pager li:not(.disabled).active{
    //   background-color: #A2161B !important;
    // }
  }
}
.popover-class {
  padding: 0;
  &-title {
    padding: 30px 20px 15px 26px;
    border-bottom: 1px solid #ccc;
  }
  .categories-left {
    width: 96px;
    text-align: right;
    border-right: 1px solid #e6e6e6;
    li {
      display: inline-block;
      width: 71px;
      padding: 15px 0 0;
      text-align: center;
    }
  }
  .categories-right {
    width: calc(100% - 96px);
  }
}
</style>
