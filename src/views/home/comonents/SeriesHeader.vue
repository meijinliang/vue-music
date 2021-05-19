<template>
  <div class="item-header">
    <el-row>
      <el-col :span="4">
        <span class="header-title">{{title}}</span>
      </el-col>
      <el-col :span="16">
        <div ref="items" class="items-style">
          <slot name="items"></slot>
        </div>
      </el-col>
      <el-col :span="4" align="right">
        <div class="more pointer">更多</div>
      </el-col>
    </el-row>
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
   .header-title {
     font-size: 20px;
   }
   .more {
    height: 26px;
    line-height: 26px;
    padding-right: 20px;
   }
}
</style>