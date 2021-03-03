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
      <template 
        v-if="isLiked"
      >
        <img src="../assets/addlike.png">
      </template>
      <template
        v-else
      >
        <img src="../assets/like.png">
      </template>
      76
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialIsLiked: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isLiked: this.initialIsLiked
    }
  },
}
</script>

<style scoped>
  .container {
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