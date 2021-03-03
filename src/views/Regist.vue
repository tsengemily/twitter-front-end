<template>
  <div class="container">
    <img class="ac-logo" src="./../pic/AC_Logo.jpg" alt="" />
    <h2 class="row justify-content-center">建立你的帳號</h2>
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
      <button type="button" class="btn btn-primary btn-lg btn-block">
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