<template>
  <div class="replylist-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <Navbar
          v-bind:isSetting="isSetting"
          v-bind:MainPage="MainPage"
          v-bind:PersonalInfo="PersonalInfo"
        />
        <div class="replylist-main">
          <router-link
            class="replylist-main-header"
            v-bind:to="{ name: 'MainPage', params: { id: currentUser.id } }"
          >
            <div class="replylist-main-header-style">
              <i
                class="fas fa-arrow-left replylist-main-header-style-icon"
                style="font-size: 25px"
              ></i
              >推文
            </div>
          </router-link>
          <div class="replylist-main-tweet">
            <div class="replylist-main-tweet-info">
              <img
                class="replylist-main-tweet-info-photo"
                v-bind:src="tweetData.User.avatar"
                alt=""
              />
              <div class="replylist-main-tweet-info-name">
                {{ tweetData.User.name }}
                <div class="replylist-main-tweet-info-name-app">@apple</div>
              </div>
            </div>
            <div class="replylist-main-tweet-msg">
              {{ tweetData.description }}
            </div>
            <div class="replylist-main-tweet-time">
              {{ tweetData.updatedAt | publishTime }}
            </div>
            <div class="replylist-main-tweet-replyRecord">
              {{ tweetData.Replies.length }}
              <span class="replylist-main-tweet-replyRecord-style">回覆</span>
              {{ likeＣount }}
              <span class="replylist-main-tweet-replyRecord-style">
                喜歡次數
              </span>
            </div>
            <div class="replylist-main-tweet-icons">
              <i
                class="far fa-comment replylist-main-tweet-icons-icon"
                style="font-size: 25px"
                data-toggle="modal"
                data-target="#ReplyListModal"
              ></i>
              <i
                v-if="isLike"
                v-show="!isLikePorcessing"
                class="fas fa-heart replylist-main-tweet-icons-icon-favorite"
                style="font-size: 25px"
                v-on:click="deleteLike"
              ></i>
              <i
                v-else
                v-show="!isLikePorcessing"
                class="far fa-heart replylist-main-tweet-icons-icon"
                style="font-size: 25px"
                v-on:click="addLike"
              ></i>
              <i
                v-if="isLike"
                v-show="isLikePorcessing"
                class="fas fa-heart replylist-main-tweet-icons-icon-favorite"
                style="font-size: 25px"
                disabled
                ><span class="replylist-main-tweet-icons-icon-font"
                  >愛心收回中．．．Q.Q</span
                ></i
              >
              <i
                v-else
                v-show="isLikePorcessing"
                class="far fa-heart replylist-main-tweet-icons-icon"
                style="font-size: 25px"
                disabled
                ><span class="replylist-main-tweet-icons-icon-font"
                  >愛心傳送中．．．啾咪</span
                ></i
              >
            </div>
          </div>

          <div
            class="replylist-main-following"
            v-for="reply in tweetData.Replies"
            v-bind:key="reply.id"
          >
            <img
              class="replylist-main-following-photo"
              v-bind:src="reply.User.avatar"
              alt=""
            />
            <div class="replylist-main-following-msg">
              <div class="replylist-main-following-msg-name">
                {{ reply.User.name
                }}<span class="replylist-main-following-msg-name-app">
                  @apple．{{ reply.updatedAt | fromNow }}</span
                >
              </div>
              <div class="replylist-main-following-msg-reply">
                回覆<span class="`replylist-main-following-msg-reply-tag`">
                  @{{ reply.User.name }}</span
                >
              </div>
              <div class="replylist-main-following-msg-context">
                {{ reply.comment }}
              </div>
            </div>
          </div>
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
    <!-- Modal -->
    <div
      class="modal fade"
      id="ReplyListModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            class="tweet-textarea"
            @submit.prevent.stop="handleSubmit($event)"
          >
            <div class="modal-body">
              <div class="modal-body-tweet">
                <img
                  class="modal-body-tweet-photo"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
                <div class="modal-body-tweet-msg">
                  <div class="modal-body-tweet-msg-name">
                    {{ tweetData.User.name
                    }}<span class="modal-body-tweet-msg-name-app">
                      @apple．{{ tweetData.updatedAt | fromNow }}</span
                    >
                  </div>
                  <div class="modal-body-tweet-msg-context">
                    {{ tweetData.description }}
                  </div>
                  <div class="modal-body-tweet-msg-to">
                    回覆給<span class="modal-body-tweet-msg-to-who">
                      @apple</span
                    >
                  </div>
                </div>
              </div>
              <div class="modal-counter">
                推文剩餘字數:{{ 140 - this.comment.length }}字
              </div>
              <div class="modal-body-reply">
                <img
                  class="modal-body-reply-photo"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
                <textarea
                  class="form-control modal-body-reply-msg"
                  placeholder="推你的回覆"
                  v-model="comment"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                v-if="isProcessing"
                type="submit"
                class="btn btn-primary modal-footer-btn-size"
                disabled
              >
                回覆中!
              </button>
              <button
                v-if="!isProcessing"
                type="submit"
                class="btn btn-primary modal-footer-btn-size"
              >
                回覆
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import $ from "jquery";
import Spinner from "./../components/Spinner";
import Top10User from "./../components/Top10User";

import mainPageAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

// 時間顯示器
import moment from "moment";

export default {
  name: "ReplyList",
  components: {
    Navbar,
    Spinner,
    Top10User,
  },
  data() {
    return {
      MainPage: false,
      isSetting: false,
      PersonalInfo: false,
      tweetData: {
        description: "",
        updatedAt: "",
        Likes: "",
        Replies: "",
        User: {
          name:
            "" /* 因為一開始User是空值，裡面的name會undefine，所以先給name一個空值 */,
          avatar: "",
        },
      },
      comment: "",
      isLike: false,
      isLoading: true,
      isProcessing: false,
      isLikePorcessing: false,
      topUsers: [],
      likeＣount: 0,
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "ReplyList") {
      this.MainPage = true;
      this.isSetting = false;
      this.PersonalInfo = false;
    }
    const { id: tweetId } = this.$route.params; /* TODO: 解構付值問 */
    this.fetchReplyList({ tweetId });
    this.fetchTopUsers();
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
    async fetchReplyList({ tweetId }) {
      try {
        this.isLoading = true;
        const response = await mainPageAPI.ReplyList({ tweetId });
        this.tweetData = { ...response.data };
        this.likeＣount = this.tweetData.Likes.length;
        // 檢驗使用者是否有對貼文按讚
        if (this.tweetData.isLikedByMe) {
          this.isLike = true;
        } else {
          this.isLike = false;
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    async handleSubmit(event) {
      try {
        // 防止多次點擊送出
        this.isProcessing = true;
        const form = event.target;
        const formData = new FormData(form);
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value);
        // }
        // 檢測推文字數不能為0
        if (this.comment.length === 0) {
          Toast.fire({
            icon: "error",
            title: "請輸入文字",
          });
          this.isProcessing = false;
          return;
        }
        // 檢測推文字數不能>140
        if (this.comment.length > 140) {
          Toast.fire({
            icon: "error",
            title: "輸入文字不能超過140字",
          });
          this.isProcessing = false;
          return;
        }
        console.log(formData);
        const { id: tweetId } = this.$route.params;
        // const { data } = await SettingAPI.userSetUp({ formData });
        const { data } = await mainPageAPI.reply({
          tweetId,
          comment: this.comment,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const response = await mainPageAPI.ReplyList({ tweetId });
        this.tweetData = { ...response.data };
        this.comment = "";
        this.isProcessing = false;
        $("#ReplyListModal").modal("hide");
        // location.reload();
        // this.$router.push({ path: `/mainpage/${this.currentUser.id}` });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法建立推文，請稍後再試",
        });
        this.isProcessing = false;
      }
    },
    async addLike() {
      try {
        this.isLikePorcessing = true;
        const { id: tweetId } = this.$route.params;
        const { data } = await mainPageAPI.addLike({ tweetId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const response = await mainPageAPI.ReplyList({ tweetId });
        this.tweetData = { ...response.data };
        // 檢驗使用者是否有對貼文按讚
        if (this.tweetData.isLikedByMe) {
          this.isLike = true;
        } else {
          this.isLike = false;
        }
        this.likeＣount = this.likeＣount + 1;
        this.isLikePorcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將推文加入最愛，請稍後再試",
        });
        this.isLikePorcessing = false;
      }
    },
    async deleteLike() {
      try {
        this.isLikePorcessing = true;
        const { id: tweetId } = this.$route.params;
        const { data } = await mainPageAPI.deleteLike({ tweetId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const response = await mainPageAPI.ReplyList({ tweetId });
        this.tweetData = { ...response.data };
        // 檢驗使用者是否有對貼文按讚
        if (this.tweetData.isLikedByMe) {
          this.isLike = true;
        } else {
          this.isLike = false;
        }
        this.likeＣount = this.likeＣount - 1;
        this.isLikePorcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將推文移除最愛，請稍後再試",
        });
        this.isLikePorcessing = false;
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
    publishTime(datetime) {
      if (!datetime) {
        return "-";
      }
      // 使用 moment 提供的 fromNow 方法
      return moment(datetime).format("h:mm:ss a．MMMM Do YYYY");
    },
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
.replylist-container {
  margin: 0 auto;
  width: 960px;
  height: 50px;
}
.row {
  margin: 0;
}
/* 以下為中間頁面設定 */
.replylist-main {
  width: 50%;
}
.fa-comment:hover {
  cursor: pointer;
}
.replylist-main-header:link {
  text-decoration: none;
}
.replylist-main-header-style {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
  color: black;
}
.replylist-main-header-style-icon {
  margin-right: 45px;
}

.replylist-main-tweet-info {
  display: flex;
}
.replylist-main-tweet-info-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.replylist-main-tweet-info-name {
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
}
.replylist-main-tweet-info-name-app {
  color: rgba(101, 119, 134, 1);
}
.replylist-main-tweet-msg {
  font-size: 25px;
  font-weight: 500;
  line-height: 34px;
  margin-top: 15px;
  word-break: break-all;
}
.replylist-main-tweet-time {
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(101, 119, 134, 1);
  margin-top: 10px;
}
.replylist-main-tweet-replyRecord {
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  margin: 15px 0 15px 0;
}
.replylist-main-tweet-replyRecord-style {
  color: rgba(101, 119, 134, 1);
}
.replylist-main-tweet-icons-icon {
  margin-right: 60px;
  color: rgba(101, 119, 134, 1);
}
.replylist-main-tweet-icons-icon-favorite {
  margin-right: 60px;
  color: rgba(255, 102, 0, 1);
}
.replylist-main-tweet-icons-icon,
.replylist-main-tweet-icons-icon-favorite {
  cursor: pointer;
}
.replylist-main-tweet-icons-icon-font {
  font-size: 10px;
  font-weight: 700;
}
.replylist-main-following {
  width: 100%;
  height: 106px;
  display: flex;
  margin: 15px 0 15px 0;
}
.replylist-main-following-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.replylist-main-following-msg {
  margin-left: 10px;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  word-break: break-all;
}
.replylist-main-following-msg-name-app {
  color: rgba(101, 119, 134, 1);
  font-weight: normal;
}
.replylist-main-following-msg-reply {
  color: rgba(101, 119, 134, 1);
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
}
.replylist-main-following-msg-reply-tag {
  font-weight: normal;
  color: rgba(255, 102, 0, 1);
}
.replylist-main-following-msg-context {
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
}
.modal-body {
  height: 350px;
}
.modal-body-tweet {
  display: flex;
}
.modal-body-tweet-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.modal-body-tweet-msg-name {
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
}
.modal-body-tweet-msg-name-app {
  color: rgba(101, 119, 134, 1);
  font-weight: normal;
}
.modal-body-tweet-msg-context {
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  margin-left: 10px;
  word-break: break-all;
}
.modal-body-tweet-msg-to {
  color: rgba(101, 119, 134, 1);
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin: 10px 0 10px 10px;
}
.modal-counter {
  margin: 15px 15px 0 15px;
  font-size: 15px;
  font-weight: 700;
  text-align: end;
}
.modal-body-tweet-msg-to-who {
  font-weight: normal;
  color: rgba(255, 102, 0, 1);
}
.modal-body-reply {
  display: flex;
}
.modal-body-reply-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.modal-body-reply-msg {
  border-style: none;
  resize: none;
  box-shadow: none;
  height: 250px;
}
.btn {
  border-radius: 50px;
  border-color: rgba(255, 102, 0, 1);
  background-color: rgba(255, 102, 0, 1);
  font-weight: 900;
  font-size: 25px;
  width: 210px;
  height: 45px;
  line-height: 25px;
  margin-top: 30px;
}
.modal-footer-btn-size {
  width: 120px;
  height: 40px;
  font-weight: 900;
  font-size: 25px;
  line-height: 25px;
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