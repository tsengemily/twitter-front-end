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
        <Top10User 
          :initialIsFollow="isFollow"
        />
      </div>  
    </div>  
  </div>
</template>



<script>
// const dummyUser = {
//   currentUser: {
//     id: 2,
//     name: "user1",
//   }
// }

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

//

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
      isLiked: false
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
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
     postActive () {
      this.isPostActive = true
      this.isPostAndRecommentActive = false
      this.isLikeActive = false
      //向api發送請求 推文
    },
     postAndRecommentActive () {
      this.isPostActive = false
      this.isPostAndRecommentActive = true
      this.isLikeActive = false
      //向api發送請求 推文與回覆
    },
    likeActive () {
      this.isPostActive = false
      this.isPostAndRecommentActive = false
      this.isLikeActive = true
      //向api發送請求 喜歡的內容
    }
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