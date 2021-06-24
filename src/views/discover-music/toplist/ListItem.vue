<template>
  <div>
    <div v-for="item in dataSource" :key="item.id" class="item">
      <div class="item-left">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="item-right">
        <span class="text-bold">{{ item.name }}</span>
        <span class="text-tip">{{ item.updateFrequency }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    dataSource: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped lang="scss">
item {
  display: flex;
  height: 40px;
  padding: 5px 10px;
  &-left {
    img {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
  }
  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>