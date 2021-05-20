<template>
  <div class="new-disc">
    <SeriesHeader title="新碟上架" />
  </div>
</template>

<script>
// import { getNewAblum } from '@/api/index'
import SeriesHeader from '../../../../components/SeriesHeader'
export default {
  name:  'newDisc',
  components: { SeriesHeader },
  data () {
    return {

    }
  },
  methods: {
    getNewAblum() {

    }
  }
}
</script>

<style scoped lang="scss">

</style>