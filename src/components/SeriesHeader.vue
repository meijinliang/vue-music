<template>
  <div class="item-header v-bg">
    <div class="left">
      <span class="header-title ">{{ title }}</span>
    </div>
    <div ref="items" class="center">
      <slot name="items" />
    </div>
    <div class="more pointer v-bg">更多</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      typeof: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.item-header {
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c20c0c;
  background-position: -225px -156px;
  display: flex;
  .left {
    width: 100px;
    .header-title {
      font-size: 20px;
    }
  }
  .center {
    flex: 1;
  }
  .more {
    width: 90px;
    height: 26px;
    text-align: right;
    line-height: 26px;
    padding-right: 20px;
    background-position: 95px -234px;
  }
}
</style>
