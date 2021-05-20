<template>
  <div>
    <el-card>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'listitem',
  props: {
    topList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    console.log(this.topList);
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped lang="scss">

</style>