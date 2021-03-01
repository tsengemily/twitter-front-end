<template>
  <ul class="nav">
    <router-link 
      to="/user/self/follower"
      class="nav-item active"
    >
      <li>
        跟隨者
      </li>
    </router-link>
    <router-link 
      to="/user/self/following"
      class="nav-item"
    >
      <li>
        正在跟隨
      </li>
    </router-link>
  </ul>
</template>



<style scoped>
  .nav {
    /* outline: 1px solid green; */
    border-bottom: 1px solid #e6ecf0;
  }

  .nav-item {
    /* outline: 1px solid red; */
    width: 110px;
    padding: 16px 0;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
    color: #657786;
    text-decoration: none;
  }

  .active {
    border-bottom: 2px solid #ff6600;
    color: #ff6600;
  }

</style>
