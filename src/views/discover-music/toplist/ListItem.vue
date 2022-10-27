<template>
  <div>
    <div
      v-for="item in dataSource"
      :key="item.id"
      class="item pointer"
      :class="{selected: currentListId === item.id}"
      @click="chooseList(item)"
    >
      <div class="item-left">
        <img
          :src="item.coverImgUrl"
          alt=""
        >
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
      type: Array,
      default: () => {
        return []
      }
    },
    currentListId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    chooseList(row) {
      this.$emit('choose', row)
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  height: 40px;
  padding: 10px 20px;
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
.selected {
  background: #e6e6e6;
}
</style>
