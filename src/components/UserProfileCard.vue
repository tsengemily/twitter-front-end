<template>
  <div class="card-container">
    <div class="cover-pic">
      <img :src="user.cover | emptyCover">
    </div>

    <template
      v-if="user.id === currentUser.id "
    >
      <button
       class="edit-btn"
       type="button"
       data-toggle="modal" 
       data-target="#user-edit"
      >
       編輯個人資料
      </button>
      <EditModal 
        :initial-user="user"
      />
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
          v-if="user.isFollowed"
        >
          <button 
            class="follow-btn following"
            @click="deleteFollow(user.id)"
          > 
            正在跟隨
          </button>
        </template>
        <template
          v-else
        >
          <button 
            class="follow-btn follow"
            @click="addFollow()"
          >
            跟隨
          </button>
        </template>

      </div>
    </div>

    </template>
    

    <img 
      class="user-avatar" 
      :src="user.avatar | emptyImage"
    >  
    <div class="profile-txt">
      <h1 class="user-name">
        {{user.name}}
      </h1>
      <p class="user-account">
        @{{user.account}}
      </p>
      <p class="user-introduction">
        {{user.introduction}}
      </p>
    </div>
  </div>
</template>


<script>
import EditModal from '../components/EditModal'
import { mapState } from 'vuex'
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'
import { emptyImageFilter } from "../utils/mixins"
import { emptyCoverFilter } from "../utils/mixins"

export default {
  name: 'UserProfileCard',
  components: {
    EditModal
  },
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        id: -1,
        name: '',
        email: '',
        account: '',
        cover: '',
        avatar: '',
        introduction: '',
        isFollowed: false,
      })
    }
  },
  data () {
    return {
      user: {
       ...this.initialUser 
      },
      isInfo: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  },
  methods: {
    async addFollow () {
      try {
        const { data } = await UserAPI.addFollow({ id: this.user.id })

         if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user = {
          ...this.user,
          isFollowed: true
        }
        this.user.followerCount = this.user.followerCount + 1

        Toast.fire({
          icon: 'success',
          title: '新增跟隨成功'
        })

        this.$emit('after-add-follow-profile')
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

        this.user = {
          ...this.user,
          isFollowed: false
        }
        this.user.followerCount = this.user.followerCount - 1
    

        Toast.fire({
          icon: 'success',
          title: '取消跟隨成功'
        })

        this.$emit('after-delete-follow-profile')
      }  catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消跟隨，請稍後再試'
        })
        console.log(error)
      }
    }
  },
  mixins: [emptyImageFilter, emptyCoverFilter]
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