<template>
  <div>
    <!-- <svg-icon icon-class="logout" /> -->
    <span v-time.binf>{{ number }}</span>
    <input type="file" @change="handleChange">
  </div>
</template>

<script>
export default {
  name: 'djRadio',
  data () {
    return {
      number: 413576
    }
  },
  methods: {
    handleChange(e) {
      console.log(e.target.files);
    }
  }
}
</script>

<style scoped lang="scss">

</style>