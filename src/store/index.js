import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      right: 0, //权限管理管理
      islogin: false,
      searchBy : {
        isOpen : false, //true为通过名字查询，false为通过type查询
        type : '', 
      }, 
  },
  mutations: {
    changeRight(state){
      state.right = 1;
    },
    login(state){
      state.islogin = true;
    },
    setSearchBy(state,obj){
      state.searchBy.isOpen = obj.isOpen;
      state.searchBy.type = obj.type;
    }
  },
  actions: {
  },
  modules: {
  }
})
