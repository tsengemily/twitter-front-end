<template>
  <div class="card-container d-flex">
    <router-link 
      :to="{name: 'user', params: {id: topUser.id}}" 
    >
      <img 
        class="user-avatar"
        :src="topUser.avatar"
      >
    </router-link>

    <div>
      <h2 class="user-name">
        {{topUser.name}}
      </h2>
      <p
        class="user-account ml-2"
      >
        @{{topUser.account}}
      </p>

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
          @click.stop.prevent="addFollow()"
        >
          跟隨
        </button>
      </template>
    </div>
  </div>
</template>


<script>
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'

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
    async addFollow () {
      try {
        const { data } = await UserAPI.addFollow({ id: this.topUser.id })

         if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.topUser = {
          ...this.topUser,
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

        this.topUser = {
          ...this.topUser,
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