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
  },
  ReplyList({ tweetId }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    // TODO: ${tweetId}怎麼解構啊?
  },
  AdminMain() {
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  AdminUsers() {
    return apiHelper.get(`/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUserInfo({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  userSetUp({ account, email, password, checkPassword, name }) {
    return apiHelper.post(`/users`, { account, email, password, checkPassword, name })
  },
  // userSetUp({ formData }) {
  //   return apiHelper.post(`/users`, { formData })
  // }
  tweet({ description }) {
    return apiHelper.post(`/tweets`, { description }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}