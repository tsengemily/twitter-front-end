<template>
  <ul class="nav d-flex">
    <li>
      <router-link
       class="post-link"
       to="#"
      >
        推文
      </router-link>
    </li>
    <li>
      <router-link 
      class="post-link"
      to="#"
      >
        推文與回覆
      </router-link>
    </li>
    <li class="active">
      <router-link 
      class="post-link"
      to="#"
      >
        喜歡的內容
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
 .nav {
    margin-top: 20px;
    border-bottom: 1px solid #e6ecf0;
  }

  .nav li {
    /* outline: 1px solid red; */
    width: 110px;
    padding: 16px 0;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
  }

  .post-link {
    width: 100%;
    text-decoration: none;
    color: #657786;
  }

  /* .nav li:hover,
  .nav li:focus {
    border-bottom: 2px solid #ff6600;
  } */

  .post-link:hover,
  .post-link:focus {
    color: #ff6600;
  }

  .active {
    border-bottom: 2px solid #ff6600;
  }
</style>