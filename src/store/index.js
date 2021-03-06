import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 共用data的概念
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      role: '',
      // isAdmin: false
    },
    isAuthenticated: false
  },
  // 用來修改 state 的方法，methods
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    }
  },
  actions: {
  },
  modules: {
  }
})
