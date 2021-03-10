import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 帶入需要的參數
  mainPage() {
    // console.log("在user.js中" + { userId });

    // 這裡 return 的會是一個 Promise
    // return apiHelper.get(`/tweets/${userId}`, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // })
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  ReplyList({ tweetId }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  AdminMain() {
    return apiHelper.get(`admin/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  AdminUsers() {
    return apiHelper.get(`/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  updateUserInfo({ userId, account, name, email, password, checkPassword }) {
    return apiHelper.put(
      `/users/${userId}/account`,
      { account, email, name, password, checkPassword },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
  },
  userSetUp({ account, email, password, checkPassword, name }) {
    return apiHelper.post(`/users`, {
      account,
      email,
      password,
      checkPassword,
      name,
    })
  },
  // userSetUp({ formData }) {
  //   return apiHelper.post(`/users`, { formData })
  // }
  tweet({ description }) {
    return apiHelper.post(
      `/tweets`,
      { description },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
  },
  reply({ tweetId, comment }) {
    return apiHelper.post(
      `/tweets/${tweetId}/replies`,
      { comment },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  deleteLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getUsersTop() {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  addFollow({ id }) {
    return apiHelper.post(
      '/followships',
      { id },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
  },
  deleteFollow({ userId }) {
    return apiHelper.delete(`/followships/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  editProfile({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  deleteTweet({ TweetId }) {
    return apiHelper.delete(`/admin/tweets/${TweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
}
