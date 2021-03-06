import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 帶入需要的參數
  mainPage({ userId }) {
    console.log("在user.js中" + { userId });

    // 這裡 return 的會是一個 Promise
    // return apiHelper.get(`/tweets/${userId}`, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // })
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}