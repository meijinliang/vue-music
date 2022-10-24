<template>
  <el-card shadow="never">
    <div class="img-container pr">
      <img :src="itemObj.picUrl" :alt="itemObj.name">
      <a class="cover-bg" href="javascript:void(0)" :title="itemObj.name" @click="handleClick(itemObj)" />
      <div class="bottom">
        <span class="headset p-bg" />
        <span class="nb">{{ itemObj.playCount }}万</span>
        <el-tooltip class="itemObj" effect="dark" content="播放" placement="bottom-end">
          <span class="play p-bg pointer" />
        </el-tooltip>
      </div>
    </div>
    <div class="title">
      <slot name="title" />
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    itemObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    handleClick(item) {
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
<style lang="scss" scoped>

.el-card {
  border: none;
  .img-container {
    width: 140px;
    height: 140px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;

    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-position: 0 0;
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 27px;
      display: flex;
      background: rgba(0, 0, 0, 0.3);
      color: #ccc;
      .headset {
        float: left;
        width: 14px;
        height: 11px;
        background-position: 0 -24px;
        margin: 8px 5px 9px 10px;
      }
      .nb {
        // font-size: 16px;
        // display: block;
        padding: 0 10px;
        line-height: 27px;
        flex: 1;
      }
      .play {
        width: 16px;
        height: 17px;
        margin: 5px 10px 0 0;
        background-position: 0 0;
      }
    }
  }
  &span {
    font-size: 14px;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .title {
    width: 140px;
  }
}
</style>
