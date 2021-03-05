<template>
  <div class="right-part">
    <div class="top-users-container">
      <h1>跟隨誰</h1>

      <div class="card-container d-flex">
        <img 
          class="user-avatar"
          src="https://picsum.photos/300/200"
        >

        <div>
          <h2 class="user-name">
            Pizza Hut
          </h2>
          <router-link 
            class="user-account ml-2"
            :to="{name: 'user', params: {id: user.id}}" 
          >
            @pizzahut
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
        </div>
      </div>

      <div class="card-container d-flex">
        <img 
          class="user-avatar"
          src="https://picsum.photos/300/200"
        >

        <div>
          <h2 class="user-name">
            Pizza Hut
          </h2>
          <router-link 
            class="user-account ml-2"
            :to="{name: 'user', params: {id: user.id}}" 
          >
            @pizzahut
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
              哈囉跟隨
            </button>
          </template>
        </div>
      </div>

      <div class="more">
        顯示更多
      </div> 
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
      user: {
        id: 1234
      },
      isFollow: this.initialIsFollow
    }
  }
}
</script>


<style scoped>
  .right-part {
    /* outline: 4px solid purple; */
    position: relative;
    width: 240px;

  }

  .top-users-container {
    position: absolute;
    top: 15px;
    left: 20px;
    background-color: #f5f8fa;
    border-radius: 14px;
    width: 220px;
  }

  h1 {
    padding: 5px 15px;
    font-weight: 700;
    font-size: 16px;
    line-height: 35px;
    border-bottom: 1px solid #e6ecf0;
  }

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

  .more {
    padding: 5px 15px;
    font-size: 13px;
    line-height: 30px;
    color: #ff6600;
  }
</style>