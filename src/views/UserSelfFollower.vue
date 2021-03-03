<template>
  <div class="container">
    <UserHeader />
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
          to="/user/self/following"
          class="link-btn"
        ></router-link>
        正在跟隨
      </li>
      </ul>
    <UserCard 
      :initialIsFollow="isFollow"
    />
  </div>
</template>

<script>
import UserHeader from '../components/UserHeader'
import UserCard from '../components/UserCard'

export default {
  components: {
    UserHeader,
    UserCard
  },
  data() {
    return {
      active:true,
      isFollow: false
    }
  }
}
</script>

<style scoped>
  .container {
    outline: 1px solid red;
    width: 480px;
  }

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