<template>
  <div class="setting-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <Navbar v-bind:isSetting="isSetting" v-bind:MainPage="MainPage" />
        <div class="setting-main">
          <div class="setting-main-header">帳戶設定</div>
          <form @submit.prevent.stop="handleSubmit($event)">
            <div class="form-group">
              <label for="account"></label>
              <input
                id="accout"
                type="text"
                class="form-control"
                placeholder="帳號"
                required
                v-model="userData.account"
                name="accout"
              />
            </div>
            <div class="form-group">
              <label for="name"></label>
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="名稱"
                required
                v-model="userData.name"
                name="name"
              />
            </div>
            <div class="form-group">
              <label for="email"></label>
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
                v-model="userData.email"
                name="email"
              />
            </div>
            <div class="form-group">
              <label for="password"></label>
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="密碼"
                required
                v-model="userData.password"
                name="password"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <label for="passwordConfirm"></label>
              <input
                id="passwordConfirm"
                type="password"
                class="form-control"
                placeholder="密碼確認"
                required
                v-model="userData.checkPassword"
                name="checkPassword"
                autocomplete="off"
              />
            </div>
            <button type="submit" class="btn btn-primary btn-lg">儲存</button>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Spinner from "./../components/Spinner";

import SettingAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

export default {
  name: "Setting",
  components: {
    Navbar,
    Spinner,
  },
  data() {
    return {
      MainPage: false,
      isSetting: false,
      userData: {
        account: "",
        name: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      isLoading: true,
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "Setting") {
      this.isSetting = true;
      this.MainPage = false;
    }
    const { userId } = { userId: this.currentUser.id };
    this.getUserId({ userId });
  },
  methods: {
    async getUserId({ userId }) {
      try {
        this.isLoading = true;
        const response = await SettingAPI.get({ userId });
        this.userData = { ...response.data };
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
        this.isLoading = true;
        // 確認帳號與密碼是否一樣
        if (this.userData.account === this.userData.email) {
          Toast.fire({
            icon: "error",
            title: "請勿將帳號與密碼設置為一樣",
          });
          return false;
        }
        // 確認密碼與確認密碼是否一樣
        if (this.userData.password !== this.userData.checkPassword) {
          Toast.fire({
            icon: "error",
            title: "密碼與確認密碼不一致",
          });
          return false;
        }
        // 將event.target轉成form格式準備打包送出
        const form = event.target;
        const formData = new FormData(form);
        console.log(formData);
        const { userId } = { userId: this.currentUser.id };
        const { data } = await SettingAPI.updateUserInfo({
          userId,
          account: this.userData.account,
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
          checkPassword: this.userData.checkPassword,
        });
        console.log("data.status", data.status);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isLoading = false;
        this.$router.push({
          name: "MainPage",
          params: { id: this.currentUser.id },
        });
      } catch (error) {
        this.isLoading = false;
        console.log(error);
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
};
</script>

<style scoped>
.setting-container {
  margin: 0 auto;
  width: 960px;
  height: 50px;
}
.row {
  margin: 0;
}
/* 以下為中間頁面設定 */
.setting-main {
  width: 50%;
}
.setting-main-header {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
}
.btn {
  border-radius: 50px;
  border-color: rgba(255, 102, 0, 1);
  background-color: rgba(255, 102, 0, 1);
  font-weight: 900;
  font-size: 25px;
  width: 122px;
  height: 45px;
  line-height: 25px;
  margin-top: 30px;
  margin-left: calc(100% - 122px);
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