<template>
<div class="container-fluid">
  <UserHeader />
  <UserProfileCard 
    :isCurrentUser="currentUser"
    :initialIsInfo="info"
    :initialIsFollow="isFollow"
  />
  <UserPostNav />
  <PostCard />
  <CommentAndLike/>
</div>
</template>



<script>
import UserHeader from '../components/UserHeader'
import UserProfileCard from '../components/UserProfileCard'
import UserPostNav from '../components/UserPostNav'
import PostCard from '../components/PostCard'
import CommentAndLike from '../components/CommentAndLike'

export default {
  components: {
    UserHeader,
    UserProfileCard,
    UserPostNav,
    PostCard,
    CommentAndLike 
  },
  data() {
    return {
      currentUser: false,
      info: false,
      isFollow: false
    }
  }
}
</script>


<style scoped>
  .container-fluid {
    outline: 1px solid red;
    width: 480px;
  }
</style>