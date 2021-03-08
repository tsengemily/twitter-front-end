<template>
 <div class="page-container">
    <div class="row">
      <!-- 導覽列 -->
      <div class="left">

      </div>

      <!-- 主要內容 -->
      <div class="main">
        <UserHeader 
          :user-name="userName"
          :user-tweets-count="tweetsCount"
        />
        <ul class="nav">
          <li
            class="nav-item active"
          >
            跟隨者
          </li>
          <li
            class="nav-item"
          >
            <router-link 
              :to="{name: 'user-following', params: {id: userId}}" 
              class="link-btn"
            ></router-link>
            正在跟隨
          </li>
        </ul>
        <UserFollowerCard 
          v-for="follower in followers"
          :key="follower.followerId"
          :initial-follower="follower"
        />
      </div>
      <!-- 跟隨誰 -->
      <div class="right">
        <Top10User 
          :initialIsFollow="isFollow"
        />
      </div>  
    </div>  
  </div>
</template>

<script>
//查看使用者
const dummyData = {
  'user': {
    "id": 2,
    "account": "user1",
    "email": "user1@example.com",
    "name": "user1",
    "avatar": "http://placeimg.com/640/480/people",
    "introduction": "I am Jackson",
    "role": "user",
    "cover": "http://placeimg.com/640/480/nature",
    "createdAt": "2021-03-02T02:18:21.000Z",
    "updatedAt": "2021-03-02T02:18:21.000Z",
    "isSelf": true
  } 
}

//使用者發布過的所有tweets
const dummyTweets = [
  {
    "id": 1,
    "UserId": 2,
    "description": "Johnny1 is a handsome guy.",
    "createdAt": "2021-03-02T02:18:21.000Z",
    "updatedAt": "2021-03-02T02:18:21.000Z",
    "Replies": [
      {
        "id": 1,
        "UserId": 2,
        "TweetId": 1,
        "comment": "Reply 1",
        "createdAt": "2021-03-02T02:18:21.000Z",
        "updatedAt": "2021-03-02T02:18:21.000Z",
        "User": {
          "id": 2,
          "account": "user1",
          "email": "user1@example.com",
          "name": "user1",
          "avatar": "http://placeimg.com/640/480/people",
          "introduction": "I am Jackson",
          "role": "user",
          "cover": "http://placeimg.com/640/480/nature",
          "createdAt": "2021-03-02T02:18:21.000Z",
          "updatedAt": "2021-03-02T02:18:21.000Z"
        }
      }
    ],
    "Likes": [
      {
        "id": 2,
        "UserId": 2,
        "TweetId": 1,
        "createdAt": "2021-03-02T12:55:19.000Z",
        "updatedAt": "2021-03-02T12:55:19.000Z"
      }
    ],
    "User": {
      "id": 2,
      "account": "user1",
      "email": "user1@example.com",
      "name": "user1",
      "avatar": "http://placeimg.com/640/480/people",
      "introduction": "I am Jackson",
      "role": "user",
      "cover": "http://placeimg.com/640/480/nature",
      "createdAt": "2021-03-02T02:18:21.000Z",
      "updatedAt": "2021-03-02T02:18:21.000Z"
    },
    "isLikedbyMe": false,
    "isMyTweet": true
  }
]

//使用者所有的追蹤者
const dummyFollower = [
  {
    "followerId": 21,
    "followingId": 11,
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "follower": {
      "id": 21,
      "account": "user2",
      "email": "user2@example.com",
      "name": "Johnny2",
      "avatar": "http://placeimg.com/640/480/people",
      "introduction": "I am Johnny2",
      "role": "user",
      "cover": "http://placeimg.com/640/480/nature",
      "createdAt": "2021-03-05T04:26:13.000Z",
      "updatedAt": "2021-03-05T04:26:13.000Z"
    },
    "isFollowed": true,
    "isSelf": false
  }
]

import UserHeader from '../components/UserHeader'
import UserFollowerCard from '../components/UserFollowerCard'
import Top10User from '../components/Top10User'

export default {
  name: 'UserFollower',
  components: {
    UserHeader,
    UserFollowerCard,
    Top10User  
  },
  data() {
    return {
      userId: -1,
      userName: '',
      tweetsCount: 0,
      followers: []
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  methods: {
    fetchUser () {
      //get:/api/users/{id}
      //get:/api/users/{id}/tweets
      //get:api/users/{id}/followers
      this.userId = dummyData.user.id
      this.userName = dummyData.user.name
      this.tweetsCount = dummyTweets.length
      this.followers = dummyFollower
    }
  },
  beforeRouteUpdate (to, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    next()
  }
}
</script>

<style scoped>
 /* page共用 */
  .page-container {
    outline: 1px solid red;
    width: 960px;
    margin: 20px auto 0;
  }

  .row { 
    margin: 0;
  } 

  .left {
    /* outline: 5px solid green; */
    width: 25%;
  }

  .main {
    width: 50%;
    /* outline: 5px solid red; */
  }

  .right {
    /* outline: 5px solid blue; */
    width: 25%;
  }


/* 當頁 */
  .nav {
    border-bottom: 1px solid #e6ecf0;
  }

  .nav-item {
    position: relative;
    width: 110px;
    padding: 16px 0;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
    color: #657786;
    text-decoration: none;
    cursor: pointer;
  }

  .link-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .active {
    border-bottom: 2px solid #ff6600;
    color: #ff6600;
  }
</style>