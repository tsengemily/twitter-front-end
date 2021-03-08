<template>
  <div class="main-container">
    <div class="row">
      <!-- Navbar -->
      <Navbar v-bind:isSetting="isSetting" v-bind:MainPage="MainPage" />
      <!-- 中間主畫面 -->
      <div class="main-main">
        <div class="main-header">首頁</div>
        <div class="main-tweet">
          <img
            class="main-tweet-userPhoto"
            v-bind:src="userData.avatar"
            alt=""
          />
          <form
            class="main-tweet-textarea"
            @submit.prevent.stop="handleSubmit($event)"
          >
            <textarea
              class="form-control main-tweet-msg-board"
              placeholder="有什麼新鮮事?"
              v-model="description"
            ></textarea>
            <button type="submit" class="btn btn-primary">推文</button>
          </form>
        </div>
        <div class="main-space"></div>
        <router-link
          v-for="tweet in tweetData"
          v-bind:key="tweet.id"
          class="main-link-stlye"
          v-bind:to="{ name: 'ReplyList', params: { id: tweet.id } }"
        >
          <div class="main-following">
            <img class="main-following-photo" :src="tweet.User.avatar" alt="" />
            <div class="main-following-tweet">
              <div class="main-following-name">
                {{ tweet.User.name
                }}<span class="main-following-namename-app">
                  @apple．{{ tweet.User.updatedAt | fromNow }}</span
                >
              </div>
              <div class="main-following-msg">
                {{ tweet.description }}
              </div>
              <div class="main-following-remind">
                <i class="far fa-comment main-following-remind-style">
                  {{ tweet.Replies.length }}
                </i>

                <i class="far fa-heart main-following-remind-style">
                  {{ tweet.Likes.length }}
                </i>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";

import mainPageAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

// 時間顯示器
import moment from "moment";

export default {
  name: "mainPage",
  components: {
    Navbar,
  },
  data() {
    return {
      MainPage: false,
      isSetting: false,
      tweetData: [],
      userData: {},
      description: "",
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "MainPage") {
      this.MainPage = true;
      this.isSetting = false;
    }
    const { userId } = { userId: this.currentUser.id };
    this.fetchMainPage({ userId });
    this.getUserId({ userId });
  },
  methods: {
    async fetchMainPage({ userId }) {
      try {
        const response = await mainPageAPI.mainPage({ userId });
        this.tweetData = [...response.data];
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    async getUserId({ userId }) {
      try {
        const response = await mainPageAPI.get({ userId });
        this.userData = { ...response.data };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    async handleSubmit(event) {
      try {
        const form = event.target;
        const formData = new FormData(form);
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value);
        // }
        console.log(formData);
        console.log("description", this.description);
        // const { data } = await SettingAPI.userSetUp({ formData });
        const { data } = await mainPageAPI.tweet({
          description: this.description,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        location.reload();
        // this.$router.push({ path: `/mainpage/${this.currentUser.id}` });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法建立推文，請稍後再試",
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
.main-container {
  margin: 0 auto;
  width: 960px;
}
.row {
  margin: 0;
}
/* 以下為中間頁面設定 */
.main-main {
  width: 50%;
}
.main-header {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
}
.main-tweet {
  height: 120px;
  display: flex;
}
.main-tweet-userPhoto {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.main-tweet-textarea {
  display: flex;
}
.main-tweet-msg-board {
  width: calc(960px / 2 - 64px - 50px);
  border-style: none;
  resize: none;
  box-shadow: none;
}
.btn {
  border-radius: 50px;
  border-color: rgba(255, 102, 0, 1);
  background-color: rgba(255, 102, 0, 1);
  font-weight: 700;
  font-size: 18px;
  width: 64px; /* TODO:寬度不到 */
  height: 40px;
  line-height: 40px;
  margin-top: 70px;
  padding: 0px;
}
.btn:hover {
  background-color: rgb(230, 94, 4) !important;
  border-color: rgb(230, 94, 4) !important;
}
.btn:active,
.btn:focus {
  background-color: rgb(255, 145, 0) !important;
  border-color: rgb(255, 145, 0) !important;
  box-shadow: 2px 2px 2px 0px rgb(255, 145, 0) !important;
}
.main-space {
  background-color: rgb(230, 236, 240);
  width: 100%;
  height: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.main-link-stlye:link {
  text-decoration: none;
}
.main-following {
  width: 100%;
  height: 135px;
  display: flex;
}
.main-following-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.main-following-tweet {
  margin-left: 10px;
}
.main-following-name {
  font-size: 15px;
  font-weight: 700;
  color: black;
}
.main-following-namename-app {
  color: rgba(101, 119, 134, 1);
}
.main-following-msg {
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  color: black;
}
.main-following-remind {
  color: rgba(101, 119, 134, 1);
  font-weight: 500;
  margin: 0 0 0 0;
}
.main-following-remind-style {
  margin-right: 50px;
  font-size: 13px;
}
</style>