<template>
  <div class="page-container">
    <div class="row">
      <!-- 導覽列 -->
      <div class="left">

      </div>

      <!-- 主要內容 -->
      <div class="main">
        <UserHeader 
          :user-name="user.name"
          :user-tweets-count="tweetsCount"
        />
        <UserProfileCard 
          :initial-user="user"
          :following-count="followingCount"
          :follower-count="followerCount"
          :isCurrentUser="currentUser"
        />
        <ul class="nav">
          <li
            class="nav-item"
            :class="{active: isPostActive}"
            @click="postActive"
          >
            推文
          </li>
          <li
            class="nav-item"
            :class="{active: isPostAndRecommentActive}"
            @click="postAndRecommentActive"
          >
            推文與回覆
          </li>
          <li
            class="nav-item"
            :class="{active: isLikeActive}"
            @click="likeActive"
          >
            喜歡的內容
          </li>
        </ul>
        <PostCard 
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
        />
      </div>
      <!-- 跟隨誰 -->
      <div class="right">
        <div class="top-users-container">
          <h1 class="top-users-title">跟隨誰</h1>
            <Top10User 
              v-for="topUser in topUsers"
              :key="topUser.id"
              :initial-top-user="topUser"
            />
          <div class="top-users-more">
            顯示更多
          </div> 
        </div>
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
    "isSelf": true,
    "isFollowed": false 
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

//使用者所有正在追蹤的人
const dummyFollowing = [
  {
    "followerId": 11,
    "followingId": 21,
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "following": {
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

//top10users
const dummyTopUser = [
  {
    "id": 1,
    "account": "user1",
    "email": "user1@example.com",
    "password": "$2a$10$P/pvqRxhgVuoIC6fG2yHOunYnFnkhBOIR6kdi1LWhLM96kF9/rtHK",
    "name": "Johnny1",
    "avatar": "http://placeimg.com/640/480/people",
    "introduction": "I am Johnny4",
    "role": "user",
    "cover": "http://placeimg.com/640/480/nature",
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "Followers": [],
    "followerCount": 1,
    "isFollowed": false
  },
  {
    "id": 2,
    "account": "user2",
    "email": "user2@example.com",
    "password": "$2a$10$P/pvqRxhgVuoIC6fG2yHOunYnFnkhBOIR6kdi1LWhLM96kF9/rtHK",
    "name": "Johnny2",
    "avatar": "http://placeimg.com/640/480/people",
    "introduction": "I am Johnny4",
    "role": "user",
    "cover": "http://placeimg.com/640/480/nature",
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "Followers": [],
    "followerCount": 2,
    "isFollowed": false
  },
  {
    "id": 3,
    "account": "user3",
    "email": "user4@example.com",
    "password": "$2a$10$P/pvqRxhgVuoIC6fG2yHOunYnFnkhBOIR6kdi1LWhLM96kF9/rtHK",
    "name": "Johnny3",
    "avatar": "http://placeimg.com/640/480/people",
    "introduction": "I am Johnny4",
    "role": "user",
    "cover": "http://placeimg.com/640/480/nature",
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "Followers": [],
    "followerCount": 3,
    "isFollowed": false
  },
  {
    "id": 4,
    "account": "user4",
    "email": "user4@example.com",
    "password": "$2a$10$P/pvqRxhgVuoIC6fG2yHOunYnFnkhBOIR6kdi1LWhLM96kF9/rtHK",
    "name": "Johnny4",
    "avatar": "http://placeimg.com/640/480/people",
    "introduction": "I am Johnny4",
    "role": "user",
    "cover": "http://placeimg.com/640/480/nature",
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "Followers": [],
    "followerCount": 4,
    "isFollowed": false
  },
  {
    "id": 5,
    "account": "user5",
    "email": "user4@example.com",
    "password": "$2a$10$P/pvqRxhgVuoIC6fG2yHOunYnFnkhBOIR6kdi1LWhLM96kF9/rtHK",
    "name": "Johnny5",
    "avatar": "http://placeimg.com/640/480/people",
    "introduction": "I am Johnny4",
    "role": "user",
    "cover": "http://placeimg.com/640/480/nature",
    "createdAt": "2021-03-05T04:26:13.000Z",
    "updatedAt": "2021-03-05T04:26:13.000Z",
    "Followers": [],
    "followerCount": 5,
    "isFollowed": false
  }
]



import UserHeader from '../components/UserHeader'
import UserProfileCard from '../components/UserProfileCard'
import PostCard from '../components/PostCard'
import Top10User from '../components/Top10User'

export default {
  name: 'User',
  components: {
    UserHeader,
    UserProfileCard,
    PostCard,
    Top10User
  },
  data() {
    return {
      user: {
        id: -1,
        name: '',
        email: '',
        account: '',
        cover: '',
        avatar: '',
        introduction: ''
      },
      tweetsCount: 0,
      followingCount: 0,
      followerCount: 0,
      currentUser: false,
      tweets: [],
      isPostActive: true,
      isPostAndRecommentActive: false,
      isLikeActive: false,
      topUsers: []
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchTopUsers()
  },
  methods: {
    fetchUser () {
      //get:/api/users/{id}
      //get:/api/users/{id}/tweets
      //get:/api/users/{id}/followings
      //get:/api/users/{id}/followers
      const { user } = dummyData
      const { id, name, email, account, cover, avatar, introduction, isSelf } = user
      this.user = {
        ...this.user,
        id,
        name,
        email,
        account,
        cover,
        avatar,
        introduction
      }
      this.tweetsCount = dummyTweets.length
      this.followingCount = dummyFollowing.length
      this.followerCount = dummyFollower.length
      this.currentUser = isSelf,
      this.tweets = dummyTweets
    },
    fetchTopUsers () {
      //get:/api/users/top
      this.topUsers = dummyTopUser
    },
     postActive () {
      this.isPostActive = true
      this.isPostAndRecommentActive = false
      this.isLikeActive = false
      //向api發送請求 推文
      //get:/api/users/{id}/tweets
    },
     postAndRecommentActive () {
      this.isPostActive = false
      this.isPostAndRecommentActive = true
      this.isLikeActive = false
      //向api發送請求 推文與回覆
      //get:/api/users/{id}/replied_tweets
    },
    likeActive () {
      this.isPostActive = false
      this.isPostAndRecommentActive = false
      this.isLikeActive = true
      //向api發送請求 喜歡的內容
      //get:/api/users/{id}/likes
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
    position: relative;
    width: 25%;
  }

  .top-users-container {
    position: absolute;
    top: 15px;
    left: 20px;
    background-color: #f5f8fa;
    border-radius: 14px;
    width: 220px;
  }

  .top-users-title {
    padding: 5px 15px;
    font-weight: 700;
    font-size: 16px;
    line-height: 35px;
    border-bottom: 1px solid #e6ecf0;
  }

  .top-users-more {
    padding: 5px 15px;
    font-size: 13px;
    line-height: 30px;
    color: #ff6600;
  }


/* 當頁 */
  .nav {
    border-bottom: 1px solid #e6ecf0;
  }

  .nav-item {
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

  .active {
    border-bottom: 2px solid #ff6600;
    color: #ff6600;
  }
</style>