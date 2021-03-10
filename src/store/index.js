import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // 共用data的概念
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      role: '',
      avatar: '',
      // isAdmin: false
    },
    isAuthenticated: false,
  },
  // 用來修改 state 的方法，methods
  // commit 來發動 mutations
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser,
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
  },
  // 透過API請求資料
  // dispatch 發動 actions
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const Id = localStorage.getItem('userId')
        const { userId } = { userId: Id } /* TODO:解構付值 */
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const { data } = await usersAPI.get({ userId })
        let { id, name, email, role, avatar } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          role,
          avatar,
        })

        return true
      } catch (error) {
        console.error(error.message)
        return false
      }
    },
  },
  modules: {},
})
