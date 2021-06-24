<template>
  <div class="basic-container toplist">
    <div class="toplist-left">
      <div class="g-sd">
        <div>
          <h2 class="g-sd-1" @click="handleClick">云音乐特色榜</h2>
          <!-- <div v-for="item in musicFeaturelist" :key="item.id" class="g-sd-item">
            <div class="g-sd-item-left">
              <img :src="item.coverImgUrl" alt="">
            </div>
            <div class="g-sd-item-right">
              <span class="text-bold">{{ item.name }}</span>
              <span class="text-tip">{{ item.updateFrequency }}</span>
            </div>
          </div> -->
          <list-item :data-source="musicFeaturelist"/>
        </div>
        <div>
          <h2>全球媒体榜</h2>
          <list-item :data-source="globalMediaList"/>
        </div>
      </div>
    </div>
    <div class="toplist-right">

    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  name: 'DiscoverToplist',
  components: {
    ListItem
  },
  data () {
    return {
      topList: []
    }
  },
  computed: {
    musicFeaturelist () {
      return this.topList.slice(0, 4).map(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return {...item}
      })
    },
    globalMediaList() {
      return this.topList.slice(4).map(item => {
        item.coverImgUrl = item.coverImgUrl + '?param40y40'
        return {...item}
      })
    }
  },
  async created () {
    await this.getTopList()
  },
  methods: {
    // 发现音乐-排行榜-各榜单列表
    async getTopList() {
      const res = await this.$store.dispatch('getToplist')
      console.log(res);
      this.topList = res.list || []
    },
    handleClick() {
      console.log(this.musicFeaturelist);
      console.log(this.globalMediaList);
    }
  }
}

</script>
<style lang="scss" scoped>
.toplist {
  display: flex;
  &-left {
    width: 240px;
    border: 1px solid #ccc;
    .g-sd {
      margin-top: 20px;
      &-1 {
        padding: 0 10px 12px 15px;
      }
      
    }
  }
  &-right {
    flex: 1;
  }
}
</style>