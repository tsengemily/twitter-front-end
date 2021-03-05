<template>
  <div class="setting-container">
    <div class="row">
      <Navbar v-bind:isSetting="isSetting" v-bind:MainPage="MainPage" />
      <div class="setting-main">
        <div class="setting-main-header">帳戶設定</div>
        <form>
          <div class="form-group">
            <label for="account"></label>
            <input
              id="accout"
              type="text"
              class="form-control"
              placeholder="帳號"
              required
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
            />
          </div>
          <button type="button" class="btn btn-primary btn-lg">儲存</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
export default {
  name: "Setting",
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
    if (currentPath === "Setting") {
      this.isSetting = true;
      this.MainPage = false;
    }
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