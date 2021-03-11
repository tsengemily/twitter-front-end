<template>
  <div class="main-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- Navbar -->
        <Navbar
          v-bind:isSetting="isSetting"
          v-bind:MainPage="MainPage"
          v-bind:userData="userData"
          v-on:afterModalTweet="handleTweet"
        />
        <!-- 中間主畫面 -->
        <div class="main-main">
          <div class="main-header">首頁</div>
          <div class="main-counter">
            推文剩餘字數:{{ 140 - this.description.length }}字
          </div>
          <div class="main-tweet">
            <img class="main-tweet-userPhoto" v-bind:src="avatar" alt="" />
            <form
              class="main-tweet-textarea"
              @submit.prevent.stop="handleSubmit($event)"
            >
              <textarea
                class="form-control main-tweet-msg-board"
                placeholder="有什麼新鮮事?"
                v-model="description"
              ></textarea>
              <button
                v-if="isProcessing"
                type="submit"
                class="btn btn-primary btn-pushing"
                disabled
              >
                推文中!
              </button>
              <button
                v-if="!isProcessing"
                type="submit"
                class="btn btn-primary"
              >
                推文
              </button>
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
              <img
                class="main-following-photo"
                :src="tweet.User.avatar"
                alt=""
              />
              <div class="main-following-tweet">
                <div class="main-following-name">
                  {{ tweet.User.name
                  }}<span class="main-following-namename-app">
                    @{{ tweet.User.account }}．{{
                      tweet.updatedAt | fromNow
                    }}</span
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
        <!-- 跟隨誰 -->
        <div class="right">
          <div class="top-users-container">
            <h1 class="top-users-title">跟隨誰</h1>
            <Top10User
              v-for="topUser in topUsers"
              :key="topUser.id"
              :initial-top-user="topUser"
            />
            <div class="top-users-more">顯示更多</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Spinner from "./../components/Spinner";
import Top10User from "./../components/Top10User";

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
    Spinner,
    Top10User,
  },
  data() {
    return {
      MainPage: false,
      isSetting: false,
      tweetData: [],
      tweetShowData: [],
      userData: {},
      description: "",
      isLoading: true,
      isProcessing: false,
      avatar: "",
      topUsers: [],
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "MainPage") {
      this.MainPage = true;
      this.isSetting = false;
    }
    // const localUserId = localStorage.getItem("userId");
    // const { userId } = { userId: this.currentUser.id };
    // const { userId } = { userId: localUserId };
    this.fetchMainPage();
    this.showAvatar();
    this.fetchTopUsers();
    // this.getUserId({ userId });
  },
  methods: {
    async fetchTopUsers() {
      try {
        this.isLoading = true;
        const { data } = await mainPageAPI.getUsersTop();

        this.topUsers = data;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "載入資料失敗，請稍後再試",
        });
      }
    },
    async fetchMainPage() {
      try {
        this.isLoading = true;
        const response = await mainPageAPI.mainPage();
        this.tweetData = [...response.data];
        console.log(this.tweetData);
        // this.tweetData.forEach((tweet) => {
        //   this.tweetShowData.push({
        //     id: tweet.id,
        //     likes: tweet.Likes.length,
        //     replies: tweet.Replies.length,
        //     name: tweet.User.name,
        //     updatedAt: tweet.User.updatedAt,
        //     description: tweet.description,
        //     avatar: tweet.User.avatar,
        //   });
        // });
        // console.log("tweetShowData", this.tweetData);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    // async getUserId({ userId }) {
    //   try {
    //     const response = await mainPageAPI.get({ userId });
    //     this.userData = { ...response.data };
    //   } catch (error) {
    //     Toast.fire({
    //       icon: "error",
    //       title: "無法取得資料，請稍後再試",
    //     });
    //   }
    // },
    showAvatar() {
      this.avatar = localStorage.getItem("avatar");
    },
    async handleSubmit(event) {
      try {
        // 防止多次點擊送出
        this.isProcessing = true;
        // this.isLoading = true;
        const form = event.target;
        const formData = new FormData(form);
        console.log("formData", formData);
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value);
        // }
        // 檢測推文字數不能為0
        if (this.description.length === 0) {
          Toast.fire({
            icon: "error",
            title: "請輸入文字",
          });
          this.isProcessing = false;
          return;
        }
        // 檢測推文字數不能>140
        if (this.description.length > 140) {
          Toast.fire({
            icon: "error",
            title: "輸入文字不能超過140字",
          });
          this.isProcessing = false;
          return;
        }
        // this.tweetShowData.unshift({
        //   id: moment().format(),
        //   likes: 0,
        //   replies: 0,
        //   name: this.currentUser.name,
        //   updatedAt: moment().format(),
        //   description: this.description,
        //   avatar: this.currentUser.avatar,
        // });
        // const { data } = await SettingAPI.userSetUp({ formData });
        const { data } = await mainPageAPI.tweet({
          description: this.description,
        });
        this.description = "";
        // 重新呼叫mainPageAPI.mainPage();
        const response = await mainPageAPI.mainPage();
        this.tweetData = [...response.data];
        this.isProcessing = false;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 因為登入失敗，所以要把按鈕狀態還原
        this.isProcessing = false;

        // location.reload();
        // this.isLoading = false;
        // this.$router.push({ path: `/mainpage/${this.currentUser.id}` });
      } catch (error) {
        // this.isLoading = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法建立推文，請稍後再試",
        });
        this.isProcessing = false;
      }
    },
    async handleTweet(ModalTweetData) {
      this.tweetData = [...ModalTweetData];
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
  width: calc(960px / 2 - 64px - 65px);
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
  width: 80px; /* TODO:寬度不到 */
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
.main-counter {
  font-size: 15px;
  font-weight: 700;
  text-align: end;
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
  word-break: break-all;
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
.top-users-container {
  /* position: absolute;
  top: 15px;
  left: 20px; */
  background-color: #f5f8fa;
  border-radius: 14px;
  width: 210px;
  margin-top: 15px;
  margin-left: 30px;
}

.top-users-title {
  padding: 5px 15px;
  font-weight: 700;
  font-size: 16px;
  line-height: 35px;
  border-bottom: 1px solid #e6ecf0;
}

.top-users-more {
  padding: 5px 15px;
  font-size: 13px;
  line-height: 30px;
  color: #ff6600;
}
</style>