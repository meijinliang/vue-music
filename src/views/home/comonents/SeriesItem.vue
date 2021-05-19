<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col v-for="item in recommendedSongList" :key="item.id">
        <el-card >
          <img :src="item.picUrl" alt="">
          <span>{{item.name}}</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    recommendedSongList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    console.log(this.recommendedSongList);
  }
}
</script>
<style lang="scss" scoped>

</style>