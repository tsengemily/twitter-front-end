<template>
  <div class="AdminUsers-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- Navbar -->
        <AdminNavbar v-bind:TweetList="TweetList" v-bind:UserList="UserList" />
        <!-- 中間主畫面 -->
        <div class="AdminUsers-main">
          <div class="AdminUsers-header">使用者列表</div>
          <div class="AdminUsers-cards">
            <div
              class="AdminUsers-card"
              v-for="user in tweetUsers"
              v-bind:key="user.id"
            >
              <img
                class="AdminUsers-card-BGphoto"
                v-bind:src="user.cover"
                alt=""
              />
              <div class="AdminUsers-card-info">
                <div class="AdminUsers-card-info-name">{{ user.name }}</div>
                <div class="AdminUsers-card-info-app">@Jackson</div>
                <div class="AdminUsers-card-info-icon">
                  <i
                    class="far fa-comment AdminUsers-card-info-icon-msg"
                    style="font-size: 20px"
                  ></i>
                  {{ user.Tweets.length }}
                  <i
                    class="far fa-heart AdminUsers-card-info-icon-msg"
                    style="font-size: 20px"
                  ></i>
                  {{ user.Likes.length }}
                </div>
                <div class="AdminUsers-card-info-follow">
                  {{ user.Followings.length }} 個<span
                    class="AdminUsers-card-info-follow-style"
                    >跟隨中</span
                  >
                  {{ user.Followers.length }} 位<span
                    class="AdminUsers-card-info-follow-style"
                    >跟隨者</span
                  >
                </div>
              </div>
              <img
                class="AdminUsers-card-userPhote"
                v-bind:src="user.avatar"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AdminNavbar from "./../components/Admin-Navbar";
import Spinner from "./../components/Spinner";

import mainPageAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

export default {
  name: "AdminUsers",
  components: {
    AdminNavbar,
    Spinner,
  },
  data() {
    return {
      TweetList: false,
      UserList: false,
      tweetUsers: [],
      isLoading: true,
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "AdminUsers") {
      this.UserList = true;
    }
    this.fetchAdminUsers();
  },
  methods: {
    async fetchAdminUsers() {
      try {
        this.isLoading = true;
        const response = await mainPageAPI.AdminUsers();
        this.tweetUsers = [...response.data];
        console.log("tweetUsers", this.tweetUsers);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
  },
  computed: {
    ...mapState([
      "currentUser",
      "isAuthenticated",
    ]) /* TODO: 又是解構付值要問 */,
  },
};
</script>

<style scoped>
.AdminUsers-container {
  margin: 0 auto;
  width: 960px;
  height: 50px;
}
.row {
  margin: 0;
}
/* 以下為中間頁面設定 */
.AdminUsers-main {
  width: 75%;
}
.AdminUsers-header {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
  margin-bottom: 20px;
}
.AdminUsers-cards {
  display: flex;
  flex-wrap: wrap;
}
.AdminUsers-card {
  width: 220px;
  height: 280px;
  margin-right: 15px;
  border-radius: 10px;
  position: relative;
}
.AdminUsers-card-BGphoto {
  width: 220px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.AdminUsers-card-info {
  width: 220px;
  height: calc(280px - 110px);
  background-color: rgb(246, 247, 248);
  border-radius: 0 0 10px 10px;
}
.AdminUsers-card-info-name {
  padding-top: 30px;
  font-size: 15px;
  font-weight: 900;
  text-align: center;
}
.AdminUsers-card-info-app {
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  color: rgba(101, 119, 134, 1);
}
.AdminUsers-card-info-icon {
  margin-top: 15px;
  font-weight: 500;
  height: 25px;
  line-height: 15px;
  font-size: 15px;
  text-align: center;
}
.AdminUsers-card-info-icon-msg {
  color: rgba(101, 119, 134, 1);
  margin-left: 10px;
}
.AdminUsers-card-info-follow {
  text-align: center;
  font-weight: 500;
  margin-top: 15px;
}
.AdminUsers-card-info-follow-style {
  color: rgba(101, 119, 134, 1);
}
.AdminUsers-card-userPhote {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid white;
  position: absolute;
  left: 50%;
  transform: translate(-50px, 0);
  top: 40px;
}
</style>