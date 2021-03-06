<template>
  <div class="replylist-container">
    <div class="row">
      <Navbar v-bind:isSetting="isSetting" v-bind:MainPage="MainPage" />
      <div
        class="replylist-main"
        data-toggle="modal"
        data-target="#ReplyListModal"
      >
        <router-link class="replylist-main-header" to="/mainpage">
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
              src="https://picsum.photos/300/300"
              alt=""
            />
            <div class="replylist-main-tweet-info-name">
              Apple
              <div class="replylist-main-tweet-info-name-app">@apple</div>
            </div>
          </div>
          <div class="replylist-main-tweet-msg">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt
            reprehenderit elit laborum.
          </div>
          <div class="replylist-main-tweet-time">上午10:05．2020年6月10號</div>
          <div class="replylist-main-tweet-replyRecord">
            34
            <span class="replylist-main-tweet-replyRecord-style">回覆</span>
            808
            <span class="replylist-main-tweet-replyRecord-style">
              喜歡次數
            </span>
          </div>
          <div class="replylist-main-tweet-icons">
            <i
              class="far fa-comment replylist-main-tweet-icons-icon"
              style="font-size: 25px"
            ></i>
            <i
              class="far fa-heart replylist-main-tweet-icons-icon"
              style="font-size: 25px"
            ></i>
          </div>
        </div>

        <div class="replylist-main-following">
          <img
            class="replylist-main-following-photo"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="replylist-main-following-msg">
            <div class="replylist-main-following-msg-name">
              Apple<span class="replylist-main-following-msg-name-app">
                @apple．3小時</span
              >
            </div>
            <div class="replylist-main-following-msg-reply">
              回覆<span class="`replylist-main-following-msg-reply-tag`">
                @apple</span
              >
            </div>
            <div class="replylist-main-following-msg-context">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <form class="tweet-textarea" action="">
            <div class="modal-body">
              <div class="modal-body-tweet">
                <img
                  class="modal-body-tweet-photo"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
                <div class="modal-body-tweet-msg">
                  <div class="modal-body-tweet-msg-name">
                    Apple<span class="modal-body-tweet-msg-name-app">
                      @apple．3小時</span
                    >
                  </div>
                  <div class="modal-body-tweet-msg-context">
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                    ullamco cillum dolor. Voluptate exercitation incididunt
                    aliquip deserunt reprehenderit elit laborum.
                  </div>
                  <div class="modal-body-tweet-msg-to">
                    回覆給<span class="modal-body-tweet-msg-to-who">
                      @apple</span
                    >
                  </div>
                </div>
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
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
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
export default {
  name: "ReplyList",
  components: {
    Navbar,
  },
  data() {
    return {
      MainPage: false,
      isSetting: false,
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "ReplyList") {
      this.MainPage = true;
      this.isSetting = false;
    }
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
.replylist-main:hover {
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
.replylist-main-tweet {
  height: 360px;
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
.replylist-main-following {
  width: 100%;
  height: 106px;
  display: flex;
  margin: 0 0 30px 0;
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
}
.modal-body-tweet-msg-to {
  color: rgba(101, 119, 134, 1);
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin: 10px 0 10px 10px;
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
  width: 64px;
  height: 40px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
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
</style>