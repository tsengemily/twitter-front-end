<template>
  <div class="nav navbar-container">
    <ul class="nav mb-4 nav-container">
      <router-link to="/mainpage">
        <li class="nav-item nav-container-img">
          <img
            class="nav-container-img-acLogo"
            src="./../pic/AC_Logo.jpg"
            alt=""
          />
        </li>
      </router-link>
      <li class="nav-item nav-container-mainPage">
        <router-link
          class="nav-container-mainPage-fontColor"
          to="/mainpage"
          v-bind:class="{ routerLinkActive: MainPage }"
        >
          <i
            class="fas fa-home nav-container-mainPage-fontColor-linkStyle"
            style="font-size: 25px"
          >
            <span class="nav-container-mainPage-fontColor-linkStyle-fontStyle"
              >首頁</span
            ></i
          >
        </router-link>
      </li>
      <li class="nav-item-userData">
        <router-link class="nav-item-userData-font-color" to="#">
          <i class="far fa-user link-style" style="font-size: 25px"
            ><span>個人資料</span></i
          >
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="font-color"
          to="/setting"
          v-bind:class="{ routerLinkActive: isSetting }"
        >
          <i class="fas fa-cog link-style" style="font-size: 25px"
            ><span>設定</span></i
          >
        </router-link>
      </li>
      <li class="nav-item">
        <button
          v-if="isSetting"
          type="button"
          class="btn btn-primary btn-lg btn-block"
        >
          註冊
        </button>
        <button
          v-if="MainPage"
          type="button"
          class="btn btn-primary btn-lg btn-block"
          data-toggle="modal"
          data-target="#tweetModal"
        >
          推文
        </button>
      </li>
      <li class="nav-item log-out">
        <router-link class="log-out-style" to="/login">
          <i class="fas fa-sign-out-alt" style="font-size: 25px"
            ><span>登出</span></i
          >
        </router-link>
      </li>
    </ul>

    <!-- Modal -->
    <div
      class="modal fade"
      id="tweetModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
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
              <img
                class="user-photo"
                src="https://picsum.photos/300/300"
                alt=""
              />
              <textarea
                class="form-control msg-board"
                placeholder="有什麼新鮮事?"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary modal-btn-size">
                推文
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    isSetting: {
      type: Boolean,
      default: false,
      required: true,
    },
    MainPage: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {};
  },
  create() {
    // console.log(this.$route);
  },
};
</script>

<style scoped>
.navbar-container {
  width: 240px;
}
.nav-container {
  display: flex;
  flex-direction: column;
}
.nav-container-mainPage-fontColor,
.nav-item-userData-font-color {
  color: black;
}
.nav-container-mainPage-fontColor-linkStyle {
  text-decoration: none;
  font-weight: 900;
  margin-bottom: 40px;
}
.nav-container-mainPage-fontColor-linkStyle-fontStyle {
  margin-left: 21px;
}
.font-color {
  color: black;
}
span {
  margin-left: 21px;
}
.link-style {
  text-decoration: none;
  font-weight: 900;
  margin-bottom: 40px;
}
.link-style:hover {
  color: rgba(255, 102, 0, 1);
}
.routerLinkActive {
  text-decoration: none;
  color: rgba(255, 102, 0, 1);
}
.nav-container-img-acLogo {
  margin-top: 14px;
  margin-bottom: calc(98px - 39px);
  width: 25px;
  height: 25px;
}
.log-out {
  /* margin-top: 844px; */
  margin-top: 160px;
}
.log-out-style {
  color: black;
}
.log-out-style:hover {
  color: rgb(2, 117, 216);
}
.modal-btn-size {
  width: 64px;
  height: 40px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
}
.modal-body {
  display: flex;
  height: 200px;
}
.tweet-textarea {
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
</style>

