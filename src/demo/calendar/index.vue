<template>
  <calendar v-model="today">
    <!-- 具名插槽的用法 父组件中使用 slot="header" 缩写#header 作用域插槽获取的值是slot那边绑定传递过来的 取得值要和绑定的要一致-->
    <!-- <template #header="{headerData}">
          {{ headerData }}
          日历自定义头部
        </template> -->
    <!-- <template #day>
      <span>自定义内容</span>
    </template> -->
  </calendar>
</template>

<script>
import Calendar from '@/components/Calendar'

export default {
  name: 'CalendarDemo',
  components: { Calendar },
  data() {
    return {
      today: this.$moment(new Date()).format('YYYY-MM-DD')
    }
  },
  computed: {
  },
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
