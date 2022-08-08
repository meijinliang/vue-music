<template>
  <chart width="100%" height="100%" :option="chartOption" />
</template>

<script>
import Chart from '@/components/Echart'
export default {
  name: 'EchartDemo',
  components: { Chart },
  data() {
    return {
      chartOption: {}
    }
  },
  computed: {
  },
  created() {
    this.chartOption = this.setChartOption()
  },
  methods: {
    setChartOption(data) {
      const option = {
        title: [
          {
            text: 'Tangential Polar Bar Label Position (middle)'
          }
        ],
        polar: {
          radius: [30, '80%']
        },
        angleAxis: {
          max: 4,
          startAngle: 75
        },
        radiusAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd']
        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      }
      return option
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
