<template>
  <div class="main-container">
    <div class="row">
      <!-- Navbar -->
      <Navbar v-bind:isSetting="isSetting" v-bind:MainPage="MainPage" />
      <!-- 中間主畫面 -->
      <div class="main-main">
        <div class="main-header">首頁</div>
        <div class="main-tweet">
          <img class="user-photo" src="https://picsum.photos/300/300" alt="" />
          <form class="tweet-textarea" action="">
            <textarea
              class="form-control msg-board"
              placeholder="有什麼新鮮事?"
            ></textarea>
            <button type="button" class="btn btn-primary">推文</button>
          </form>
        </div>
        <div class="space"></div>
        <router-link
          class="link-stlye"
          v-bind:to="{ name: 'ReplyList', params: { id: 1 } }"
        >
          <div class="main-following-tweet">
            <img
              class="folling-user-photo"
              src="https://picsum.photos/300/300"
              alt=""
            />
            <div class="main-following-tweet-msg">
              <div class="name">
                Apple<span class="name-app"> @apple．3小時</span>
              </div>
              <div class="msg">
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco cillum dolor. Voluptate exercitation incididunt aliquip
                deserunt reprehenderit elit laborum.
              </div>
              <div class="remind">
                <i class="far fa-comment" style="font-size: 13px"> 13 </i>

                <i class="far fa-heart" style="font-size: 13px"> 76 </i>
              </div>
            </div>
          </div>
        </router-link>
        <div class="main-following-tweet">
          <img
            class="folling-user-photo"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="main-following-tweet-msg">
            <div class="name">
              Apple<span class="name-app"> @apple．3小時</span>
            </div>
            <div class="msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
            <div class="remind">
              <i class="far fa-comment" style="font-size: 13px"> 13 </i>

              <i class="far fa-heart" style="font-size: 13px"> 76 </i>
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
            <div class="name">
              Apple<span class="name-app"> @apple．3小時</span>
            </div>
            <div class="msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
            <div class="remind">
              <i class="far fa-comment" style="font-size: 13px"> 13 </i>

              <i class="far fa-heart" style="font-size: 13px"> 76 </i>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
export default {
  name: "mainPage",
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
    if (currentPath === "MainPage") {
      this.MainPage = true;
      this.isSetting = false;
    }
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
.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweet-textarea {
  display: flex;
}
.msg-board {
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
.space {
  background-color: rgb(230, 236, 240);
  width: 100%;
  height: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.link-stlye:link {
  text-decoration: none;
}
.main-following-tweet {
  width: 100%;
  height: 135px;
  display: flex;
}
.folling-user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.main-following-tweet-msg {
  margin-left: 10px;
}
.name {
  font-size: 15px;
  font-weight: 700;
  color: black;
}
.name-app {
  color: rgba(101, 119, 134, 1);
}
.msg {
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  color: black;
}
.remind {
  color: rgba(101, 119, 134, 1);
  font-weight: 500;
  margin: 0 0 0 0;
}
.far {
  margin-right: 50px;
}
</style>