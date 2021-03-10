<template>
  <div class="nav navbar-container">
    <ul class="nav mb-4 nav-container">
      <router-link
        v-bind:to="{ name: 'MainPage', params: { id: currentUser.id } }"
      >
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
          v-bind:to="{ name: 'MainPage', params: { id: currentUser.id } }"
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
      <li class="nav-item log-out log-out-style">
        <!-- <router-link class="log-out-style" to="/login"> -->
        <i class="fas fa-sign-out-alt" style="font-size: 25px" @click="logout"
          ><span>登出</span></i
        >
        <!-- </router-link> -->
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
          <form
            class="tweet-textarea"
            @submit.prevent.stop="handleSubmit($event)"
          >
            <div class="modal-counter">
              推文剩餘字數:{{ 140 - this.description.length }}字
            </div>
            <div class="modal-body">
              <img class="user-photo" v-bind:src="userData.avatar" alt="" />
              <textarea
                class="form-control msg-board"
                placeholder="有什麼新鮮事?"
                v-model="description"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary modal-btn-size">
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
// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

import mainPageAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

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
    // userData: {
    //   type: Object,
    //   default: () => {},
    //   required: true,
    // },
  },
  data() {
    return {
      description: "",
      userData: {},
    };
  },
  created() {
    // 本來想要用API撈資料，但是會跟MainPage重複，系統會抱錯
    const localUserId = localStorage.getItem("userId");
    const { userId } = { userId: localUserId };
    this.getUserId({ userId });
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    },
    // 本來想要用API撈資料，但是會跟MainPage重複，系統會抱錯
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
        // 檢測推文字數不能為0
        if (this.description.length === 0) {
          Toast.fire({
            icon: "error",
            title: "請輸入文字",
          });
          return;
        }
        // 檢測推文字數不能>140
        if (this.description.length > 140) {
          Toast.fire({
            icon: "error",
            title: "輸入文字不能超過140字",
          });
          return;
        }
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
  cursor: pointer;
}
.modal-btn-size {
  width: 64px;
  height: 40px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
}
.modal-counter {
  margin: 0 15px;
  font-size: 15px;
  font-weight: 700;
  text-align: end;
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

