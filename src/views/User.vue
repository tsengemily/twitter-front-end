<template>
  <div class="page-container">
    <div class="row">
      <!-- 導覽列 -->
      <div class="left">
        <Navbar />
      </div>

      <!-- 主要內容 -->
      <div class="main">
        <UserHeader 
          :user-id="user.id"
          :user-name="user.name"
          :user-tweets-count="user.tweetCount"
        />
        <UserProfileCard 
          :initial-user="user"
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
import Navbar from '../components/Navbar'
import UserHeader from '../components/UserHeader'
import UserProfileCard from '../components/UserProfileCard'
import PostCard from '../components/PostCard'
import Top10User from '../components/Top10User'
import { mapState } from 'vuex'
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'


export default {
  name: 'User',
  components: {
    Navbar,
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
        introduction: '',
        isFollowed: false,
        followerCount: 0,
        followingCount: 0,
        tweetCount: 0
      },
      currentUser: false,
      tweets: [],
      topUsers: [],
      isPostActive: true,
      isPostAndRecommentActive: false,
      isLikeActive: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchTopUsers()
    const { id: userId } = this.$route.params
    this.fetchUser({ userId })
    this.fetchTweets({ userId })
    this.fetchFollowingCount({ userId })
  },
  methods: {
    //取得使用者資料
    async fetchUser ({ userId }) {
      try {
        const { data } = await UserAPI.get({ userId })

        const { id, name, email, account, cover, avatar, introduction, isSelf, isFollowed, followerCount, followingCount, tweetCount } = data
        this.user = {
          ...this.user,
          id,
          name,
          email,
          account,
          cover,
          avatar,
          introduction,
          isFollowed,
          followerCount,
          followingCount,
          tweetCount
        }
        this.currentUser = isSelf
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '載入資料失敗，請稍後再試'
        })
      }
    },
    //取得推文
    async fetchTweets ({ userId }) {
      try {
        const { data } = await UserAPI.getTweets({ userId })
        
        this.tweets = data
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '載入資料失敗，請稍後再試'
        })
      }
    },
    //取得topUsers
    async fetchTopUsers () {
      try {
        const { data } = await UserAPI.getUsersTop()

        this.topUsers = data
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '載入資料失敗，請稍後再試'
        })
      }
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
    /* outline: 1px solid red; */
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