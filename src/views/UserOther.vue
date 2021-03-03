<template>
<div class="container-fluid">
  <UserHeader />
  <UserProfileCard 
    :isCurrentUser="currentUser"
    :initialIsInfo="info"
    :initialIsFollow="isFollow"
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
</template>



<script>
import UserHeader from '../components/UserHeader'
import UserProfileCard from '../components/UserProfileCard'
import PostCard from '../components/PostCard'
import CommentAndLike from '../components/CommentAndLike'

export default {
  name: 'User Other',
  components: {
    UserHeader,
    UserProfileCard,
    PostCard,
    CommentAndLike 
  },
  data() {
    return {
      currentUser: false,
      info: false,
      isFollow: false,
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
  .container-fluid {
    outline: 1px solid red;
    width: 480px;
  }

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