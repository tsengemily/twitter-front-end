<template>
  <div class="card-container d-flex">
    <img 
      class="user-avatar"
      :src="topUser.avatar"
    >

    <div>
      <h2 class="user-name">
        {{topUser.name}}
      </h2>
      <router-link 
        class="user-account ml-2"
        :to="{name: 'user', params: {id: topUser.id}}" 
      >
        @{{topUser.account}}
      </router-link>

      <template
        v-if="topUser.isFollowed"
      >
        <button 
          class="follow-btn following"
          @click.stop.prevent="deleteFollow(topUser.id)"
        > 
          正在跟隨
        </button>
      </template>
      <template
        v-else
      >
        <button 
          class="follow-btn follow"
          @click.stop.prevent="addFollow(topUser.id)"
        >
          跟隨
        </button>
      </template>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    initialTopUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      topUser: this.initialTopUser
    }
  },
  methods: {
    deleteFollow () {
      //delete/api/followships/{followingId}
      //api:followshipsAPI.deleteFollow({followingId})
      this.topUser = {
        ...this.topUser,
        isFollowed: false
      }
    },
    addFollow () {
      //post/api/followships
      //api:followshipsAPI.addFollow
      this.topUser = {
        ...this.topUser,
        isFollowed: true
      }
    }
  }
}
</script>


<style scoped>
  .card-container {
    /* outline: 1px solid #808080; */
    position: relative;
    padding: 5px;
    border-bottom: 1px solid #e6ecf0;
    width: 100%;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 13px;
    color: #1c1c1c;
  }

  .user-account {
    position: relative;
    left: -10px;
    font-weight: 500;
    font-size: 12px;
    color: #657786;
  }

  .follow-btn {
    position: absolute;
    top: 12px;
    right: 5px;
    border: 1px solid #ff6600;
    border-radius: 100px;
    padding: 2px 16px;
    font-weight: 700;
    font-size: 13px;
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