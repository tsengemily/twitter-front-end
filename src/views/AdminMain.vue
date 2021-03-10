<template>
  <div class="AdminMain-container">
    <Spinner v-if="isLoading" />
    <template v-else>
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
                  @apple．{{ tweet.updatedAt | fromNow }}</span
                >
              </div>
              <div class="AdminMain-tweet-msg-name-msg">
                {{ tweet.description | textCount }}
              </div>
            </div>
            <div class="AdminMain-tweet-delete">
              <i
                @click.stop.prevent="deleteTweet(tweet.id)"
                class="far fa-trash-alt AdminMain-tweet-delete-icon"
                style="font-size: 20px"
              ></i>
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

// 時間顯示器
import moment from "moment";

export default {
  name: "AdminMain",
  components: {
    AdminNavbar,
    Spinner,
  },
  data() {
    return {
      TweetList: false,
      UserList: false,
      tweetData: [],
      isLoading: true,
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
        this.isLoading = true;
        const response = await mainPageAPI.AdminMain();
        this.tweetData = [...response.data];
        console.log(this.tweetData);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },

    async deleteTweet(tweetId) {
      try {
        const { TweetId } = { TweetId: tweetId };
        console.log({ TweetId });
        const { data } = await mainPageAPI.deleteTweet({ TweetId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweetData = this.tweetData.filter((tweet) => tweet.id !== TweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "資料無法刪除，請稍後再試",
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
    textCount(text) {
      if (text.length > 50) {
        text = text.substr(0, 50);
        text = text + "...";
        return text;
      }
      return text;
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