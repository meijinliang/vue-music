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
  </div>
</template>

<script>
import Calendar from './calendar'
import Echart from './echarts'
export default {
  name: 'Demo',
  components: {
    Calendar, Echart
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.echart-wrapper {
  width: 600px;
  height: 500px;
}
</style>
