<template>
  <div class="card-container d-flex">
    <template>
      <div>
        
      </div>
    </template>
    <router-link 
      :to="{name: 'user', params: {id: following.followingId}}"
    >
      <img 
        class="user-avatar"
        :src="following.following.avatar"
      >
    </router-link>
    

    <div>
      <h1 class="user-name">
         {{following.following.name}}
      </h1>
      <p class="user-account ml-2">
        @{{following.following.account}}
      </p>

      <template
        v-if="following.isFollowed"
      >
        <button 
          class="follow-btn following"
          @click="deleteFollow(following.followingId)"
        > 
          正在跟隨
        </button>
      </template>
      <template
        v-else
      >
        <button 
          class="follow-btn follow"
          :class="{disable: follower.followerId === currentUser.id}"
          @click="addFollow()"
          :disabled="following.followingId === currentUser.id"
        >
          {{ follower.followerId === currentUser.id ? '無法跟隨自己' : '跟隨' }}
        </button>
      </template>

      <p class="post-txt">
        {{following.following.introduction}}
      </p>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'

export default {
  props: {
    initialFollowing: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      following: this.initialFollowing
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async addFollow () {
      try {
        const { data } = await UserAPI.addFollow({ id: this.following.followingId })

         if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.following = {
          ...this.following,
          isFollowed: true
        }

        Toast.fire({
          icon: 'success',
          title: '新增跟隨成功'
        })
      }  catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增跟隨，請稍後再試'
        })
        console.log(error)
      }
    },
     async deleteFollow (userId) {
      try {
        const { data } = await UserAPI.deleteFollow({ userId })

         if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.following = {
          ...this.following,
          isFollowed: false
        }

        Toast.fire({
          icon: 'success',
          title: '取消跟隨成功'
        })
      }  catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消跟隨，請稍後再試'
        })
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
  .card-container {
    /* outline: 1px solid gray; */
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

  .disable {
    border: 1px solid #657786;
    background: #657786;
    color: #fff;
   }
</style>