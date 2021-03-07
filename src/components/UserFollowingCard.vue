<template>
  <div class="card-container d-flex">
    <template>
      <div>
        
      </div>
    </template>
    <router-link 
      to="/user/self"
    >
      <img 
        class="user-avatar"
        :src="initialFollowing.following.avatar"
      >
    </router-link>
    

    <div>
      <h1 class="user-name">
         {{initialFollowing.following.name}}
      </h1>
      <p class="user-account ml-2">
        @{{initialFollowing.following.account}}
      </p>

      <template
        v-if="isFollowed"
      >
        <button 
          class="follow-btn following"
          @click="deleteFollow"
        > 
          正在跟隨
        </button>
      </template>
      <template
        v-else
      >
        <button 
          class="follow-btn follow"
          @click="addFollow"
        >
          跟隨
        </button>
      </template>

      <p class="post-txt">
        {{initialFollowing.following.introduction}}
      </p>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    initialFollowing: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      isFollowed: this.initialFollowing.isFollowed
    }
  },
  methods: {
    deleteFollow () {
      this.isFollowed = false
    },
    addFollow () {
      this.isFollowed = true
    }
  }
}
</script>

<style scoped>
  .card-container {
    outline: 1px solid gray;
    position: relative;
    padding: 15px;
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
    /* outline: 1px solid red; */
    position: relative;
    left: -10px;
    font-weight: 500;
    font-size: 15px;
    color: #657786;
  }

  .post-txt {
    /* outline: 1px solid red; */
    position: relative;
    top: -10px;
    margin: 0;
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