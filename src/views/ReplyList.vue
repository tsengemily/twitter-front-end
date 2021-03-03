<template>
  <div class="replylist-container">
    <div class="row">
      <Navbar v-bind:isSetting="isSetting" v-bind:MainPage="MainPage" />
      <div
        class="replylist-main"
        data-toggle="modal"
        data-target="#ReplyListModal"
      >
        <router-link class="link-style" to="/mainpage">
          <div class="replylist-header">
            <i class="fas fa-arrow-left" style="font-size: 25px"></i>推文
          </div>
        </router-link>
        <div class="replylist-tweet">
          <div class="tweeter-info">
            <img
              class="tweeter-photo"
              src="https://picsum.photos/300/300"
              alt=""
            />
            <div class="tweeter-name">
              Apple
              <div class="tweeter-name-app">@apple</div>
            </div>
          </div>
          <div class="tweeter-msg">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt
            reprehenderit elit laborum.
          </div>
          <div class="tweeter-time">上午10:05．2020年6月10號</div>
          <div class="tweeter-replyrecord">
            34
            <span class="tweeter-replyrecord-style">回覆</span>
            808
            <span class="tweeter-replyrecord-style"> 喜歡次數 </span>
          </div>
          <div class="msg-favorite-icon">
            <i class="far fa-comment" style="font-size: 25px"></i>
            <i class="far fa-heart" style="font-size: 25px"></i>
          </div>
        </div>

        <div class="main-following-tweet">
          <img
            class="folling-user-photo"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="main-following-tweet-msg">
            <div class="following-name">
              Apple<span class="following-name-app"> @apple．3小時</span>
            </div>
            <div class="following-reply">
              回覆<span class="following-reply-tag"> @apple</span>
            </div>
            <div class="following-reply-msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
          </div>
        </div>

        <div class="main-following-tweet">
          <img
            class="folling-user-photo"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="main-following-tweet-msg">
            <div class="following-name">
              Apple<span class="following-name-app"> @apple．3小時</span>
            </div>
            <div class="following-reply">
              回覆<span class="following-reply-tag"> @apple</span>
            </div>
            <div class="following-reply-msg">
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
              <div class="modal-tweet-body">
                <img
                  class="modal-tweeter-photo"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
                <div class="modal-tweeter-msg">
                  <div class="modal-tweeter-name">
                    Apple<span class="tweeter-name-app"> @apple．3小時</span>
                  </div>
                  <div class="modal-tweeter-context">
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                    ullamco cillum dolor. Voluptate exercitation incididunt
                    aliquip deserunt reprehenderit elit laborum.
                  </div>
                  <div class="modal-tweeter-to">
                    回覆給<span class="modal-tweeter-to-who"> @apple</span>
                  </div>
                </div>
              </div>
              <div class="reply-body">
                <img
                  class="tweeter-photo"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
                <textarea
                  class="form-control msg-board"
                  placeholder="推你的回覆"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary modal-btn-size">
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
      console.log("12345");
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
.link-style:link {
  text-decoration: none;
}
.replylist-header {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
  color: black;
}
.fa-arrow-left {
  margin-right: 45px;
}
.replylist-tweet {
  height: 360px;
}
.tweeter-info {
  display: flex;
}
.tweeter-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweeter-name {
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
}
.tweeter-name-app {
  color: rgba(101, 119, 134, 1);
}
.tweeter-msg {
  font-size: 25px;
  font-weight: 500;
  line-height: 34px;
  margin-top: 15px;
}
.tweeter-time {
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(101, 119, 134, 1);
  margin-top: 10px;
}
.tweeter-replyrecord {
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  margin: 15px 0 15px 0;
}
.tweeter-replyrecord-style {
  color: rgba(101, 119, 134, 1);
}
.far {
  margin-right: 60px;
  color: rgba(101, 119, 134, 1);
}
.main-following-tweet {
  width: 100%;
  height: 106px;
  display: flex;
  margin: 0 0 30px 0;
}
.folling-user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.main-following-tweet-msg {
  margin-left: 10px;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
}
.following-name-app {
  color: rgba(101, 119, 134, 1);
  font-weight: normal;
}
.following-reply {
  color: rgba(101, 119, 134, 1);
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
}
.following-reply-tag {
  font-weight: normal;
  color: rgba(255, 102, 0, 1);
}
.following-reply-msg {
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
}
.modal-body {
  height: 350px;
}
.modal-tweet-body {
  display: flex;
}
.modal-tweeter-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.modal-tweeter-name {
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
}
.tweeter-name-app {
  color: rgba(101, 119, 134, 1);
  font-weight: normal;
}
.modal-tweeter-context {
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  margin-left: 10px;
}
.modal-tweeter-to {
  color: rgba(101, 119, 134, 1);
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin: 10px 0 10px 10px;
}
.modal-tweeter-to-who {
  font-weight: normal;
  color: rgba(255, 102, 0, 1);
}
.reply-body {
  display: flex;
}
.tweeter-textarea {
  width: 100%;
}
.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.msg-board {
  border-style: none;
  resize: none;
  box-shadow: none;
}
.modal-btn-size {
  width: 64px;
  height: 40px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
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
.modal-btn-size {
  width: 64px;
  height: 40px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
}
</style>