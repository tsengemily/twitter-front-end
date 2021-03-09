<template>
  <div class="AdminMain-container">
    <div class="row">
      <!-- Navbar -->
      <AdminNavbar v-bind:TweetList="TweetList" v-bind:UserList="UserList" />
      <!-- 中間主畫面 -->
      <div class="AdminMain-main">
        <div class="AdminMain-header">推文清單</div>
        <div
          class="AdminMain-tweet"
          v-for="tweet in tweetData"
          v-bind:key="tweet.id"
        >
          <img
            class="AdminMain-tweet-userPhoto"
            v-bind:src="tweet.User.avatar"
            alt=""
          />
          <div class="AdminMain-tweet-msg">
            <div class="AdminMain-tweet-msg-name">
              {{ tweet.User.name
              }}<span class="AdminMain-tweet-msg-name-app">
                @apple．{{ tweet.User.updatedAt | fromNow }}</span
              >
            </div>
            <div class="AdminMain-tweet-msg-name-msg">
              {{ tweet.description }}
            </div>
          </div>
          <div class="AdminMain-tweet-delete">
            <i
              class="far fa-trash-alt AdminMain-tweet-delete-icon"
              style="font-size: 20px"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/Admin-Navbar";

import mainPageAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

// 時間顯示器
import moment from "moment";

export default {
  name: "AdminMain",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      TweetList: false,
      UserList: false,
      tweetData: [],
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "AdminMain") {
      this.TweetList = true;
      this.UserList = false;
    }
    this.fetchAdminMain();
  },
  methods: {
    async fetchAdminMain() {
      try {
        const response = await mainPageAPI.AdminMain();
        this.tweetData = [...response.data];
      } catch (error) {
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
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      // 使用 moment 提供的 fromNow 方法
      return moment(datetime).fromNow();
    },
  },
};
</script>

<style scoped>
.AdminMain-container {
  margin: 0 auto;
  width: 960px;
  height: 50px;
}
.row {
  margin: 0;
}
/* 以下為中間頁面設定 */
.AdminMain-main {
  width: 75%;
}
.AdminMain-header {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
  margin-bottom: 20px;
}
.AdminMain-tweet {
  width: 100%;
  height: 90px;
  display: flex;
}
.AdminMain-tweet-userPhoto {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.AdminMain-tweet-msg {
  margin-left: 10px;
  width: 75%;
}
.AdminMain-tweet-msg-name {
  font-size: 15px;
  font-weight: 700;
  color: black;
}
.AdminMain-tweet-msg-name-app {
  color: rgba(101, 119, 134, 1);
}
.AdminMain-tweet-msg-name-msg {
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  color: black;
}
.AdminMain-tweet-delete-icon {
  color: rgba(101, 119, 134, 1);
}
.AdminMain-tweet-delete-icon:hover {
  cursor: pointer;
}
</style>