<template>
  <div class="card-container">
    <div class="cover-pic">
      <img src="https://picsum.photos/300/200">
    </div>

    <template
      v-if="isCurrentUser"
    >
      <button
       class="edit-btn"
       type="button"
       data-toggle="modal" 
       data-target="#user-edit"
      >
       編輯個人資料
      </button>
      <UserEdit />
    </template>

    <template
      v-else
    >
    <div class="other-btn d-flex">
      <button class="mail mr-2"></button>
      
      <div class="mr-2">
        <template 
        v-if="isInfo"
        >
          <button class="noti"></button>
        </template>
        <template
          v-else
        >
          <button class="un-noti"></button>
        </template>
      </div>
      
      <div class="follow">
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

    </template>
    

    <img 
      class="user-avatar" 
      src="https://picsum.photos/300/100" >
      
    <div class="profile-txt">
      <h1 class="user-name">
        John Doe
      </h1>
      <p class="user-account">
        @heyjohn
      </p>
      <p class="user-introduction">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      </p>
      <div class="d-flex">
        <router-link
          to="/user/self/following" 
          class="user-following"
        >
          <strong>34個</strong>跟隨中
        </router-link>
        <router-link 
          to="/user/self/follower" 
          class="user-follower"
        >
          <strong>59位</strong>跟隨者
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import UserEdit from '../components/UserEdit'

export default {
  components: {
    UserEdit
  },
  props: {
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    initialIsInfo: {
      type: Boolean,
      required: true
    },
    initialIsFollow: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isInfo: this.initialIsInfo,
      isFollow: this.initialIsFollow
    }
  }
}
</script>


<style scoped>
.card-container {
  position: relative;
  width: 100%
}

.cover-pic {
  width: 100%;
  height: 200px;
}

.cover-pic img {
  width: 100%;
  height: 100%;
}

.user-avatar {
  position: absolute;
  top: 120px;
  left: 15px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid #fff;
}

.profile-txt {
  margin: 70px 0 0 15px;
}

.user-name {
  margin-bottom: 0px;
  font-weight: 900;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
}

.user-account {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.user-introduction {
  margin: 10px 0 ;
  font-size: 14px;
  line-height: 20px;
}

.user-following,
.user-follower {
  font-size: 14px;
  line-height: 20px;
  color: #657786;
}

.user-following {
  margin-right: 20px;
}

.user-following strong,
.user-follower strong {
  font-weight: 500;
  color: #000000;
}

.edit-btn,
.other-btn {
  position: absolute;
  top: 210px;
  right: 15px;
  background-color: transparent;
}

.edit-btn,
.follow-btn {
  padding: 5px 16px;
  border: 1px solid #ff6600;
  border-radius: 100px;
  font-weight: 700;
  font-size: 15px;
  color: #ff6600;
  text-decoration: none;
}

.follow {
  background: transparent;
  color: #ff6600;
}

.following {
  background: #ff6600;
  color: #fff;
}

.mail {
  background: url('../assets/mail.png');
}

.un-noti {
  background: url('../assets/bell.png');
}

.noti {
  background: url('../assets/noti.png');
  background-color: #ff6600;
}

.mail,
.un-noti,
.noti {
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: 50%;
  border: 1px solid #ff6600;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
</style>