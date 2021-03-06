// ./src/apis/authorization.js
import { apiHelper } from '../utils/helpers'

export default {
  // 帶入需要的參數
  signIn({ account, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/users/login', {
      account,
      password
    })
  },
  Admin({ account, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/users/login', {
      account,
      password
    })
  },
}