import { getTopList } from '@/api/index'
const music = {
  state: {

  },
  mutations: {

  },
  actions: {
    // 获取发现音乐->排行榜
    getToplist({ commit }) {
      return new Promise((resovle, reject) => {
        getTopList().then(res => {
          resovle(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default music
