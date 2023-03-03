<template>
  <a
    class="hover-underline"
    :title="title"
    @click="goto"
  >{{ title }}</a>
</template>

<script>
export default {
  name: 'LinkTo',
  props: {
    type: {
      // song - 歌曲，play - 歌单，user - 用户
      type: String,
      default: 'song'
    },
    data: {
      // 路由跳转参数
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    goto() {
      this.$router.push({
        name: this.type,
        ...this.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
