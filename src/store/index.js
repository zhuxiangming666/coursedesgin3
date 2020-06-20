import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      right: 0, //全新管理
      islogin: false,
  },
  mutations: {
    changeRight(state){
      state.right = 1;
    },
    login(state){
      state.islogin = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
