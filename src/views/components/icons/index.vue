<template>
  <div class="icons-container">
    <el-tabs v-model="active" type="border-card">
      <el-tab-pane label="Svg Icon" name="1">
        <div v-for="item of svgIcons" :key="item">
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconCode(item) }}</div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="Images" name="2">
        <div v-for="item of images" :key="item">
          <div class="icon-item image-item">
            <el-image :src="generateImageUrl(item)" fit="contain" />
            <span>{{ item }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Map Icons" name="3">
        <div v-for="item of mapIcons" :key="item">
          <div class="icon-item">
            <el-image :src="generateMapIconsUrl(item)" fit="contain" />
            <span>{{ item }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons" name="4">
        <div v-for="item of elementIcons" :key="item">
          <el-tooltip placement="top">
            <div slot="content">{{ generateElementIconCode(item) }}</div>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import svgIcons from './svg-icons'
export default {
  name:'',
  props: {

  },
  data() {
    return {
      svgIcons,
      active: '1',
    }
  },

  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    // generateElementIconCode(symbol) {
    //   return `<i class="el-icon-${symbol}" />`
    // },
    // generateImageUrl(symbol) {
    //   return require('../../../assets/image/' + symbol)
    // },
  }
};
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 90px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    background-color: rgba(41, 41, 41, 0.3);

    &.image-item {
      height: 135px;
      width: 150px;

      ::v-deep {
        .el-image {
          width: 80px;
          height: 80px;
        }
      }
    }
  }

  span {
    display: block;
    font-size: 13px;
    margin-top: 10px;
    word-wrap: break-word;
  }

  .disabled {
    pointer-events: none;
  }
}

::v-deep {
  .el-image {
    width: 30px;
    height: 30px;
  }
}
</style>
