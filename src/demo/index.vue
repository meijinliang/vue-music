<template>
  <div class="basic-container">
    <el-card>
      <template #header>calendar日历组件</template>
      <calendar />
    </el-card>
    <el-card header="echart Demo">
      <div class="echart-wrapper">
        <echart />
      </div>
    </el-card>
    <el-card header="防抖节流" style="padding-bottom: 200px">
      <el-input v-model="debounceValue" @input="handleInput" />
    </el-card>
    <!-- <audio src="/" autoplay controls /> -->
    <!-- <video src="/" controls /> -->
  </div>
</template>

<script>
import Calendar from './calendar'
import Echart from './echarts'
// import myUtils from '@/utils/myUtils'
import myUtils from '../utils/myutils'
export default {
  name: 'Demo',
  components: {
    Calendar, Echart
  },
  data() {
    return {
      debounceValue: ''
    }
  },
  computed: {
  },
  created() {
    for (const func in myUtils) {
      // console.log(func, myUtils[func])
      myUtils[func]()
    }
  },
  methods: {
    // handleInput: myUtils.debounce(function(e) {
    //   // console.log(this)
    // }, 1000),
    handleInput: myUtils.debounce2(function(e) { // debounce2实际只会执行一次事件执行的函数实际是debounce2返回的函数
      console.log(e)
    }, 1000, true)
  }
}
</script>

<style lang='scss' scoped>
.echart-wrapper {
  width: 600px;
  height: 500px;
}
</style>
