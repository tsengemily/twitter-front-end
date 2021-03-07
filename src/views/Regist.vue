<template>
  <div class="container">
    <img class="ac-logo" src="./../pic/AC_Logo.jpg" alt="" />
    <h2 class="justify-content-center">建立你的帳號</h2>
    <form @submit.prevent.stop="handleSubmit($event)">
      <div class="form-group">
        <label for="account"></label>
        <input
          id="accout"
          type="text"
          class="form-control"
          placeholder="帳號"
          required
          v-model="account"
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
          v-model="name"
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
          v-model="email"
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
          v-model="password"
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
          v-model="checkPassword"
          name="checkPassword"
          autocomplete="off"
        />
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">
        註冊
      </button>
    </form>
    <div class="container">
      <router-link class="row justify-content-center btn-link" to="/login"
        >取消</router-link
      >
    </div>
  </div>
</template>

<script>
import SettingAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

export default {
  name: "Regist",
  data() {
    return {
      account: "",
      email: "",
      password: "",
      checkPassword: "",
      name: "",
    };
  },
  methods: {
    async handleSubmit(event) {
      try {
        const form = event.target;
        const formData = new FormData(form);
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value);
        }
        // console.log(formData);
        // console.log("account", this.account);
        // console.log("email", this.email);
        // console.log("password", this.password);
        // console.log("checkPassword", this.checkPassword);
        // console.log("name", this.name);
        // const { data } = await SettingAPI.userSetUp({ formData });
        const { data } = await SettingAPI.userSetUp({
          account: this.account,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
          name: this.name,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$router.push({ path: `/login` });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法建立帳號，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.ac-logo {
  margin-top: 60px;
  margin-left: calc(50% - 30px);
}
h2 {
  font-weight: 900;
  margin-top: calc(138px - 60px);
}
.btn {
  border-radius: 50px;
  border-color: rgba(255, 102, 0, 1);
  background-color: rgba(255, 102, 0, 1);
  font-weight: 900;
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
a {
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  margin-top: 5px;
}
</style>

