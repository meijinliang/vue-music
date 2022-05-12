
// 展开收起
<template>
  <div :style="{height: isExpand !== null ? realHeight : '', maxHeight: isExpand === null ? realHeight : '', marginBottom: '48px'}">
    <p ref="textRef" class="shrink-wrap">{{ value }}</p>
    <span v-if="isExpand !== null" class="link-span fr" @click="handleExpand">
      {{ isExpand ? '收起' : '展开' }}
      <svg-icon style="color: #666" :icon-class="isExpand ? 'arrow-up' : 'arrow-down'" />
    </span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 299
    }
  },
  data() {
    return {
      isExpand: null,
      realHeight: ''
    }
  },
  watch: {
    value(val, oldVal) {
      console.log(val, oldVal)
      // prop传进子组件的数据如果是通过接口获取的话 需要通过监听获取到 因为dom渲染时prop传入的数据还未获取到
      this.$nextTick(() => {
        if (this.height < this.$refs.textRef.offsetHeight) {
        // 默认高度比实际高度低的话 展示展开收起按钮
          this.isExpand = false
        }
        this.realHeight = this.height + 'px'
        console.log(this.realHeight)
      })
    }
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand
      this.realHeight = this.isExpand ? 'auto' : this.height + 'px'
    }
  }
}
</script>

<style lang='scss' scoped>
.shrink-wrap {
  height: 100%;
  color: #666;
  white-space: pre-wrap;
  line-height: 23px;
  overflow: hidden;
}
</style>
