import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import music from './modules/music'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    music
  }
})

export default store
