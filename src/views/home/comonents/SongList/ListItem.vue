<template>
  <div class="item-box">
    <div v-for="item in detailList" :key="item.id">
      <div class="item-header">
        <div>
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <ul>
        <li v-for="(subItem, index) in item.tracks" :key="subItem.id" class="song-item">
          <span class="order">{{ index + 1 }}</span>
          <span class="song-name ellipsis pointer hover-underline">{{ subItem.name }}</span>
        </li>
        <li class="check-more">查看更多></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playListDetail } from '@/api/music'
export default {
  name: 'Listitem',
  props: {
    topList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      detailList: []
    }
  },
  created() {
    this.getListDetail()
  },
  methods: {
    getListDetail() {
      return Promise.all(
        this.topList.map(item => {
          return playListDetail(item.id)
        })
      ).then(res => {
        res.forEach(item => {
          item.playlist.tracks = item.playlist.tracks.slice(0, 10)
          this.detailList.push(item.playlist)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.item-box {
  display: flex;
  margin-top: 20px;
  > div {
    flex: 1;
    border: 1px solid #d3d3d3;
  }
  .item-header {
    padding: 20px;
    display: flex;
    > div {
      flex: 1;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        margin-top: 10px;
      }
    }
  }
  .song-item {
    padding: 0 10px;
    display: flex;
    height: 32px;
    line-height: 32px;
    .order {
      padding: 0 10px;
      font-size: 16px;
      width: 20px;
      text-align: center;
    }
    .song-name {
      width: 170px;
      flex: 1;
      // overflow: hidden;
    }
  }
  .check-more {
    height: 32px;
    line-height: 32px;
    text-align: right;
    padding: 0 30px;
  }
  li:nth-child(odd) {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
