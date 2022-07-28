import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_sidebarElm: null, // _sidebarElm这个的作用是为了菜单栏如果能够收缩echart也能跟着自适应
      $_resizeHandler: null
    }
  },
  mounted() {
    this.initListener()
  },
  // 页面第一次进入的时候会触发该声明周期，会缓存下来 下次进入的时候会直接获取缓存中的
  activated() {
    if (!this.$_resizeHandler) {
      // 避免重复初始化
      this.initListener()
    }

    // when keep-alive chart activated, auto resize  keep-alive进入的时候echart已经激活的时候自适应
    this.resize()
  },
  beforeDestory() {
    this.destoryListener()
  },

  // keep-alive 页面退出的时候会触发该生命周期
  deactivated() {
    this.destoryListener()
  },
  methods: {
    $_sidebarResizeHandler(e) {
      if (e.properyName === 'width') {
        this.$_resizeHandler()
      }
    },
    // 初始化
    initListener() {
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)

      // sidebar-container类型按照事件情况选择
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler) // transitionend事件在css完成过渡后触发
    },

    // 销毁
    destoryListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null

      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    resize() {
      const { echart } = this
      echart && echart.resize()
    }
  }
}
