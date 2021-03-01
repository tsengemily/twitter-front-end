<template>
  <div class="container d-flex">
    <router-link 
      to="#"
      class="comment"
    >
      <img src="../assets/comment.png">
      13
    </router-link>
    <div class="like">
      <img src="../assets/like.png">
      76
    </div>
  </div>
</template>

<style scoped>
  .container {
    outline: 1px solid blue;
    margin-top: 5px;
  }

  .comment,
  .like {
    font-size: 13px;
    color: #657786;
  }

  .comment {
    margin-right: 50px;
    margin-left: 60px;
  }

  img {
    width: 12px;
    height: 12px;
  }
</style>