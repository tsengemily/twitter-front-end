<template>
  <div class="container">
    <UserHeader />
    <FollowNav />
    <UserCard 
      :initialIsFollow="isFollow"
    />
  </div>
</template>

<script>
import UserHeader from '../components/UserHeader'
import FollowNav from '../components/FollowNav'
import UserCard from '../components/UserCard'

export default {
  components: {
    UserHeader,
    FollowNav,
    UserCard
  },
  data() {
    return {
      isFollow: true
    }
  }
}
</script>

<style scoped>
  .container {
    outline: 1px solid red;
    width: 480px;
  }
</style>