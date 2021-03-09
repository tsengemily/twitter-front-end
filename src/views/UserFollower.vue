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
              :to="{name: 'user-following', params: {id: user.id}}" 
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
import UserHeader from '../components/UserHeader'
import UserFollowerCard from '../components/UserFollowerCard'
import Top10User from '../components/Top10User'
import { mapState } from 'vuex'
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'



export default {
  name: 'UserFollower',
  components: {
    UserHeader,
    UserFollowerCard,
    Top10User
  },
  data() {
    return {
      user: {
        id: -1,
        name: ''
      },
      tweetsCount: 0,
      followers: [],
      currentUser: false
    }
  },
   computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUser({ userId })
    this.fetchTweetsCount({ userId })
    this.fetchFollower({ userId })
  },
  methods: {
    //取得使用者名稱
    async fetchUser ({ userId }) {
      try {
        const { data } = await UserAPI.get({ userId })

        const { id, name, isSelf } = data
        this.user = {
          ...this.user,
          id,
          name
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
    //取得使用者推文數
    async fetchTweetsCount ({ userId }) {
      try {
        const { data } = await UserAPI.getTweets({ userId })
        
        this.tweetsCount = data.length
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '載入資料失敗，請稍後再試'
        })
      }
    },
    //取得跟隨者
    async fetchFollower ({ userId }) {
      try {
        const { data } = await UserAPI.getFollowers({ userId })
        
        this.followers = data
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '載入資料失敗，請稍後再試'
        })
      }
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