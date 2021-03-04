<template>
  <div class="page-container">
    <div class="row">
      <!-- 導覽列 -->
      <div class="left">

      </div>

      <!-- 主要內容 -->
      <div class="main">
        <UserHeader />
        <UserProfileCard 
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
        <PostCard />
        <CommentAndLike
          :initialIsLiked="isLiked"
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
import UserProfileCard from '../components/UserProfileCard'
import PostCard from '../components/PostCard'
import CommentAndLike from '../components/CommentAndLike'
import Top10User from '../components/Top10User'


export default {
  name: 'User Self',
  components: {
    UserHeader,
    UserProfileCard,
    PostCard,
    CommentAndLike,
    Top10User  
  },
  data() {
    return {
      currentUser: true,
      isPostActive: true,
      isPostAndRecommentActive: false,
      isLikeActive: false,
      isLiked: false
    }
  },
  methods: {
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
    margin: 0 auto;
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