<template>
  <div class="card-container d-flex">
    <img 
      class="user-avatar"
      src="https://picsum.photos/300/200"
    >

    <div>
      <h1 class="user-name">
         Devon Lanne
      </h1>
      <router-link 
        class="user-account ml-2"
        to="#"
      >
        @DL
      </router-link>

      <template
        v-if="isFollow"
      >
        <button class="follow-btn following"> 
          正在跟隨
        </button>
      </template>
      <template
        v-else
      >
        <button class="follow-btn follow">
          跟隨
        </button>
      </template>

      <p class="post-txt">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, ipsam?
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialIsFollow: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isFollow: this.initialIsFollow
    }
  }
}
</script>

<style scoped>
  .card-container {
    outline: 1px solid gray;
    position: relative;
    padding: 15px 15px 0 15px;
    border-top: 1px solid #e6ecf0;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 15px;
    color: #1c1c1c;
  }

  .user-account {
    position: relative;
    left: -10px;
    font-weight: 500;
    font-size: 15px;
    color: #657786;
  }

  .post-txt {
    margin-bottom: 0;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #1c1c1c;
  }

  .follow-btn {
    position: absolute;
    top: 12px;
    right: 15px;
    border: 1px solid #ff6600;
    border-radius: 100px;
    padding: 2px 16px;
    font-weight: 700;
    font-size: 15px;
  }
  
  .follow {
    background: transparent;
    color: #ff6600;
  }

  .following {
    background: #ff6600;
    color: #fff;
  }
</style>