<template>
  <div :class="className" :style="{width:width, height: height}" />
</template>

<script>
import * as echarts from 'echarts'
import mixin from './mixins'
export default {
  name: 'Chart',
  mixins: [mixin],
  props: {
    className: {
      type: String,
      default: 'echart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    option: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      echart: null
    }
  },
  watch: {
    option: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChartt()
  },
  beforeDestroy() {
    if (!this.echart) {
      return
    }

    // 销毁echart实例
    this.echart.dispose()
    this.echart = null
  },
  methods: {
    initChartt() {
      // echarts.registerTheme('custom', theme) 注册自定义主题
      // this.chart = echarts.init(this.$el, 'custom')
      console.log(this.$el)
      this.echart = echarts.init(this.$el)
      this.setOptions(this.option, true)
      // 点击事件
      this.chart.on('click', params => {
        this.$emit('chart-click', params)
      })
      // 空白处点击事件
      this.chart.getZr().on('click', event => {
        if (!event.target) {
          this.$emit('empty-click', event)
        }
      })
      // 空白处点击事件
      this.chart.on('updateAxisPointer', event => {
        this.$emit('update-axis-pointer', event)
      })
    },
    setOptions(options) {
      this.echart.setOptions(options, true) // 第二个参数option是否合并 ，默认合并， 设置true option 不合并
      this.$nextTick(() => {
        this.echart.resize()
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
