<template>
  <div class="container">
    <div class="nav">

    </div>
    <div class="main">
      <UserHeader />
      <ul class="nav">
        <li
          class="nav-item"
        >
          <router-link 
            to="/user/self/follower"
            class="link-btn"
          ></router-link>
          跟隨者
        </li>
        <li
          class="nav-item active"
        >
          正在跟隨
        </li>
      </ul>
      <UserCard 
        :initialIsFollow="isFollow"
      />
    </div>
    <div class="right">
      <Top10User 
        :initialIsFollow="isFollow"
      />
    </div>
  </div>
</template>

<script>
import UserHeader from '../components/UserHeader'
import UserCard from '../components/UserCard'
import Top10User from '../components/Top10User'

export default {
  components: {
    UserHeader,
    UserCard,
    Top10User
  },
  data() {
    return {
      active:true,
      isFollow: true,
    }
  }
}
</script>

<style scoped>
  .container {
    /* outline: 1px solid red; */
    /* width: 960px; */
    position: relative;
  }

  .main {
    /* outline: 3px solid purple; */
    width: 480px;
    margin: 0 auto;
  }

  .right {
    /* outline: 3px solid pink; */
    width: 240px;
    position: absolute;
    top: 15px;
    right: 50px;
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