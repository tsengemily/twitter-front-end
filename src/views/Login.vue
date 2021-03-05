<template>
  <div class="container">
    <img class="ac-logo" src="./../pic/AC_Logo.jpg" alt="" />
    <h2 class="row justify-content-center">登入Alphitter</h2>
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
        <label for="password"></label>
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="密碼"
          required
        />
      </div>
      <router-link class="router-link" to="/mainpage">
        <button type="button" class="btn btn-primary btn-lg btn-block">
          登入
        </button>
      </router-link>
    </form>
    <div class="foot-container">
      <router-link class="foot-container-btn-link" to="/regist"
        >註冊Alphitter</router-link
      >
      <router-link class="foot-container-btn-link" to="/admin"
        >後台登入</router-link
      >
    </div>
  </div>
</template>

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
.router-link {
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  margin-top: 5px;
  text-decoration: none;
}
.foot-container {
  display: flex;
  justify-content: flex-end;
}
.foot-container-btn-link {
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  margin-top: 5px;
  text-decoration: none;
  margin-left: 50px;
}
</style>