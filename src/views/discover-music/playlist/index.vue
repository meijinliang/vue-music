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
                  <el-col :span="6">
                    <ul>
                      <li>语种</li>
                      <li>风格</li>
                      <li>场景</li>
                      <li>情感</li>
                    </ul>
                  </el-col>
                  <el-col :span="18"></el-col>
                </el-row>
              </div>
              <el-button slot="reference" class="ml20" plain>
                <span>选择分类</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
            </el-popover>
          </el-row>
        </el-col>
        <el-col align="right">
          <el-button>热门</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="list-container">
      <series-item />
    </div>
  </div>
</template>

<script>
import SeriesItem from '@/views/home/comonents/HotRecommend/SeriesItem'
export default {
  name: '',
  data () {
    return {
      toplistData: []
    }
  },
  components: { SeriesItem },
  computed: {

  },
  created () {
    this.arrSort()
  },
  methods: {
    // 冒泡排序
    arrSort (arr) {
      arr = [2, 34, 5, 1, 9, 334] //arr.length = 6
      for (let i = 0; i < arr.length - 1; i++) { // 这里少遍历一次是因为最后一次不用循环了
        for (let j = 0; j < arr.length - i; j++) {
          if (arr[j] < arr[j - 1]) { // 如果右边小于左边，那么交换位置
            let temp = arr[j]
            arr[j] = arr[j - 1]
            arr[j - 1] = temp
          }

        }

      }
    }
  }
}
</script>

<style lang="scss">
.play-list {
  border: 1px solid #ccc;
  border-top: 0px;
  padding: 40px;
  .list-title {
    padding-bottom: 8px;
    border-bottom: 2px solid #c20c0c;
    // .right .el-button {
    //   background-color: #b70a0b;
    //   color: #fff;
    // }
  }
}
.popover-class {
  padding: 0;
  &-title {
    padding: 30px 20px 15px 26px;
    border-bottom: 1px solid #ccc;
  }
}
</style>